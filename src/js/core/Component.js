import { DomListeners } from "./DomListener";

export class Component extends DomListeners{
    constructor($root,options = {}){
        super($root, options.listeners)
        this.emitter = options.emitter
        this.store = options.store
        this.subscribe = options.subscribe || []//по сути список полей на которые нужно подписаться 
        this.unsubscribers = []//функции событий
        this.childComponents = options.childComponents || []
        this.prepare()

    
    }
    // Настраивааем наш компонент до init
    prepare() {}
    init(){
        this.initDOMListeners()
    }
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
      }

    
    $emit(event, ...args){
        this.emitter.emit(event,...args)
    }
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }
    
    
    // Сюда приходят только изменения по тем полям, на которые мы подписались
    storeChanged() {}
    isWatching(key) {
        return this.subscribe.includes(key)
      }
    $dispatch(action){
        this.store.dispatch(action)
    }
    
    
    // Возвращает шаблон компонента
    render() {
        return ''
    }
}