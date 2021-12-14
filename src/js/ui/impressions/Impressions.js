import { Component } from "../../core/Component";
import { $ } from "../../core/dom";
import { createH3, declOfNum } from "../../core/utils";
import { colors } from "./colors";
export class Impressions extends Component{
    static className = 'impressions'
    static rootTag = 'div'
    constructor($root,options = {}){
        super(
            $root,
            {...options}
        )
        this.impressions = options.impressions || []
        this.colors = colors
    }
    render(){
        const $impressionsWrapper = $.create('div','impressions__wrapper')
        const $impressionsDiagram = $.create('div',['impressions__diagram','flex'])

        const $svg = $(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
        $svg
            .addClass('diagram')
            .attr('viewBox','0 0 42 42')
        
        $impressionsDiagram
            .append(createDiagram(this.impressions,this.colors))
            .append(createUl())
        
        $impressionsWrapper
            .append(createH3('Впечатления от номера',['subtitle-big']))
            .append($impressionsDiagram)
        return $impressionsWrapper
    
    }
}
function createDiagram(impressions = {},colors){
    let prevPosition = 0
    const counter = Object.values(impressions)
        .reduce((acc,rate) => acc +=rate)
    
    const $svg = $(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
    $svg
        .addClass('diagram')
        .attr('viewBox','0 0 42 42')
    if(counter <= 0){
        $svg //серая заглушка когда голосов нету
            .append(createCircle('#d2d3d4'))
            .append(createTextGroup('нету','голосов','diagram__notvote'))
    }else{
        Object.keys(impressions).forEach(key => {
            const percent =  Math.round(impressions[key]/counter * 100)
            const dataColors = findColor(key,colors)
            $svg
                .append(createLinearGradient(dataColors))
                .append(createCircle(
                   `url(#${dataColors.gradientId})`,
                    parceDasharry(percent),
                    prevPosition
                ))
                .append(createTextGroup(declOfNum(
                    counter,['голос','голоса','голосов']),
                    counter
                ))
            prevPosition = calculationPosition(percent,prevPosition)
        })
    }
   
    
    

    return $svg
}
function findColor(rate,colors){
    const color = colors.find(color => color.rate == rate)
    return color
}
function parceDasharry(val){
    const remainder = 100 - val
    return `${val} ${remainder}`
}
function calculationPosition(percent = 0,prevPosition = 0){
    return 100 - percent + prevPosition
}
function createLinearGradient({startColor,finishColor,gradientId},rotate  = '0'){
    const $gradient = $(document.createElementNS("http://www.w3.org/2000/svg", "linearGradient"))
    const $startStop = createStop('5%',startColor)
    const $finishStop = createStop('95%',finishColor)

    $gradient
        .attr('id',gradientId)
        .attr('gradientTransform',`rotate(${rotate})`)
    
    $gradient
        .append($startStop)
        .append($finishStop)
    return $gradient
}
function createStop(offset,color){
    const $stop = $(document.createElementNS("http://www.w3.org/2000/svg", "stop"))
    $stop
        .attr('offset',offset)
        .attr('stop-color',color)
    return $stop
}
function createCircle(color,interest,position){
    const $circle = $(document.createElementNS("http://www.w3.org/2000/svg", "circle"))
    $circle
        .attr('cx',21)
        .attr('cy',21)
        .attr('r',15.91549430918954)
        .attr('fill','transparent')
        .attr('stroke-width',3)
    $circle
        .attr('stroke-dasharray',interest)
    $circle
        .attr('stroke-dashoffset',position)
    $circle
        .attr('stroke',color)
    
    return $circle
}
function createTextGroup(title,value,noVoteCls){
    const $g = $(document.createElementNS("http://www.w3.org/2000/svg",'g'))
    const $title = createText(title,['diagram__title',noVoteCls])
    const $value = createText(value,['diagram__value',noVoteCls])
    $g
        .append($title)
        .append($value)

    return $g
}
function createText(text,cls){
    const $text = $(document.createElementNS("http://www.w3.org/2000/svg",'text'))
    $text
        .attr('x','50%')
        .attr('y','50%')
    $text.addClass(['diagram__text',...cls])
    $text.text(text)
    return $text
}

function createUl(){
    const $ul = $.create('ul','impressions__appraisals')
        $ul
            .append(createLi('impressions__great','Великолепно'))
            .append(createLi('impressions__well','Хорошо'))
            .append(createLi('impressions__satisfactory','Удовлетворительно'))
            .append(createLi('impressions__disappointment','Разочарован'))
            .append(createLi('impressions__disgusting','Отвратительно'))
        return $ul
}
function createLi(cls,text,interest ){
    const $li = $.create('li',['grey-text','mark-li',cls])
    $li.text(text)
    return $li
}