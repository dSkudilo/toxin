import { Component } from '../../core/Component'
import { $ } from '../../core/dom'
import { createBgImg, createBtn, createFormControl, createH2 } from '../../core/utils'

export class SingUpMain extends Component{
  static rootTag = 'div'
  static className = 'sing-up'
  constructor($root, options){
      super($root,{
          name:'SingUpMain',
          ...options
      })
  }
  render(){
    const $singUp = $.create('main','whole')
    const $singUnCard = $.create('div',['sing-up__card','modal-card'])
    
    const $singUpRadio = $.create('div',['flex','ac','mb20'])
    $singUpRadio
      .append(this.createRadio('Мужчина'))
      .append(this.createRadio('Женщина'))
    const $singUpIn = $.create('div',['flex','sb','ac'])
    const $singUpInText = $.create('p','dark-text')
    $singUpInText.text('Уже есть аккаунт на Toxin ?')
    $singUpIn
      .append($singUpInText)
      .append(createBtn('Войти',['btn']))
    
    $singUnCard
      .append(createH2('Регистрация аккаунта',['mb20']))
      .append(createFormControl('text','Имя'))
      .append(createFormControl('text','Фамилия'))
      .append($singUpRadio)
      .append(createFormControl('texе','ДД.ММ.ГГГГ',['mb20'],'Дата рождения'))
      .append(createFormControl('email','Email',[],'Данные для входа в сервис'))
      .append(createFormControl('password','Пароль'))
      .append(this.createSlideChecbox('Получать спецпредложения'))
      .append(createBtn('Зарегистрироваться',['purple-big','mt20','mb30']))
      .append($singUpIn)

    $singUp
      .append(createBgImg())
      .append($singUnCard)
    return $singUp
  }
  createRadio(text){
    const $radio = $.create('div','radio-control')
    const $label = $.create('label')
    const $input = $.create('input')
    $input.attr('type','radio')
    $input.attr('name','gender')
    const $radioCustom = $.create('span','radio-control__custom')
    const $radioText = $.create('span','grey-text')
    $radioText.text(text)
    $label
      .append($input)
      .append($radioCustom)
      .append($radioText)
    $radio.append($label)
    return $radio
  }
  createSlideChecbox(text){
    const $radio = $.create('div','slide-checkbox')
    const $label = $.create('label')
    const $input = $.create('input')
    $input.attr('type','checkbox')
    const $radioCustom = $.create('span','slide-checkbox__custom')
    const $radioText = $.create('span','grey-text')
    $radioText.text(text)
    $label
      .append($input)
      .append($radioCustom)
      .append($radioText)
    $radio.append($label)
    return $radio
  }
}