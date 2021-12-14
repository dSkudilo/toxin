import { Component } from "../../core/Component"
import { $ } from "../../core/dom"

export class Dropdown extends Component{
    constructor($root,options = {}){
        super($root,{
            name:'dropdown',
            listeners:options.listeners,
            ...options
        })
        this.$root = $root
        this.isDropdown = true
        this.$drop
        this.$formControl
        this.labelContent = options.labelContent
        this.btnStartContent = options.btnContentStorage || options.btnContent
        this.$btn
    }
    
    render(){
        const $formControl = $.create('div',['dropdown-control','mb20'])
        const $label = $.create('label')
        $label.text(this.labelContent)
        this.$btn = $.create('button','dropdown-button')
        
        this.$btn.text(this.btnStartContent)
        this.$btn.data.type = 'toggle'
      
        this.$drop = $.create('div',['dropdown','dropdown--hidden'])
        $formControl  
            .append($label)
            .append(this.$btn)
            .append(this.$drop)

        return $formControl
    }
    onClick(e){
        const $t = $(e.target)
        if($t.data.type == 'toggle'){
            this.$drop.toggle('dropdown--hidden')
            this.$btn.toggle('dropdown-control--active')
        } 
        e.stopPropagation()
        document.onclick = () => {
            this.close()
            document.onclick = null
        }
    }
    close(){
        this.$drop.addClass('dropdown--hidden')
        this.$btn.removeClass('dropdown-control--active')
    }
}