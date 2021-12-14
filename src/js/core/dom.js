import { capitalize } from "./utils"

class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }else if(typeof html === 'object'){
      this.$el.append(html.$el)
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }
  remove(){
    this.$el.remove()
    return this
  }
  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }
  prepend (node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.prepend ) {
      this.$el.prepend (node)
    } else {
      this.$el.prependChild(node)
    }

    return this
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) {
    Object
        .keys(styles)
        .forEach(key => {
          this.$el.style[key] = styles[key]
        })
  }
  toggle(cls){
    this.$el.classList.toggle(cls)
    return this
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
  }
  offset(type){
    const name = capitalize(type)
    return this.$el['offset' + name]
  }
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }

  focus() {
    this.$el.focus()
    return this
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }

  addClass(classes) {
    if(typeof classes === 'object'){
      classes.forEach(cl => this.$el.classList.add(cl))
    }else if (classes) {
      this.$el.classList.add(classes)
    }
    return this
  }

  removeClass(classes) {
    if(typeof classes === 'object'){
      classes.forEach(cl => this.$el.classList.remove(cl))
    }else if (classes) {
      this.$el.classList.remove(classes)
    }
  }
  setId(id){
    this.$el.id = id
    return this
  }
  
    
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if(typeof classes === 'object'){
    classes.forEach(cl => el.classList.add(cl))
  }else if (classes) {
    el.classList.add(classes)
  }
  
  return $(el)
}
$.createInput = (classes='',name='',type='',id='',value='') => {
  const input = document.createElement('input')
  input.name = name
  input.type = type
  input.id = id
  input.value = value
  input.classList.add(classes)

  return $(input) 
}
