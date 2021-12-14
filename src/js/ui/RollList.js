import { Component } from "../core/Component";
import { $ } from "../core/dom";
import { isChecked } from "../core/utils";
import { ChecboxDefault } from "./checboxes/ChecboxDefault";

export class RollList extends Component{
    constructor($root,options = {}){
        super($root,{
            name:'roll-list',
            listeners:['click','input'],
            ...options
        })
        this.checkboxes = options.checkboxes
        this.searchOptions = options.searchOptions
        this.$rollListCard
        this.$title
    }
    render(){
        this.$title = $.create('h4',['subtitle','arrow','cursor-pointer','mb20'])
        this.$title.text('Дополнительные удобства')
        this.$title.data.type = 'roll'
        this.$rollListCard = $.create('ul','roll-list__list')
        this.checkboxes.forEach( check=> {
            
            const $li = $.create('li','aside__item')
            const checkbox = new ChecboxDefault($li,{
                checked:isChecked(
                    this.searchOptions,check
                  ),
                ...check
            })
            $li.append(checkbox.render())
            this.$rollListCard.append($li)
          })

        
        const $rollList = $.create('div','roll-list')
        $rollList.append(this.$title).append(this.$rollListCard)
        return $rollList
    }
    onClick(e){
        const $t = $(e.target)
        if($t.data.type){
            this.$rollListCard.toggle('roll-list__list--visible')
            this.$title.toggle('arrow--rotation')
        }
    }
    onInput(){
        console.log('input')
    }
}