import { Component } from "../../core/Component";
import { $ } from "../../core/dom";

export class Checkbox extends Component{
    static rootTag = 'div'
    static className = 'checbox'
    constructor($root,options = {}){
        super($root,{
                name:'checkbox',
                ...options
            }
        )
    }
    render(){
        const $formCheckbox = $.create('div','form-checkbox')
        return $formCheckbox
    }

}