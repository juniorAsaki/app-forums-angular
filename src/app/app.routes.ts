import { Routes } from '@angular/router';
import {HeaderComponent} from './presentation/header/header.component';
import {ForumComponent} from './presentation/forum/forum.component';
import {MessageComponent} from './presentation/message/message.component';
import {SujectComponent} from './presentation/suject/suject.component';
import {LoginComponent} from './presentation/login/login.component';
import {HomeComponent} from './presentation/home/home.component';
import {ListSujetsComponent} from './presentation/list-sujets/list-sujets.component';
import {ListMessagesComponent} from './presentation/list-messages/list-messages.component';

export const routes: Routes = [
  {path: "login" , component: LoginComponent},
  {path: "base" , component: HeaderComponent , children: [
      {path: "home" , component: HomeComponent},
      {path: "forums" , component: ForumComponent},
      {path: "message" , component: MessageComponent},
      {path: "sujet" , component: SujectComponent},
      {path: "list-sujet/:id" , component: ListSujetsComponent},
      {path: "list-message/:id" , component: ListMessagesComponent}
    ]},
  {path: "" , redirectTo: "login" , pathMatch: "full"}
];
