import { $ } from '../../core/dom'
import { Emitter } from '../../core/Emitter'
export class Room {
    constructor(options){
        this.components = options.components || []
        this.emitter = new Emitter()
    }
    getRoot(){
        const $root = $.create('div','wrapper')
        const componentOptions = {
            emitter: this.emitter
        }
        this.components = this.components.map(Component => {
            const $elem = $.create(Component.rootTag,Component.className)
            const component = new Component($elem,componentOptions)
            $elem.html(component.render())
            
            $root.append($elem)
            return component
        })
        return $root
    }
    init(){
        this.components.forEach(component => component.init())
    }
    destroy(){
        this.components.forEach(component => component.destroy())
    }
}