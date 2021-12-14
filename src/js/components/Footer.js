import { Component } from "../core/Component"
import { $ } from "../core/dom"
import { createH3, createLogo, createNavLi } from "../core/utils"

export class Footer extends Component {
    static className = 'footer'
    static rootTag = 'footer'
    constructor($root,options){
        super($root,{
            name:'Footer',
            ...options
        })
        this.links = [
            {
                link:'#',
                text:'Главная'
            },
            {
                link:'#services',
                text:'Услуги'
            },
            {
                link:'#found',
                text:'Поиск отеля'
            },
            {
                link:'#news',
                text:'Новости'
            }
        ]
        this.about = [
            {
                link:'#about',
                text:'О сервисе'
            },
            {
                link:'#team',
                text:'Наша команда'
            },
            {
                link:'#vacancies',
                text:'Вакансии'
            },
            {
                link:'#invest',
                text:'Инвесторы'
            },
        ]
        this.help = [
            {
                link:'#agreements',
                text:'Соглашения'
            },
            {
                link:'#community',
                text:'Сообщества'
            },
            {
                link:'#contactUs',
                text:'Связь с нами'
            },
        ]
        this.social = [
            {
                link:'tw',
                img:'tw.svg'
            },
            {
                link:'facebook',
                img:'f.svg'
            },
            {
                link:'instagram',
                img:'in.svg'
            },
        ]
    }
   
    
    render(){
        const $footer = $.create('div','')

        const $footerContent = $.create('div',[
            'footer-content',
            'flex',
            'sb',
            'container'
        ])

        const $footerContentInfo = $.create('div','footer-content__info')
        const $footerContentInfoText = $.create('p',['footer-text','grey-text'])
        $footerContentInfoText.text('Бронирование номеров в лучшем отеле 2019 года по версии ассоциации «Отельные взгляды»')

        $footerContentInfo
            .append(createLogo())
            .append($footerContentInfoText)

        $footerContent
            .append($footerContentInfo)
            .append(this.createFooterNav(this.links))
            .append(this.createFooterList('footer-content__about','О нас',this.about))
            .append(this.createFooterList('footer-content__help','Помощь',this.help))
            .append(this.createFooterSub())
        
        const $footerBar = $.create('div','footer-bar')
        const $footerBarContainer = $.create('div',['container','flex','sb','ac'])
        const $footerBarText = $.create('p','footer-bar__copyright')
        $footerBarText.text('Copyright © 2018 Toxin отель. Все права защищены.')
        
        $footerBarContainer
            .append($footerBarText)
            .append(this.createFooterSocialList(this.social))
        $footerBar
            .append($footerBarContainer)
        $footer
            .append($footerContent)
            .append($footerBar)
        return $footer
    }
    createFooterNav(links){
        const $nav = $.create('nav','footer-content__nav')
        const $h3 = $.create('h3','subtitle')
        $h3.text('Навигация')
        const $ul = $.create('ul','footer-content__list')
        links.forEach(link => $ul.append(createNavLi(link,'footer-content__item')))
        $nav
            .append($h3)
            .append($ul)
        return $nav
    }
    createFooterList(divClass,subtitle,links){
        const $div = $.create('div',divClass)
        const $ul = $.create('ul','footer-content__list')
        links.forEach(link => $ul.append(createNavLi(link,'footer-content__item')))
        $div
            .append(createH3(subtitle))
            .append($ul)
        return $div
    }
    createFooterSub(){
        const $div = $.create('div','footer-content__sub')
        const $p = $.create('p',['footer-text','grey-text','mb15'])
        $p.text('Получайте специальные предложения и новости сервиса')
        const $formControl = $.create('div','form-control')
        const $input = $.create('input')
        $formControl.append($input)
        $input.attr('placeholder','Email')
        $div
            .append(createH3('Подписка'))
            .append($p)
            .append($formControl)
        return $div
    }
    createFooterSocialList(links){
        const $ul = $.create('ul',['footer-bar__list', 'flex', 'ac'])
        links.forEach(link => $ul.append(this.createFooterSocialLi(link)))
        return $ul
    }
    createFooterSocialLi(link){
        const $li = $.create('li','footer-bar__item')
        const $a = $.create('a','footer-bar__link')
        $a.attr('href','#')
        const $img = $.create('img','footer-bar__img')
        $img.attr('src','./src/assets/img/footer/' + link.img)
        $a.append($img)
        $li.append($a)
        return $li 
    }
}
