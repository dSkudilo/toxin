import { Component } from "../../core/Component";
import { $ } from "../../core/dom";
import { Aside } from '../aside/Aside';
import { Card } from "./FoundCard";
import { Paginate } from "../../ui/Paginate";
import { paginate } from "../../../appOptions";
import * as data from '../../../../db.json'
import { ActiveRoute } from "../../core/route/ActiveRoute";
import { time } from "../../core/utils";
export class FoundMain extends Component{
  static className = 'content'
  static rootTag = 'div'
  constructor($root,options){
      super($root, {
          name:'FoundMain',
          subscribe:['searchOptions','guests','availability','date'],
          ...options
      })
    
      this.emitter = options.emitter
      this.store = options.store
      this.locStorage


      this.dataRooms = data.rooms
      this.roomsCounter = this.rooms.length
      this.valuePages = Math.ceil( this.roomsCounter / paginate.counter)
      this.pageNumber = ActiveRoute.param
      if(this.pageNumber>this.valuePages){
        this.valuePages > 0 
          ? this.pageNumber = this.valuePages
          : this.pageNumber = 1
      }else if(this.pageNumber <= 0){
        this.pageNumber = 1
      }
      
    }
  prepare(){
    
    this.locStorage = this.store.getState()
    this.rooms = sortSearchOptions(
      data.rooms,
      this.locStorage.searchOptions,
      countGuest(this.locStorage),
      countAvailability(this.locStorage,'bed'),
      countAvailability(this.locStorage,'bedroom'),
      this.locStorage.date

    )
  }
  init(){
    super.init()
  }
  storeChanged(changes){
    this.locStorage = this.store.getState()
    this.rooms = sortSearchOptions(
      data.rooms,
      this.locStorage.searchOptions,
      countGuest(this.locStorage),
      countAvailability(this.locStorage,'bed'),
      countAvailability(this.locStorage,'bedroom'),
      this.locStorage.date

    )
    this.roomsCounter = this.rooms.length
    this.valuePages = Math.ceil( this.roomsCounter / paginate.counter)
    this.showcaseClear()//удаляет содержимое и все прослушки 
    this.showcaseReCreate()//создаёт содержимое и прослушки
    
    ActiveRoute.route('found/1')      
  }

  initChildRec(c){//рекурсивные функции
    if(this.isAside(c)){
      return
    }
    c.init()
    if(c.childComponents.length > 0){
      c.childComponents.forEach(comp => {
        this.initChildRec(comp)
      })
    }
  }
  destroyChildRec(c){//рекурсивные функции
    if(this.isAside(c)){
      return
    }
    c.destroy()
    if(c.childComponents.length > 0){
      c.childComponents.forEach(comp => {
        this.destroyChildRec(comp)
      })
    }
    this.childComponents = []
  }
  showcaseReCreate(){
    this.craeteMainFound()
    this.childComponents.forEach(c => this.initChildRec(c));
  }
  showcaseClear(){
    this.childComponents.forEach(c => this.destroyChildRec(c))
    this.$root.find('.found__main').clear()
  }
  
  render(){
    this.$mainFound = $.create('main','found__main')

    const $asideRoot = $.create(Aside.rootTag,'found__' + Aside.className)
    this.aside = new Aside($asideRoot,{
      emitter:this.emitter,
      store:this.store
    })
    $asideRoot.append(this.aside.render())
    this.childComponents.push(this.aside)
    
    const $found = $.create('div',['container','found','flex'])
    
    $found
      .append($asideRoot)
      .append(this.craeteMainFound())
    return $found

  }
  craeteMainFound(){
    
    this.childComponents.splice(1)
    const $paginateRoot = $.create(Paginate.rootTag,'found__'+ Paginate.className)
    this.pagin = new Paginate($paginateRoot,{
      value:this.valuePages,
      paginateCounter:paginate.counter, 
      roomCounter: this.roomsCounter,
      currentStep:this.pageNumber 
    })
    $paginateRoot.append(this.pagin.render())
    this.childComponents.push(this.pagin)
  
    if(this.rooms.length > 0){
      this.$mainFound
        .append(this.createTitle())
        .append(this.createShowcase(
          lodashChunk(
            this.pageNumber,
            paginate.counter,
            this.rooms,
            this.roomsCounter
          )
        ))
        .append($paginateRoot)
    }else{
      this.$mainFound
      .append(this.createTitle(true))
    }
    return this.$mainFound
  }
  createTitle(notFound = false){
    if(notFound){
      const $foundTitle = $.create('h1','found__title')
      $foundTitle.text('У нас нету подходящих для вас номеров')
      return $foundTitle
    }
    const $foundTitle = $.create('h1','found__title')
    $foundTitle.text('Номера, которые мы для вас подобрали')
    return $foundTitle
  }
  createShowcase(data){
    const $foundRooms = $.create('div','found__rooms')
    const   $flex = $.create('div',['flex','flex-wrap'])
    const rateNumbers = this.store.getState().rateNumbers 
    if(data){
      data.forEach(room => {
        if(!room){
          return
        }
        if(rateNumbers && rateNumbers[room.id]){
          room.rating = rateNumbers[room.id]
          room.appreciated = true
        }
        const $card = $.create('div','found__room')
        const card = new Card($card,{
          data:room,
          emitter:this.emitter,
          store:this.store})
        this.childComponents.push(card)
        $flex.append(card.render())
      })
    }
    $foundRooms.append($flex)
    return $foundRooms
  }
  isAside(component){
    if(component instanceof Aside){
      return true
    }
    return false
  }
  onClick(){
    
  }
}
function lodashChunk(start,step,arr,maxlength){
  let to = start * step //конечный индекс на странице
  let from =  to - step //начальный индекс
  const loadChunk = []
  for (let i = from; i < to; i++) {
    if(maxlength > i){
      loadChunk.push(arr[i])
    }
  }
  return loadChunk
}
function sortSearchOptions(arr = [] ,sortArr = [], guestsValue,bed,bedRooms,date){
  const newArr = []
  let flag = false
  arr.forEach(room => {
    if(room.datesOrders && date){ // проверка на даты 
      room.datesOrders.forEach(({departureDate,arrivalDate}) => {
        if(comparingDate(date.arrivalDate,date.departureDate,arrivalDate,departureDate)){
          flag = true
        }
      })//проходим все забр даты
      if(flag){
        return
      }
    }
    flag = true
    sortArr.forEach(option => {
      if(!room[option]){
        flag = false
      }
    })
    if(flag 
      && room.guestsValue >= guestsValue
      && room.bed >= bed
      && room.bedRooms >= bedRooms
    ){
      newArr.push(room)
    }
  })
  return newArr
}
function countGuest({guests}){
  if(!guests){
    return 0
  }
  return guests.fieldStorage.reduce((acc,op) =>{
    return acc += op.count
  },0)
}
function countAvailability({availability},type){
  if(!availability){
    return 0
  }
  let count= 0
  availability.fieldStorage.forEach(room => {
    if(room.type == type){
      count = room.count
    }
  })
  return count
}
function comparingDate(arrDate,depDate,arr,dep){//если дата между труе
  if((time(arr) <= time(arrDate) && time(dep) >= time(depDate)) ||
    (time(arr) >= time(arrDate) && time(dep) <= time(depDate)) ||
    (time(arr) >= time(arrDate) && time(dep) >= time(depDate))
    )
    {
      return true
    }
      return false
    
}
