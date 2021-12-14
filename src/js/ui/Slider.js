import { Component } from "../core/Component"
import { $ } from "../core/dom"

export class Slider extends Component{
    static className = 'slider'
    static rootTag = 'div'
    constructor($root,{id,images = []}){
        super($root, {
            name:'slider',
            listeners:['click']
        })
        this.$root = $root
        this.images = images
        this.index = 0
        this.slider
        this.wrap
        this.row
        this.radioBtns = []
        this.id = id
    }
    init(){
        super.init()
    }
    onClick(event){
        const $t = $(event.target)
        if(!$t.data.type){
            return
        }
        const max = this.images.length - 1
        this.radioBtns.forEach(btn => btn.checked = false)
        switch($t.data.type){
            case 'arrowLeft':
                event.preventDefault()
                this.index <= 0 
                    ? this.index = 0
                    : this.index-- 
                this.changeStyle()
                console.log(this.index)
                return this.index
            case 'arrowRight':
                
                this.index >= max
                    ? this.index = max
                    : this.index++
                this.changeStyle()
                console.log(this.index)
                event.preventDefault()
                return this.index
            case 'radio':
                this.index = $t.attr('value')
                this.changeStyle()
                return this.index
        }
    }
    destroy(){
        super.destroy()
        
    }
    changeStyle(){
        this.row.style.marginLeft = -(this.wrap.offsetWidth * this.index) + 'px'
        this.radioBtns[this.index].checked = true
    }
    render(){
        const slider = $.create('div','slider')

        const sliderWrap = $.create('div',['slider__wrap','found__radius'])
        this.wrap = sliderWrap.$el 

        const sliderRow = $.create('div','slider__row')
        this.row = sliderRow.$el

        const sliderButtons = $.create('div','slider__buttons')

        const id = Math.random()
        this.images.forEach((img,i) => {
            const image = $.create('img')
            image.attr('src',`../src/assets/img/room/${img}`) 
            image.attr('alt',`hotel${Math.random()}`) 
        
            sliderRow.append(image)//вставляем картинки
            const nameSlide = 'slide__'+ id + i
            const radio = $.createInput('slider__radio','slide__point' + id,'radio',nameSlide,i )
            radio.data.type = 'radio'
            if(i == 0){
                radio.attr('checked',true)
            }

            const label = $.create('label',['slider__label'])
            label.attr('for',nameSlide)
            this.radioBtns.push(radio.$el)
            sliderButtons.append(radio).append(label)//радио кнопки
            
        })
        const divLeft = $.create('div',['slider__side','slider__side-left'])
        const divRight = $.create('div',['slider__side','slider__side-right'])

        divRight.data.type = 'arrowRight'
        divLeft.data.type = 'arrowLeft'

        sliderWrap.append(sliderRow).append(divRight).append(divLeft)
      
        const arrowLeft = $.create('button',['slider__arrow','slider__arrow-left'])
        arrowLeft.data.type = 'arrowLeft'

        const arrowRight = $.create('button',['slider__arrow','slider__arrow-right'])
        arrowRight.data.type = 'arrowRight'
        
        slider.append(sliderWrap).append(arrowLeft).append(arrowRight).append(sliderButtons)
        this.slider = slider.$el
        return this.slider
    }
    

}