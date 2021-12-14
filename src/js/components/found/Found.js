import { Emitter } from '../../core/Emitter';
import { $ } from '../../core/dom';
import { StoreSubscriber } from '../../core/StoreSubscriber';
export class Found{
    constructor(options){
        this.components = options.components || []
        this.emitter = new Emitter()
        this.store = options.store
        this.subscriber = new StoreSubscriber(this.store)
        this.dropdowns = []
    }
    getRoot(){
        const $root = $.create('div','wrapper')
        const componentOptions = {
            emitter: this.emitter,
            store:this.store
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
        this.components.forEach(component => 
            this.initChildRec(component))
        this.initDropdown()
        this.subscriber.subscribeComponents(this.components)
    }
    initChildRec(component){
        component.init()
        if(component.childComponents.length > 0){
            component.childComponents.forEach(c =>{
                this.components.push(c)
                this.initChildRec(c)//рекурсия тк много вложен комп
                if(c.isDropdown){
                    this.dropdowns.push(c)
                }
            })
        }
    }
    initDropdown(){
        this.dropdowns.forEach(dropdown => {
            dropdown.$root.on('click',() =>{
                this.dropdowns.forEach(d =>{
                    if(d == dropdown){
                        return
                    }
                    d.close()
                })
            })
        })
    }
    destroyChildRec(component){
        // console.log(component)
        component.destroy()
        if(component.childComponents.length > 0){
            component.childComponents.forEach(c =>{
                this.destroyChildRec(c)//рекурсия тк много вложен комп
            })
        }
    }
    destroyDropDown(){
        this.dropdowns.forEach(drop => {
            drop.$root.off('click',() =>{
              this.dropdowns.forEach(d =>{
                if(d == drop){
                  return
                }
                d.close()
              })
            })
          })
    }
    destroy(){
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(component => 
            this.destroyChildRec(component))
        this.destroyDropDown()
    }
}