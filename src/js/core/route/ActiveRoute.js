export class ActiveRoute {
    static get path() {
      return window.location.hash.slice(1)
    }
  
    static get param() {
      return ActiveRoute.path.split('/')[1]
    }
    static get found(){
      return '#found/1'
    }
    static get room(){
      return '#room/'
    }
    static route(param = ''){
      document.location.href = `${window.location.origin}/#${param}`
    }
  }
  