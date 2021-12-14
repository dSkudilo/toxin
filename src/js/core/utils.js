import { $ } from "./dom"
import { monthCases } from '../ui/drops/calendar/calendar'

export function capitalize(string) {
    if (typeof string !== 'string') {
      return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}
export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}
export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function isChecked(searchOptions,{name}){

  if(searchOptions.indexOf(name) !== -1){
    return true
  }
  return false
}

export function declOfNum(n, textForms) {  
  n = Math.abs(n) % 100; 
  let n1 = n % 10;
  if (n > 10 && n < 20) { return textForms[2]; }
  if (n1 > 1 && n1 < 5) { return textForms[1]; }
  if (n1 == 1) { return textForms[0]; }
  return textForms[2];
}

export function dayOfMonth(year = new Date().getFullYear() ,month = new Date().getMonth()){
  return new Date(year,month + 1,0).getDate()
}
export function time(date){
  return new Date(date).getTime()
}
export function dateParse(day,month,year){
  return (month + 1) + '-' + day + '-' + year
}
export function dateParseLoc(d){
  if(!d){
    return 'не указано'
  }
  const date = d.split('-')
  const month = monthCases[date[0] - 1]
  return date[1] + ' ' + month
}

export function createLogo(){
  const $logo = $.create('div',['logo','flex','ac'])
  const $img = $.create('img','logo__img')
  $img.attr('src','./src/assets/img/header/logo.svg')
  $img.attr('alt','toxin')
  const $h1 = $.create('h1','logo__title')
  $h1.text('toxin')
  $logo
    .append($img)
    .append($h1)
  return $logo
}
export function createNavLi({link,text,icon,mobile},linkClass = ''){
  const $li = $.create('li',linkClass)
  if(mobile){
    $li.addClass('link__mobile')
  }
  const $liLink = $.create('a',['link'])
  
  if(!window.location.hash && link == '#' ){
      $liLink.addClass('link_active')
  }else if(window.location.hash.includes(link) && link !== '#'){
      $liLink.addClass('link_active')
  }

  $liLink.attr('href',link)
  $liLink.text(text)
  if(icon){
    const $icon = $.create('i',icon)
    $liLink.append($icon)
  }
  $li.append($liLink)
  return $li
}
export function createH4(text,addClass = ['grey-text']){
  const $h4 = $.create('h4')
  $h4.text(text)
  addClass.forEach(cls => $h4.addClass(cls))
  return $h4
}
export function createH3(text,addClass = ['subtitle']){
  const $h3 = $.create('h3')
  $h3.text(text)
  addClass.forEach(cls => $h3.addClass(cls))
  return $h3
} 
export function createH2(text,addClass = []){
  const $h2 = $.create('h2','title')
  $h2.text(text)
  addClass.forEach(cls => $h2.addClass(cls))
  return $h2
}
export function createFormControl(type='text',placeholder='Написать',addClass = [],label= '',){
  const $formControl = $.create('div','form-control')
  addClass.forEach(cls => $formControl.addClass(cls))
  const $label = $.create('label','subtitle')
  $label.text(label)
  const $input = $.create('input')
  $input.attr('type',type)
  $input.attr('placeholder',placeholder)
  $formControl
    .append($label)
    .append($input)

  return $formControl
}
export function createBtn(text,addClass,icon){
  const $button = $.create('button',addClass)
  $button.text(text)
  if(icon){
    const $icon = $.create('i',icon)
    $button.append($icon)
  }
  return $button
}
export function createBgImg(){
  const $backImg = $.create('img','whole__img')
  $backImg.attr('src','./src/assets/img/auth/img.png')
  $backImg.attr('alt','room')
  return $backImg
}