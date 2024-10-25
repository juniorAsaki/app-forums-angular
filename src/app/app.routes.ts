import { Routes } from '@angular/router';
import {HeaderComponent} from './presentation/header/header.component';
import {ForumComponent} from './presentation/forum/forum.component';
import {MessageComponent} from './presentation/message/message.component';
import {SujectComponent} from './presentation/suject/suject.component';

export const routes: Routes = [
  {path: "home" , component: HeaderComponent , children: [
      {path: "forums" , component: ForumComponent},
      {path: "message" , component: MessageComponent},
      {path: "sujet" , component: SujectComponent}
    ]},
  {path: "" , redirectTo: "home" , pathMatch: "full"}
];
