import { Component } from "../../core/Component"
import { $ } from "../../core/dom"
import { ActiveRoute } from "../../core/route/ActiveRoute"
import * as data from '../../../../db.json'
import { createH3, createH4 } from "../../core/utils"
import { intelligence } from './roomIntelligence'
import { Impressions } from "../../ui/impressions/Impressions"
import { Comments } from "../../ui/Comments"

export class RoomMain extends Component{
    static className = 'room'
    static rootTag = 'main'
    constructor($root, options){
        super($root,{
            name:'RoomMain',
            ...options
        })
        this.roomId = ActiveRoute.param
        this.room = findRoom(data.rooms, this.roomId)
        this.roomImg = this.room.images
        this.roomImpressions = this.room.impressions
        this.intelligence = intelligence

        this.comments = findComments(data.comments,this.roomId) || []
        this.users = data.users
    }
    render(){
        if(!this.room){
            return createNotFound(this.roomId)
        }
        const $roomDetails = $.create('div',[
            'room__detalis',
            'container',
            'flex',
            'sb'
        ])

        

        const $roomMain = $.create('div','room__main')
        $roomMain
            .append(this.createRoomInfo())
            .append(this.createRoomFeedback())


        $roomDetails
            .append($roomMain)
        
        const $roomWrapper = $.create('div','room__wrapper')
        $roomWrapper
            .append(createGreetingImg(this.roomImg))
            .append($roomDetails)
        return $roomWrapper
    }

    createRoomInfo(){
        const $impressions = $.create(Impressions.rootTag,Impressions.className)
        const impressions = new Impressions($impressions,{
            impressions:this.roomImpressions
        })
        $impressions.append(impressions.render())
        
        const $roomInfo = $.create('div',['room__info','flex','sb'])
        const $roomAbout = $.create('div','room__about')
       
        $roomAbout
            .append(createH3('Сведения о номере',['subtitle-big']))
            .append(createRoomList(this.intelligence))
        $roomInfo
            .append($roomAbout)
            .append($impressions)
        return $roomInfo
    }
    createRoomFeedback(){
        const $roomFeedback = $.create('div','room__feedback')

        if(this.comments.length > 0){
            const $roomComments = $.create(Comments.rootTag,Comments.className)
            const comments = new Comments($roomComments,{
                comments: this.comments,
                users:this.users
            })
            $roomComments.append(comments.render())

            
            const $counter = $.create('span','grey-small')
            $counter.text(this.comments.length + ' Отзыва')//counter comment

            const $roomFeedbackFlex = $.create('div',['flex','sb','ac'])

            $roomFeedbackFlex
                .append(createH3('Отзывы посетителей номера',['subtitle-big']))
                .append($counter)

            $roomFeedback
                .append($roomFeedbackFlex)
                .append($roomComments)
            
        }else{
            $roomFeedback.append(createH3('Никто не оставил отзыва об этом номере :(',['subtitle-big']))
        }
        return $roomFeedback
    }
}

function findComments(arr,id){

    return arr.reduce((acc,a) => {
        if(a.roomId == id){
            acc.push(a)
        }
        return acc
    },[])
}

function createRoomList(intelligence = []){
    const $ul = $.create('ul','room__intelligence')
    intelligence.forEach(int => $ul.append(createLi(int)))
    return $ul
}
function createLi({title,text,img,alt}){
    const $li = $.create('li',['room__information','flex','ac'])
    
    const $img = $.create('img')
    $img.attr('src',img)
    $img.attr('alt',alt)
    
    const $ml10 = $.create('div','ml10')
    
    const $strong = $.create('strong')
    $strong.text(title)
    const $h4 = createH4('')
    $h4.append($strong)

    const $p = $.create('p','grey-text')
    $p.text(text)

    $ml10
        .append($h4)
        .append($p)
    
    $li
        .append($img)
        .append($ml10)
    return $li
        
}






function createGreetingImg(img){
    switch(img.length){
        case 0:
            return 'Ты идиот ?'
        case 1:
            return creaetOneGreetingImg(img)
        case 2: 
        console.log(img)
            return creaetTwoGreetingImg(img)
        default:
            return creaetThreeGreetingImg(img)
    }
    
}
function creaetOneGreetingImg(img){
    const $imgs = $.create('div',['room__imgs','flex','jc'])
    $imgs.append(createImgBlock(img,'room__whole'))
    return $imgs
}
function creaetTwoGreetingImg(img){
    const $imgs = $.create('div',['room__imgs','flex','jc'])
    $imgs
        .append(createImgBlock(img[0],'room__half'))
        .append(createImgBlock(img[1],'room__half'))
    return $imgs
}
function creaetThreeGreetingImg(img){
    const $imgs = $.create('div',['room__imgs','flex','jc'])
    const $less = $.create('div','room__less')
    $less
        .append(createAdditionalImg(img[1]))
        .append(createAdditionalImg(img[2]))
    $imgs
        .append(createImgBlock(img[0],'room__bigger'))
        .append($less)
    
    return $imgs
} 
function createNotFound(id){
    const $notFound = $.create('div','not-found')
    const $notFoundContent = $.create('div','not-found__content')
    $notFoundContent.text(`Номер, либо комната не найдена`)
    $notFound.append($notFoundContent)
    return $notFound
}

function createImgBlock(img,cls){
    const $bigger = $.create('div',cls)
    const $img = createImg(
        'room__big',
        img,
        'room'
    )
    $bigger.append($img)
    return $bigger
}
function createAdditionalImg(img){
    const $additional = createImg(
        'room__small',
        img,
        'room'
    )
    return $additional
}
function createImg(cl,img,alt){
    const $img = $.create('img',cl)
    $img.attr('src','./src/assets/img/room/' + img)
    $img.attr('alt',alt)
    return $img
}
function findRoom(arr,roomId){
    const room = arr.find(room => room.id == roomId)
    if(room == undefined){
        return false
    }
    return room
}