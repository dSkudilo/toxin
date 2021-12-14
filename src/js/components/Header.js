import { Component } from "../core/Component";
import { $ } from "../core/dom";
import { ActiveRoute } from "../core/route/ActiveRoute";
import { createLogo, createNavLi } from "../core/utils";

export class Header extends Component{
    static className = 'header'
    static rootTag = 'header'
    constructor($root,options){
        super($root, {
            name:'Header',
            subscribe:['rateNumbers'],
            ...options
        })
        this.links = [
            {
                link:'#',
                text:'Главная',
                icon:['fas', 'fa-home']
            },
            {
                link:'#services',
                text:'Услуги',
                icon:['far', 'fa-calendar-plus']
            },
            {
                link:'#vacancies',
                text:'Вакансии',
                icon:['fas', 'fa-briefcase']
            },
            {
                link:ActiveRoute.found,
                text:'Поиск отеля',
                icon:['fas', 'fa-search-location']
            },
            {
                link:'#news',
                text:'Новости',
                icon:['fas', 'fa-info']
            },
            {
                link:'#singIn',
                text:'Войти',
                icon:['far', 'fa-user-circle'],
                mobile:true
            },
            {
                link:'#singUp',
                text:'Зарегистрироваться',
                icon:['far', 'fa-edit'],
                mobile:true
            }
        ]
    }
    storeChanged(changes){
        console.log(changes,'from header')
      }
    createNav(){
        const $nav = $.create('nav','header-nav')
        const $navList = $.create('ul',['header-nav__list','flex'])
        this.links.forEach(link => $navList.append(createNavLi(link,'header-nav__item')))
        $nav
            .append($navList)
        return $nav
    }
    
    createLink(className,text,link){
        const $link = $.create('a',className)
        $link.text(text)
        $link.attr('href',link)
        return $link
    }
    render(){
        const $header = $.create('header','header')
        
        const $headerWrap = $.create('div',['header-wrap', 'container', 'flex', 'sb' ,'ac'])
        const $headerBtns = $.create('div','header-btns') 
        $headerBtns
            .append(this.createLink('btn','Войти','#singIn'))
            .append(this.createLink('purple','Зарегистрироваться','#singUp'))

        $headerWrap 
            .append(createLogo())
            .append(this.createNav())
            .append($headerBtns)
        $header
            .append($headerWrap)

        return $header
    }
}