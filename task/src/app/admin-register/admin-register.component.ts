import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent implements OnInit {
  admin:object={
    email:"",
    password:""
  };
  isLogged:string="notLogged";
  usersList:Array<object>;

  /*** ADMIN FOUND IN USERSLIST ***/
  isAdmin:boolean=false;

  constructor(
      private r:Router,
      private http: HttpClient,
      private users : UsersService
) {

     /*** AT THE BEGGING BE SURE THE ADMINLOGINS COLLECTION HAS NO ADMINS LOGGED IN ***/
     /*** IT CAN BE DONE BY AUTHGAURD ...[ ADVANCED SOLUTION ] ***/
     this.users.deletAdmin('http://localhost:3000/adminlogins').subscribe(res=>{
           console.log(res);
                   }
                     );
}

  ngOnInit() {

  }

  /**** CHECK FOR ADMIN EXISTANCE  ****/
  check(data:ngForm){
    // this.isLogged=true;
        this.isAdmin=false;
        console.log(data);
        if(data){
        console.log("valid");

        /*** GET ALL USERS ***/
        this.users.getUsers('http://localhost:3000/users').subscribe(res=>{
            this.usersList = res;
            console.log(this.usersList);

            for(var i=0 ; i<this.usersList.length;i++)
            {
              // console.log(this.usersList[i]);

                /*** CHECKING FOR ADMIN EXISTANCE ***/
                if(this.usersList[i].email == this.admin.email &&
                    this.usersList[i].password == this.admin.password &&
                    this.usersList[i].role == "admin"
                 )
                {
                  this.isAdmin=true;
                  this.admin=this.usersList[i];
                  console.log(this.admin.email,this.admin.password,this.admin.role);
                  console.log(this.admin);

                  /*** SAVE ADMIN`S DATA IN DB  *****/
                  this.users.postAdmin('http://localhost:3000/adminlogins',this.admin).subscribe(res=>{
                        if(!res){
                          console.log("can not add admin");
                        }
                        else{
                          this.r.navigate(['/panel']);
                        }
                           });
                }
            }
            if(!this.isAdmin){
              alert(" you are not an admin .. admins only can be entered");
            }
    });
    }
}
}
