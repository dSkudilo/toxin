import { Component } from "../core/Component"
import { $ } from "../core/dom"

export class Rating extends Component{
    static className = 'rating'
    static rootTag = 'div'
    constructor($root,{id,rating,appreciated}){
        super($root,{
            name:'rating',
            listeners:['mouseenter','mouseleave','click']
        })
        this.$root = $root
        this.id = id
        this.rating 
        this.ratingValue = rating
        this.appreciated = appreciated
        this.$ratingInputs = []
        this.$ratingActive 
    }
    setRating(rating){
        const actualWidth = ratingWidth(rating) + 'px'
        this.$ratingActive.css({'width':actualWidth})
    }
    changeColor(){
        this.$ratingActive.addClass('rating__selected')
        this.$ratingActive.removeClass('rating__active')
    }
    render(){
        const $rating = $.create('div','rating')
        const $ratingBody = $.create('div','rating__body')
        const $ratingActive = $.create('div','rating__active')
        const ratingActiveWidth = ratingWidth(this.ratingValue) + '%'
      
        $ratingActive.css({'width':ratingActiveWidth})
        this.$ratingActive  = $ratingActive
        const $ratingItems = $.create('div','rating__items')
        for (let i = 1; i < 6; i++) {
            const id = 'rating-' + this.id + i
            const $ratingInput = $.create('input','rating__item')
            const name = id
            $ratingInput.attr('value',i)
            $ratingInput.attr('name',name)
            $ratingInput.attr('type','radio')
            $ratingInput.data.type="rating"
            
            this.$ratingInputs.push($ratingInput)
            $ratingItems.append(this.$ratingInputs[i-1])
        }

        $ratingBody.append(this.$ratingActive).append($ratingItems)
        $rating.append($ratingBody)
        this.rating = $rating
        if(this.appreciated){
            this.changeColor()
        }
        return this.rating
    }
 

    init(){
        this.$ratingInputs.forEach(ratinInput => {
            ratinInput.on('mouseenter', e => {
                this.setRating(getRating(e))
            })
            ratinInput.on('mouseleave',() => this.setRating(this.ratingValue))
            ratinInput.on('click',(e => {
                this.ratingValue = getRating(e)
                this.setRating(this.ratingValue)
                this.changeColor()
            }))
        })
    }
       
        
}
function getRating(e){
    const $t = $(e.target)
    const rating = $t.attr('value')
    return rating
}
function ratingWidth(value){
    return value / 0.05 
}