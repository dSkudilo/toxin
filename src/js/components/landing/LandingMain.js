import { Component } from "../../core/Component";
import { $ } from "../../core/dom";

export class LandingMain extends Component{
    static className = 'content'
    static rootTag = 'div'
    constructor($root, options){
        super($root,{
            name:'LandingMain',
            ...options
        })
    }
    render(){
        const $landingMain = $.create('main','landing__main')
        const $landingRoot = $.create('div','landing__root')
        const $landingImg =  $.create('div','landing__img')
        const $landingContent =  $.create('div','landing__content')
        const $landingSearch =  $.create('div','landing__search')
        const $landingText =  $.create('p','landing__text')
      
        // create seacrh
        const $search = $.create('div','search')
        const $searchTitle = $.create('h2','search__title')
        $searchTitle.text('Найдём номера под ваши пожелания')
        const $searchFlex  = $.create('div',['flex','sb','ac'])

        $searchFlex
            .append(createForm('search__date','Прибытие','ДД.ММ.ГГГГ'))
            .append(createForm('search__date','Выезд','ДД.ММ.ГГГГ'))

        const $searchBtn = $.create('button','purple-big')
        $searchBtn.text('подобрать номер ->')
        
        $search
            .append($searchTitle)
            .append($searchFlex)
            .append(createForm('guests','Гости','Сколько гостей'))
            .append($searchBtn)

        $landingSearch.append($search)
        
        $landingContent.append($landingSearch)
        $landingContent.append($landingText)
        $landingImg.append($landingContent)
        $landingRoot.append($landingImg)
        $landingMain.append($landingRoot)
           
        return $landingMain
    }
} 
function createForm(className,labelText,btnText){
    const $wrap = $.create('div',[className,'form-control'])
    const $label = $.create('label')
    $label.text(labelText)
    const $btn = $.create('button','form-button')
    $btn.text(btnText)
    $wrap
        .append($label)
        .append($btn)
    return $wrap
}