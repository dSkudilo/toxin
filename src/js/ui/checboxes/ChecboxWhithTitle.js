import { $ } from "../../core/dom";
import { Checkbox } from "./Checbox";

export class ChecboxWhithTitle extends Checkbox{
    static rootTag = 'div'
    static className = 'checbox-title'
    constructor($root,options){
        super($root,{
            ...options
        })
        this.title = options.title,
        this.text = options.text
        this.name = options.name
        this.checked = options.checked
    }
    render(){
        const $label = $.create('label','flex')
        const $input =  $.createInput('form-checkbox__real',this.name,'checkbox')
        $input.attr('checked',this.checked)
        const $customCheckbox = $.create('span','form-checkbox__custom')
        const $wrap = $.create('div','wrap')
        const $checkboxTitle = $.create('p','form-checkbox__title')
        $checkboxTitle.text(this.title)
        const $checkboxText = $.create('p','form-checkbox__text')
        $checkboxText.text(this.text)
        $wrap
            .append($checkboxTitle)
            .append($checkboxText)
        $label
            .append($input)
            .append($customCheckbox)
            .append($wrap)

        const $formCheckbox = super.render()
        $formCheckbox.append($label)
        return $formCheckbox
    }
}