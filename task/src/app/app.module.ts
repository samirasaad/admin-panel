//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule ,  Routes } from '@angular/router';
import { HttpClientModule , HttpClient } from '@angular/common/http';
import { observable} from 'rxjs';
import { FormsModule }   from '@angular/forms';

//components
import { AppComponent } from './app.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PanelComponent } from './panel/panel.component';
import { UserFormComponent } from './user-form/user-form.component';

//services

import { UsersService } from './users.service';
const routes:Routes=[
  {
    path:"",
    component:AdminRegisterComponent
  },

  {
    path: "panel",
    component:PanelComponent,
        children: [
          {
            path: 'user-details',
            component: UserDetailsComponent
          },
          {
            path: 'user-details/:id',
            component: UserDetailsComponent
          },
          {
            path: 'user-form',
            component: UserFormComponent
          }

        ]
  }

];

@NgModule({
  declarations: [
    AppComponent,
    AdminRegisterComponent,
    HeaderComponent,
    FooterComponent,
    UserDetailsComponent,
    PanelComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
