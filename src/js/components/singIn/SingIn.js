import { $ } from "../../core/dom"


export class SingIn{
    constructor(options){
        this.components = options.components || []
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
        console.log(this.components)
        this.components.forEach(component => component.init())
    }
    destroy(){
        this.components.forEach(component => component.destroy())
    }
}