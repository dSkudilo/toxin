import { $ } from '../../../core/dom'
import { dateParse, dateParseLoc, dayOfMonth, time } from '../../../core/utils'
import { Dropdown } from '../Dropdown'
import * as calendar from './calendar'
export class DropCalendar extends Dropdown{
    static className = 'calendar'
    static rootTag = 'div'
    constructor ($root,options = {}){
        super($root,{
                name:'DropCalendar',
                listeners:['click'],
                ...options
            },
        )
        this.$root = $root
        this.week = calendar.week
        this.months = calendar.months
        
        this.dayNumber = 1 //дни тек мес
        this.dayNumberNext = 1 //дни след мес

        this.arrivalDate //дата прибытия
        this.departureDate //дата выезда
        
        this.prevYear
        this.year = new Date().getFullYear()
        this.nextYear

        this.prevMonth  = getPrevMonth(this.month)
        this.month = new Date().getMonth()
        this.nextMonth = getNextMonth(this.month)
        

        this.prevDayCounter = dayOfMonth(this.year,this.month - 1)
        this.dayCounter = dayOfMonth()
        
        this.dayWeek = new Date(this.year,this.month,0).getDay()

        this.$cal
        this.btnContent 
        this.selectFlag = true
        
    }
    overridingVariables(){
        this.dayNumber = 1
        this.dayNumberNext = 1
        this.dayWeek = new Date(this.year,this.month,0).getDay()
        this.prevDayCounter = dayOfMonth(this.year,this.month - 1)
        this.dayCounter = dayOfMonth(this.year,this.month)
        this.nextMonth = getNextMonth(this.month)
        this.prevMonth  = getPrevMonth(this.month)
    }
    reDraw(){
        this.btnContent = dateParseLoc(this.arrivalDate) + ' - ' +dateParseLoc(this.departureDate)
        this.$btn.text(this.btnContent)
        dateParseLoc(this.arrivalDate)
        this.labelContent = 'хуй'
        this.$cal.clear()
        this.$cal.append(this.drawCal())
    }
    render(){
        this.$cal = $.create('div','cal')
        this.$cal.data.type = 'calendar'
        this.$cal.append(this.drawCal())
            
        const $dropdownControl = super.render()
        this.$drop.append(this.$cal)

        return $dropdownControl
    }
    drawCal(){
        this.overridingVariables()
        const $calWrap = $.create('div','cal__wrapper')
        const $calNav = $.create('ul',['cal__nav','flex','sb'])
        const $arrowL = $.create('i',['fas','fa-arrow-left'])
        const $arrowR = $.create('i',['fas','fa-arrow-right'])
        const $month = $.create('li','cal__month')
        $month.text(this.months[this.month] + ' ' + this.year)
        $calNav
            .append(createArrow($arrowL,'prevMonth'))
            .append($month)
            .append(createArrow($arrowR,'nextMonth'))
        
        const $table = $.create('table','cal__table')
        
        $table.append(createTh(this.week))

        for (let i = 0; i < (this.dayWeek + this.dayCounter)/7; i++) {
            const $tr = $.create('tr')
            if(i == 0){
                for (let i = 1; i <=  this.dayWeek ; i++) {
                    const dayNumber = this.prevDayCounter - this.dayWeek + i
                    const date = dateParse(dayNumber,this.prevMonth,this.prevYear || this.year)
                    const tdClass = getTdClass(this.arrivalDate,this.departureDate,date)
                    $tr.append(createTd(dayNumber,date,tdClass))
                }
                for (let index = this.dayWeek; index < this.week.length; index++) {
                    const date = dateParse(this.dayNumber,this.month,this.year)
                    const tdClass = getTdClass(this.arrivalDate,this.departureDate,date)
                    $tr.append(createTd(this.dayNumber,date,tdClass))
                    this.dayNumber ++
                }
            }else{
                for (let index = 0; index < this.week.length; index++) {
                    if(this.dayNumber <= this.dayCounter){
                        const date = dateParse(this.dayNumber,this.month,this.year)
                        const tdClass = getTdClass(this.arrivalDate,this.departureDate,date)
                        $tr.append(createTd(this.dayNumber,date,tdClass))
                        this.dayNumber ++
                    }else{
                        const date = dateParse(this.dayNumberNext,this.nextMonth,this.nextYear || this.year)
                        const tdClass = getTdClass(this.arrivalDate,this.departureDate,date)
                        $tr.append(createTd(this.dayNumberNext,date,tdClass))
                        this.dayNumberNext++
                    }
                }
            }
            $table.append($tr)
        }
        $calWrap.append($calNav).append($table)
        return $calWrap
    }
    selectDate($el){
        const when = $el.data.date
        if(!this.arrivalDate && !this.departureDate){
            this.arrivalDate = when
        }else if(this.arrivalDate && !this.departureDate){
            if(time(when) < time(this.arrivalDate)){
                this.departureDate = this.arrivalDate
                this.arrivalDate = when
            }else{
                this.departureDate = when
            }
        }else if(this.arrivalDate && this.departureDate){
            this.departureDate = null
            this.arrivalDate = when
        }
    }
    onClick(event){
        super.onClick(event)
        const $t = $(event.target)
        if($t.data.type){
            this.nextYear = null
            this.prevYear = null
        }
        
        if($t.data.type == 'nextMonth'){
            this.month++
            if(this.month == 11){
                this.nextYear = this.year + 1
            }else if(this.month > 11){
                this.prevYear = this.year
                this.month = 0
                this.year ++
            }
            this.reDraw()
        }else if($t.data.type == 'prevMonth'){
            this.month--
            if(this.month == 0){
                this.prevYear = this.year - 1
            }else if(this.month < 0){
                this.nextYear = this.year
                this.month = 11
                this.year --
            }
            this.reDraw()
        }else if($t.data.date){
            this.selectDate($t)
            this.reDraw()
        }
        this.$emit('calendar:select',{
            name:'date',
            btnContent:this.btnContent,
            arrivalDate:this.arrivalDate,
            departureDate:this.departureDate
        })
    }
}
function getTdClass(begin,end,date){
    const currentDate = time(new Date(date))
    if(time(begin) == currentDate && !end){
        return ['active']
    }else if(time(begin) < currentDate
    && currentDate < time(end)){
        return ['sub__active']
    }else if(time(begin) == currentDate){
        return ['active','first']
    }else if(time(end) == currentDate){
        return ['active','last']
    }else{
        return ''
    }
}
function createTd(dayNumber = '',date,cls){
    const $td = $.create('td')
    $td.data.date = date
    $td.text(dayNumber)
    $td.addClass(cls)
    return $td
}

function createTh(days){
    const $tr = $.create('tr')
        days.forEach(day => {
            const $th = $.create('th')
            $th.text(day)
            $tr.append($th)
        })
    return $tr
}
function createArrow(content,action){
    const $btn = $.create('li','cal__arrow')
    content.data.type = action
    $btn.append(content)
    return $btn
}
function getNextMonth(currentMonth){
    if(currentMonth >= 11){
        return 0
    }else{
        return currentMonth + 1
    }
}
function getPrevMonth(currentMonth){
    if(currentMonth <= 0){
        return 11
    }else{
        return currentMonth - 1
    }
}