import { Page } from '../core/Page'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { SingIn } from '../components/singIn/SingIn'
import { SingInMain } from '../components/singIn/SingInMain'

export class SingInPage extends Page {
    constructor(){
        super()
        this.singIn
    }
    getRoot(){

        this.singIn = new SingIn({
            components:[Header,SingInMain,Footer]
        })
        return this.singIn.getRoot()
    }
    afterRender(){
        this.singIn.init()
    }
    destroy(){
        this.singIn.destroy()
    }
}