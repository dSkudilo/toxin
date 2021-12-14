

import { Router } from './js/core/route/Router';
import { SingUpPage } from './js/pages/SingUpPage';
import { SingInPage } from './js/pages/SingInPage'
import { FoundPage } from './js/pages/FoundPage';
import { LandingPage } from './js/pages/LandingPage';
import './style/index.scss';
import { RoomPage } from './js/pages/RoomPage';

new Router('#app',{
    found:FoundPage,
    room:RoomPage,
    landing:LandingPage,
    singUp:SingUpPage,
    singIn:SingInPage
})