import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router , ActivatedRoute , Params } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  /*** ARRAY HOLD USERS ***/
  usersList:Array<object>;
  usersListWithOutAdmin:Array<object>;
   /*** ARRAY HOLD ANO OBJECT OF ADMIN LOGGING DATA  [only email & password]*****/
  adminLogedData:Array<object>;
  /*** ADMIN ACTUAL DATA ***/
  adminStoredData:object;
  adminLogedIndex:number;
  constructor(
      private http: HttpClient,
      private r:Router,
      private activatedRoute: ActivatedRoute,
      private users : UsersService

  ) {

  }
  ngOnInit() {
 this.displayData();

  }



  displayData(){
  /*** GET LOGGED ADMIN`S DATA ***/
   this.users.getUsers('http://localhost:3000/users').subscribe(res=>{
        this.usersList = res;
        // console.log(res);
       if(!res){
       console.log("error");
      }
    else{
      /*** GET ADMIN`S DATA ***/
      this.users.getAdmin('http://localhost:3000/adminlogins').subscribe(res=>{
        if(!res){
          console.log("erroe");
        }
        else{
          /*** ARRAY OF NOE OBJECT HOLD EMAIL AND PASSWORD ***/
          this.adminLogedData=res;
          console.log(this.adminLogedData);

         /*** findIndex(ES6 method) finds index of element in Array
         with specific property ... indexOf gives -1 (does not work with objects) ***/
         this.adminLogedIndex= this.usersList.findIndex(x => x.email == this.adminLogedData[0]["email"]);
         this.adminStoredData=this.usersList[this.adminLogedIndex];
         // console.log(this.adminLogedIndex);


         /*** DELETING LOGGED ADMIN FROM USERS LIST ***/
         this.usersListWithOutAdmin = this.usersList.filter(item => item != this.adminStoredData);
         console.log(this.usersListWithOutAdmin);
         console.log(this.usersList);
         // console.log(this.adminStoredData);

        }
               });
   }

          });
}

}
