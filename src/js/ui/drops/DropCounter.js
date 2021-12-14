import { $ } from "../../core/dom";
import { Dropdown } from "./Dropdown";

export class DropCounter extends Dropdown{
    static className = 'guests'
    static rootTag = 'div'
    constructor ($root,options = {}){
        super($root,{
                name:'DropGuests',
                listeners:['click'],
                btnContent: options.btnContentStorage || options.btnContent,
                ...options
            },
        )
        this.$root = $root,
        this.field = options.fieldStorage || options.field
        this.keyWord = options.keyWord
        this.allCount = options.allCount
        this.name = options.name
        this.btnContent = options.btnContent
     
    }
    render(){
        this.$guestsDrop = $.create('ul','guests__list')
        this.redraw()
        const $dropdownControl = super.render()
        this.$drop.append(this.$guestsDrop)
        return $dropdownControl
    }
    onClick(event){
        super.onClick(event)
        const $t = $(event.target)
        if(isButtonValue($t,'plus')){
            this.field.forEach(f => {
                if(isButtonKeys($t,f)){
                   f.count += 1
                   this.redraw()
               }
           })
        }else if(isButtonValue($t,'minus')){
            this.field.forEach(f => {
                if(isButtonKeys($t,f)){
                    f.count > 0 
                        ? f.count -= 1
                        :''
                    this.redraw()
                }
            })
        }
        let placeholder = 0
        if(this.allCount){
            this.field.forEach(who => {
                if(who.count > 0){
                    placeholder =placeholder + who.count
                }
            })
        }else{
            placeholder = placeholder + this.field[0].count
        }
        let btnContent    
        placeholder > 0 
            ? btnContent = this.keyWord + placeholder
            : btnContent = this.btnContent
        this.$btn.text(btnContent)
        
        
        placeholder = 0
        this.$emit('dropdown:click',{
            name:this.name,
            data:this.field,
            btnContent
        })
       
    }
    redraw(){
        this.$guestsDrop.clear()
        this.field.forEach(f => {
            const $li = createLi(f.name,f.count,f.type)
            this.$guestsDrop.append($li)
        })
    }

}
function createLi(name,counter,type){
    const $li = $.create('li',['guests__item','flex','sb','ac'])
    const $p = $.create('p','guests__text')
    $p.text(name)
    $li.append($p).append(createCounter(counter,type))
    return $li
}

function createCounter(counter,type){
    const $guestsValue = $.create('div',['flex','ac'])
    const $plusBtn = $.create('button','guests__control')
    $plusBtn.text('+')
    $plusBtn.data[type]='plus'
    const $minusBtn = $.create('button','guests__control')
    $minusBtn.text('-')
    $minusBtn.data[type]='minus'
    $plusBtn.data.mark ='dropdown'
    $minusBtn.data.mark ='dropdown'
    const $text = $.create('p',['guests__counter','guests__text'])
    $text.text(counter)
    if(counter == 0){
        $minusBtn.addClass('guests__control--disabled')
    }
    $guestsValue    
        .append($plusBtn)
        .append($text)
        .append($minusBtn)
    return $guestsValue
}
function isButtonValue($elem,type){
    if(Object.values($elem.data).indexOf(type) !== -1){
        return true
    }
    return false
}
function isButtonKeys($elem,field){
    if(Object.keys($elem.data).indexOf(field.type) !== -1){
        return true
    }
    return false
}