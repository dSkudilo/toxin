import { Component } from "../core/Component";
import { $ } from "../core/dom";
import { createH4 } from "../core/utils";

export class Comments extends Component{
    static className = 'comments'
    static rootTag = 'div'
    constructor($root,options = {}){
        super($root,{
            ...options
        })
        this.comments = options.comments || []
        this.users = options.users
    }
    render(){
        const $commentsList = $.create('ul','comments__list')
        this.comments.forEach(comment =>{
            const creator = findUser(
                this.users,
                comment.creatorId
            )
            $commentsList
                .append(this.createComment(
                    comment,
                    creator
                ))
        })
        return $commentsList
    }
    createComment(comment,creator){
        const $comment = $.create('li',['comments__comment','flex'])
        
        const $commentWho = $.create('div','comments__who')
        const $commentWhoAvatar = $.create('img','comments__avatar')
        $commentWhoAvatar.attr('src','./src/assets/img/room/'+creator.avatar)
        $commentWhoAvatar.attr('alt','avatar')

        const $commentMain = $.create('div',['comments__main','ml10'])
        
        const $commentNameStrong = $.create('strong')
        $commentNameStrong.text(creator.name)//имя
        const $commentName = createH4()
        $commentName.append($commentNameStrong)
        
        const $commentDate = $.create('p',['grey-text','mb10'])
        $commentDate.text(
            new Date(comment.date)
                .toLocaleDateString()
        )//дата
        
        const $commentText = $.create('p','grey-text')
        $commentText.text(comment.text)

        $commentMain
            .append($commentName)
            .append($commentDate)
            .append($commentText)

        $commentWho
            .append($commentWhoAvatar)
            .append(createLikeButton(comment.likeCounter))
        $comment
            .append($commentWho)
            .append($commentMain)
        return $comment
    }
}

function findUser(users,id){
    return users.find(user => user.id == id)
}

function createLikeButton(counter){
    const $formCheckbox = $.create('div',['form-checkbox','comments__like'])
    const $label = $.create('label')
    const $input = $.createInput('form-checkbox__real','like','checkbox')
    const $fakeCheckbox = $.create('span','btn-like')
    $fakeCheckbox.text(counter)//counter likes
    $label
        .append($input)
        .append($fakeCheckbox)
    $formCheckbox.append($label)
    return $formCheckbox
}