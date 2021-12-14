import {$} from '../dom'
import {ActiveRoute} from './ActiveRoute'

export class Router {
    constructor(selector, routes) {
      if (!selector) {
        throw new Error('Selector is not provided in Router')
      }
  
      this.$placeholder = $(selector)
      this.routes = routes
  
      this.page = null
  
      this.changePageHandler = this.changePageHandler.bind(this)
  
      this.init()
    }
  
    init() {
      window.addEventListener('hashchange', this.changePageHandler)
      this.changePageHandler()
    }
  
    changePageHandler() {
      if(this.page){
        this.page.destroy()
      }
      this.$placeholder.clear() 
  
      let Page = ActiveRoute.path

      if(Page.includes('found')){
        window.scrollBy(0,0)
        Page = this.routes.found
      }else if(Page === 'singUp'){
        Page = this.routes.singUp
      }else if(Page === 'singIn'){
        Page = this.routes.singIn
      }else if(Page.includes('room')){
        Page = this.routes.room
      }else{
        Page = this.routes.landing
      }
      this.page = new Page(ActiveRoute.param) 
  
      this.$placeholder.append(this.page.getRoot())
  
      this.page.afterRender()
    }
  
    destroy() {
      window.removeEventListener('hashchange', this.changePageHandler)
    }
  }