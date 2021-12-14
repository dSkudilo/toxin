import { Component } from "../../core/Component";
import { $ } from "../../core/dom";
import { createBgImg, createBtn, createFormControl, createH2 } from "../../core/utils";

export class SingInMain extends Component{
    static rootTag = 'div'
    static className = 'login'
    constructor($root, options){
        super($root,{
            name:'SingInMain',
            ...options
        })
    }
    render(){
        const $loginMain = $.create('main','whole')
        const $loginContent =  $.create('div',['login__content','modal-card'])
        const $loginContentNoAc = $.create('div',['flex','sb','ac'])
        const $loginContentText = $.create('p','dark-text')
        $loginContentText.text('Нет аккаунта на Toxin?')
        $loginContentNoAc
            .append($loginContentText)
            .append(createBtn('Создать',['btn']))
        $loginContent
            .append(createH2('Войти',['mb20']))
            .append(createFormControl('email','email'))
            .append(createFormControl('password','password',['mb20']))
            .append(createBtn('Войти',['purple-big','mb30']))
            .append($loginContentNoAc)
        $loginMain
            .append(createBgImg())
            .append($loginContent)
        return $loginMain 
    }

}