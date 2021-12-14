import { Page } from '../core/Page'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Room } from '../components/room/Room'
import { RoomMain } from '../components/room/RoomMain'
export class RoomPage extends Page{
    constructor(){
        super()
        this.landing
    }
    getRoot(){
        this.landing = new Room({
            components:[Header,RoomMain,Footer]
        })

        return  this.landing.getRoot()
    }
    afterRender(){
        this.landing.init()
    }
    destroy(){
        this.landing.destroy()
    }
}