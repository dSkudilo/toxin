import { Page } from '../core/Page'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { SingUp } from '../components/singUp/SingUp'
import { SingUpMain } from '../components/singUp/SingUpMain'
export class SingUpPage extends Page{
    constructor(){
        super()
        this.singUp
    }
    getRoot(){
        this.singUp = new SingUp({
            components:[Header,SingUpMain,Footer]
        })
        return this.singUp.getRoot()
    }
    afterRender(){
        this.singUp.init()
    }
    destroy(){
        this.singUp.destroy()
    }
}