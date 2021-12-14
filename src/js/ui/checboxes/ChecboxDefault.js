import { $ } from "../../core/dom";
import { Checkbox } from "./Checbox";

export class ChecboxDefault extends Checkbox{
    static rootTag = 'div'
    static className = 'checbox-default'
    constructor($root,options){
        super($root,{
            ...options
        })
        this.text = options.text
        this.name = options.name
        this.checked = options.checked
        
    }
    render(){
        const $label = $.create('label')
        const $input = $.createInput('form-checkbox__real',this.name,'checkbox')
        $input.attr('checked',this.checked)
        const $customCheckbox = $.create('span','form-checkbox__custom')
        const $signature = $.create('span')
        $signature.text(this.text)
       
        
        $label
            .append($input)
            .append($customCheckbox)
            .append($signature)
        const $formCheckbox = super.render()
        $formCheckbox.append($label)
        return $formCheckbox
    }

}