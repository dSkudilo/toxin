import { Page } from '../core/Page'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Landing } from '../components/landing/Landing'
import { LandingMain } from '../components/landing/LandingMain'
export class LandingPage extends Page{
    constructor(){
        super()
        this.landing
    }
    getRoot(){
        this.landing = new Landing({
            components:[Header,LandingMain,Footer]
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