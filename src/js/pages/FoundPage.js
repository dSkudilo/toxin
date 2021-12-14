import { Page } from '../core/Page';
import { Found } from '../components/found/Found';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FoundMain } from '../components/found/FoundMain';
import { createStore } from '../core/createStore';
import { rootReducer } from '../redux/rootReducer';
import { storage } from '../core/utils';

export class FoundPage extends Page{ 
    constructor(){
        super()
        this.found 
    }
    getRoot(){ 
      
        const store = createStore(rootReducer,storage('toxin-app'))
        store.subscribe(state => {
            storage('toxin-app', state)
        })
        this.found = new Found({
            components:[Header,FoundMain,Footer],
            store
        })

        return this.found.getRoot()
    }
    afterRender(){
       
        this.found.init()
    }
    destroy(){
        this.found.destroy()
    }
}