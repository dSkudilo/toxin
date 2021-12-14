
import { Component } from "../core/Component"
import { $ } from "../core/dom"
export class DoubleRange extends Component{
    static className = 'double-range'
    static rootTag = 'div'
    
    constructor($root,options){
        super($root,{
            name:'double-range',
            listeners:['mousedown'],
            ...options
        })
        this.$root = $root
        this.$scale = '',
        this.$bar,
        this.$maxBtn,
        this.$minBtn
        this.minValue = 0
        this.maxValue = 100000
    }
    render(){
       const $rangeControl = $.create('div','range-control')
        this.$scale = $.create('div','range-scale')
        this.$scale.data.type = 'scale'
        this.$bar = $.create('div','range-bar')
        this.$bar.data.type = 'bar'

        this.$minBtn = $.create('div',['range-toggle', 'range-toggle__min'])
        this.$minBtn.data.value = 'min'
    
        this.$maxBtn = $.create('div',['range-toggle', 'range-toggle__max'])
        this.$maxBtn.data.value = 'max'

        this.$scale
            .append(this.$bar)
            .append(this.$minBtn)
            .append(this.$maxBtn)
        $rangeControl.append(this.$scale)
        return $rangeControl
    }
    onMousedown(event){
        this.changeValue(event)
    }
    changeValue(event){
        const $target = $(event.target)
        if(!$target.data.value){
            return
        }
        const prevPosition = event.pageX
        const prevPositionToggle =  $target.offset('left')
        const max = this.$scale.offset('width')
        document.onmousemove = e => {
            const nextPosition = e.pageX
            const delta = nextPosition - prevPosition
            let value = prevPositionToggle + delta 
            let minCoords = this.$minBtn.offset('left')
            let maxCoords = this.$maxBtn.offset('left')
            if(($target.data.value === 'min') && (value > maxCoords - $target.offset('width')/2)){
                value = maxCoords - $target.offset('width')/2
            }else if(($target.data.value === 'max') && (value < minCoords + $target.offset('width')/2)){
                value = minCoords + $target.offset('width')/2
            }
            if(value <= 0){
                value = 0 
            }else if(value > max){
                value = max
            }
            $target.css({'left':value +'px'})
            this.$bar.css({'width' : maxCoords - minCoords + 'px'})
            this.$bar.css({'left': minCoords + 'px'})
            console.log(minCoords,maxCoords)
        }
        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
        }
    }
}

