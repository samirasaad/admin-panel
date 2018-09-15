import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

/**** INSTANCE OF A COMPONENT TO LISTEN TO CHANGES IN REAL TIME
      WE ALSO CAN MAKE IT WITH COMMON SERVICE AND EVENT EMITTER ***/
import { PanelComponent } from '../panel/panel.component'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  newUser:object;
  usersList:Array<any>;
  emailFound:boolean=false;
  notValidData:boolean=false;
  validEmail:boolean=false;
  constructor(
    private http : HttpClient,
    private r:Router,
    private location: Location,
    private Panelcomp: PanelComponent,
    private users : UsersService

  ) {
    this.newUser={
      name:"",
      phone:"",
      Country:"",
      email:"",
      password:"",
      role:""
    };
  }

  /*** ON CANCEL REDIRECT TO PEVIOUS VEIW ***/
  cancel() {
      this.location.back();
      // this.r.navigate['/panel/user-details']
    }

 /*** ADDING USER ***/
 addUser(data:ngForm){
    this.emailFound=false;

    /*** ALL FIELDS ARE REQUIRED ***/
    if(data){
         /*** GET ALL USERS ***/
         this.users.getUsers('http://localhost:3000/users').subscribe(res=>{
           console.log(res);
           this.usersList=res;

        /****** CHECK IF ANY USER HAS THE SAME EMAIL .. EMAIL ALREADY EXIST *****/
           for(var i=0 ; i<this.usersList.length;i++)
           {
               if(this.usersList[i]["email"] == this.newUser["email"]){
                 this.emailFound=true;
                  alert("the email is already taken");
                  // this.r.navigate(['panel/user-form']);
                  console.log(this.emailFound);
               }
           }
           if(!this.emailFound){

               /*** REQUEST TO SEND NEW USER`S DATA TO DB ***/
              this.users.postUsers('http://localhost:3000/users',this.newUser).subscribe(res=>{
                     console.log(res);
                     if(res){
                        this.Panelcomp.displayData();
                     }
                     this.r.navigate(['panel']);
                   }
                 );
               alert("user has been added");
               console.log(this.emailFound);
      }
      });
    }
}
  ngOnInit() {
  }
}
