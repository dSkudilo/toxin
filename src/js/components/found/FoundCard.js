import { Component } from '../../core/Component';
import { $ } from '../../core/dom';
import * as actions from '../../redux/actions';
import { Slider } from '../../ui/Slider';
import { Rating }from '../../ui/Rating';
import { ActiveRoute } from '../../core/route/ActiveRoute';
export class Card extends Component{
    constructor($root,options ={}){
        super($root,{
            name:'Card',
            listeners:['click'],
            ...options
        })
        this.$root = $root
        this.data = options.data
        this.id = this.data.id

    }
 
 
    createComponent(Class,data){
        const $elem = $.create(Class.rootTag,'found__' + Class.className)
        const component = new Class($elem,data)
        this.childComponents.push(component)
        $elem.append(component.render())
        return $elem
    }
    render(){
        //rating + slider
        const $foundAbout = $.create('div','found__about')
        const $infoRoom = $.create('div', ['info-room','flex','sb','ac'])
        const $numberRoom = $.create('h4','number-room')
        $numberRoom.text('№ ' + this.data.number)
        if(this.data.luxury){
            const $luxury = $.create('span','luxury-room')
            $luxury.text(' Люкс')
            $numberRoom.append($luxury)
        } 
        const $aboutText = $.create('p','text')
        $aboutText.text(' в сутки')
        const $aboutPrice = $.create('strong')
        $aboutPrice.text(this.data.prise)
        $aboutText.prepend($aboutPrice)
        $infoRoom.append($numberRoom).append($aboutText)
         
        const $foundFeedback = $.create('div',['found__feedback','flex','sb','ac'])
       
        const $textReview = $.create('p','text')
        $textReview.text(' Отзывов')
        const $valReview = $.create('strong')
        $valReview.text(this.data.reviews)
        $textReview.prepend($valReview)
       
        //create cardLink 
        const $cardLink = $.create('a')
        $cardLink.attr('href',ActiveRoute.room + this.id)
        
        //card assembly
        $foundFeedback
            .append(this.createComponent(Rating,this.data))
            .append($textReview)
        $foundAbout
            .append($infoRoom)
            .append($foundFeedback)
        $cardLink
            .append(this.createComponent(Slider,this.data))
            .append($foundAbout)
        
        this.$root.append($cardLink)
        return this.$root
    }
    onClick(event){
        const $t = $(event.target)
        if($t.data.type == 'rating'){

            this.$dispatch(actions.rateNumber({
                id:this.id,
                value:$t.attr('value')
            }))
        }
        console.log('hi')
    }
}