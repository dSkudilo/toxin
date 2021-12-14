import { Component } from '../core/Component';
import { $ } from '../core/dom';
import { ActiveRoute } from '../core/route/ActiveRoute';

export class Paginate extends Component{
    static className = 'paginate'
    static rootTag = 'div'
    constructor($root,options = {}){
        super($root,{
            name:'paginate',
            listeners:['click'],
            ...options
            
        })
        this.$root = $root
        this.counter = options.roomCounter 
        this.length = options.value
        this.valueRooms = options.paginateCounter
        if(options.currentStep > this.length){
            this.currentStep = this.length 
        }else if(options.currentStep <= 0 ){
            this.currentStep = 1
        }else{
            this.currentStep = options.currentStep 
        }
        
        this.paginate
    }
    
    // redrawing(){
    //     this.destroy()
    //     this.render()
    //     this.paginate.on('click',this.onClick.bind(this))
    //     this.$root.append(this.paginate)
    // }
    destroy(){
        super.destroy()
        this.$root.clear()
    }
    onClick(event){
        const $t = $(event.target)
        if(!$t.data.type){
            return
        }
        switch($t.data.type){
            case 'left':
                if(this.currentStep == 1){
                    return this.currentStep
                }else{
                    this.currentStep -= 1
                    ActiveRoute.route('found/'+(this.currentStep))
                }
                return this.currentStep
            case 'right':
                if(this.currentStep == this.length){
                    return this.currentStep
                }else{
                    this.currentStep =-(-this.currentStep - 1)
                    ActiveRoute.route('found/'+ (this.currentStep))
                }
                return this.currentStep
            default:
                ActiveRoute.route('found/'+ ($t.data.type))
        }
    }
    render(){
        const $paginate = $.create('div','paginate')
        const $paginateContent = $.create('div','paginate__content')
        const $list = $.create('ul','paginate__list')
        
        let prevSteps
        let nextSteps 
        if(this.currentStep - 2 >= 1){
            prevSteps = this.currentStep - 2
        }else if(this.currentStep - 1 >= 1){
            prevSteps = this.currentStep - 1
        }else{
            prevSteps = 1
        }
        
        if(-(-this.currentStep - 2) > this.length){
            nextSteps = this.length
        }else if(-(-this.currentStep - 1) > this.length){
            nextSteps = this.length - 1
        }else{
            nextSteps = -(-this.currentStep - 2)
        }  
        for (let i = prevSteps; i <= nextSteps; i++) {
            const $li = $.create('li','paginate__item')
            const $btn = $.create('button','radius-btn')
            if(i == this.currentStep){
                $btn.addClass('radius-btn_active')
            }
            $btn.text(i)
            $btn.data.type = i
            $li.append($btn)
            $list.append($li)
        }
        if(prevSteps + 2 > 3){
            $list.prepend(createDots())
            $list.prepend(createBtn(1))
        }
        if(nextSteps + 1 < this.length){
            $list.append(createDots())
            $list.append(createBtn(this.length,this.length))
        }

        $paginateContent.append($list)

        const $liL = $.create('li','paginate__item')
        const $arrowL = createArrow('fa-arrow-left','left')
        this.currentStep > 1
            ? $arrowL.addClass('radius-btn__arrow')
            : $arrowL.addClass('radius-btn__arrow_disabled')
        $liL.prepend($arrowL)
        $paginateContent.prepend($liL)
        const $liR = $.create('li','paginate__item')
        const $arrowR = createArrow('fa-arrow-right','right')
        this.currentStep < this.length 
            ? $arrowR.addClass('radius-btn__arrow')
            : $arrowR.addClass('radius-btn__arrow_disabled')
        $liR.append($arrowR)
        $paginateContent.append($liR)

        $paginate.append($paginateContent)
        
        const $paginateText = $.create('p','paginate__text')
        const moreThan = this.counter
        
        let from = (this.currentStep) * this.valueRooms
        from > moreThan
            ? from = moreThan
            : ''
        
        $paginateText.text(`${(this.currentStep - 1)* this.valueRooms + 1} - ${from} из ${moreThan} вариантов аренды`)
        $paginate.append($paginateContent)
        $paginate.append($paginateText)
        this.paginate = $paginate
        return this.paginate
    }
}

function createDots(){
    const $li = $.create('li','paginate__item')
    const $points = $.create('span','radius-btn_nocursor')
    $points.text('...')
    $li.append($points)
    return $li
}
function createBtn(textContent,dataType = 0){
    const $li = $.create('li','paginate__item')
    const $Btn = $.create('button','radius-btn')
    $Btn.text(textContent)
    $Btn.data.type = dataType
    $li.append($Btn)
    return $li
}
function createArrow(classes, type){
    const $arrow = $.create('i',['fas',classes] )
    $arrow.data.type = type
    return $arrow
}