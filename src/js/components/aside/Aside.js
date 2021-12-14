import { availabilityInfo, houseRules } from "./checkboxAside"
import { dropdownAvailability, dropdownCalendar, dropdownGuests } from "./dropdownAside"
import { Component } from "../../core/Component"
import { $ } from "../../core/dom"
import { createBtn, createH3, isChecked } from "../../core/utils"
import { ChecboxDefault } from "../../ui/checboxes/ChecboxDefault"
import { ChecboxWhithTitle } from "../../ui/checboxes/ChecboxWhithTitle"
import { DoubleRange } from "../../ui/DoubleRange"
import { DropCalendar } from "../../ui/drops/calendar/DropCalendar"
import { DropCounter } from "../../ui/drops/DropCounter"
import { RollList } from "../../ui/RollList"
import { additionalAmenities } from "./additionalAside"
import * as action from '../../redux/actions'
export class Aside extends Component {
    static className = 'aside'
    static rootTag = 'aside'
    constructor($root,options = {}){
        super($root,{
            name:'Footer',
            listeners:['input','click'],
            subscribe:['rateNumbers'],
            ...options
        })
        this.emitter = options.emitter
        this.store = options.store
        this.dropdowns = []
        
        this.locStorage = this.store.getState()
        this.searchOptions = this.locStorage.searchOptions || []

        this.$aside
        this.$showBtn
        this.$body
    }
    

    init(){
      super.init()
      this.$on('dropdown:click', data => {
        this.$dispatch(action.searchDropdown(data))
      })
      this.$on('calendar:select',data => {
        this.$dispatch(action.searchDate(data))
      })
      this.$showBtn.on('click',this.toggleMobileAside.bind(this))
      this.$backDrop.on('click',this.closeMobileAside.bind(this))
    }
    destroy(){
      this.closeMobileAside()
      super.destroy()
      this.$showBtn.off('click',this.toggleMobileAside)
      this.$backDrop.off('click',this.closeMobileAside.bind(this))
      this.$showBtn.remove()
      
    }
    storeChanged(changes){
      console.log(changes,'from aside')
    }
    render(){
      this.$body = $('body')
      this.$showBtn = createBtn('','aside__show',['fas', 'fa-bars'])
      this.$showBtn.data.type = 'mobileShow'
      this.$backDrop = $.create('div')
      this.$body.append(this.$showBtn).append(this.$backDrop)

      this.$aside = $.create('div','aside')
      this.$aside
        .append(this.createDropdown(DropCalendar,{
          ...dropdownCalendar,
          ...this.locStorage.date
        }))
        .append(this.createDropdown(DropCounter,{
          name:'guests',
          ...dropdownGuests,
          ...this.locStorage.guests,
        }))
        .append(this.createDoubleRange())
        .append(this.createCheckBox(ChecboxDefault,houseRules,'Правила дома',))
        .append(this.createCheckBox(ChecboxWhithTitle,availabilityInfo,'Доступность'))
        .append(this.createDropdown(DropCounter,{
          name:'availability',
          ...dropdownAvailability,
          ...this.locStorage.availability
        }))
        .append(this.createRollList())
      return this.$aside
  }
  toggleMobileAside(){
    this.$aside.toggle('aside--visible')
    this.$showBtn.toggle('aside__show--active')
    this.$backDrop.toggle('back-drop')
  }
  closeMobileAside(){
    this.$aside.removeClass('aside--visible')
    this.$showBtn.removeClass('aside__show--active')
    this.$backDrop.removeClass('back-drop')
  }
  onInput(event){
    const $t = $(event.target)
    this.$dispatch(action.searchOptions($t.attr('name')))
  }
  onClick(event){
    console.log('clik')
  }

  createDropdown(Class,content){
    const $dropdown = $.create(Class.rootTag,Class.className)
    const component = new Class($dropdown,{emitter:this.emitter,...content})
    this.dropdowns.push(component)
    this.childComponents.push(component)
    $dropdown.append(component.render())
    return $dropdown
  }
  createCheckBox(Class,data,title){
    const $checkBox = $.create(Class.rootTag,[Class.className,'mb30'])
    $checkBox
      .append(createH3(title,['mb15']))  
      .append(this.createUl(Class,data))
    return $checkBox
  }
  createRollList(){
    const $rollList = $.create('div','aside__roll')
    const rollList = new RollList($rollList,{
      checkboxes:additionalAmenities,
      searchOptions:this.searchOptions
    })
    $rollList.append(rollList.render())
    this.childComponents.push(rollList)
    return $rollList
  }
  createDoubleRange(){
    const $asideRange = $.create(DoubleRange.rootTag,[
      `${Aside.className}__${DoubleRange.className}`,
      'mb30'])
    const range = new DoubleRange($asideRange)
    const $rangePrice = $.create('span','grey-small')
    const $rangeFlex = $.create('div',['flex','sb'])
    $rangePrice.text('5000Р - 10000Р')
    $rangeFlex
      .append(createH3('Диапазон цены'))
      .append($rangePrice)
   
    const $rangeText = $.create('p','grey-small')
    $rangeText.text('Стоимость за сутки пребывания в номере') 
    $asideRange
      .append($rangeFlex)
      .append(range.render())
      .append($rangeText)
  
    this.childComponents.push(range)
    return $asideRange
  }
    createUl(instClass,data){
      const $ul = $.create('ul',['aside__list'])
      data.forEach(d =>{
        $ul.append(
          this.createLi(instClass,
            {
              checked:isChecked(
                this.searchOptions,d
              ),
              ...d
            })
        )}
      )
      return $ul
    }
    createLi(instClass,options = {}){
      const $li = $.create('li','aside__item')
      const checkbox = new instClass($li,{...options})
      this.childComponents.push(checkbox)
      $li.append(checkbox.render())
      return $li
    }
}
