import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router , ActivatedRoute , Params } from '@angular/router';
import { UsersService } from '../users.service';

/**** INSTANCE OF A COMPONENT TO LISTEN TO CHANGES IN REAL TIME
      WE ALSO CAN MAKE IT WITH COMMON SERVICE AND EVENT EMITTER ***/
import { PanelComponent } from '../panel/panel.component'


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  idParam;
  editFLag:boolean=false;
  isDeleted:boolean=false;
  selectedUserDetails:object;
  editedUserDetails:object;
  usersList:Array<any>;
  emailExist:boolean=false;
 constructor(
      private r:Router,
      private http: HttpClient,
      private activatedRoute: ActivatedRoute,
      private Panelcomp: PanelComponent,
      private users : UsersService

    ) {
        this.editedUserDetails={
          name:"",
          role:"",
          email:"",
          phone:"",
          country:"",
          password:""
        };
}
  ngOnInit() {
    this.getUserDetails();
    // console.log(this.editedUserDetails.country)
}

  /*** CANCEL DEITING ***/
  back(){
    this.editFLag= false;
  }

  /*** DISPLAY USER DETAILS IN A FORM TO EDIT VEIW***/
  edit(){
   this.editFLag= true;
  }

  /*** UPDATE USER`S DETAILS ***/
  saveChanges(data:ngForm){
      this.emailExist=false;
     // console.log(data);

    /*** ALL FIELDS ARE REQUIRED ***/
    if(data){
    console.log("valid")

      /*** CHECK IF EMAIL BELONG TO THE SAME USER  **/
        for(var i=0;i<this.usersList.length;i++)
             {
               if(this.usersList[i].email == this.editedUserDetails.email &&
                this.usersList[i]._id == this.idParam)
                {
                   console.log("the same user");
                   console.log(this.editedUserDetails);

                   this.users.updateUsers('http://localhost:3000/users/'+this.idParam,this.editedUserDetails).subscribe(
                      res=>{console.log(res)
                        if(res){
                          this.Panelcomp.displayData();
                        }
                    });
                  alert("user has been updated");
                  this.emailExist=true;
               }

      /*** CHECK IF EMAIL BELONG TO ANY OTHER USER  **/
       else if(this.usersList[i].email == this.editedUserDetails.email)
       {
           // console.log(this.editedUserDetails);
           console.log("another user");
           alert("the email is already taken");
           this.emailExist=true;
       }
            }

      /*** EMAIL DOES NOT EXIST BEFORE ***/
      if(!this.emailExist)
      {
        console.log("email not found before");
        console.log(this.editedUserDetails);
        this.users.updateUsers('http://localhost:3000/users/'+this.idParam,this.editedUserDetails).subscribe(res=>{
            console.log(res);
            if(res){
              alert("user has been updated");
              // console.log(this.editedUserDetails);
             this.Panelcomp.displayData();
            }
        }
            );
      }
      this.r.navigate(['panel']);
    }
  }


/*** DELETE USER ***/

  delete(){

     this.users.deleteUsers('http://localhost:3000/users/'+this.idParam).subscribe(res=>{
         console.log(res);
         if(res){
            this.Panelcomp.displayData();
         }
         this.r.navigate(['panel']);

     }
              );
    alert("user has been deleted")

  }

  /*** GET USER`S DETAILS   ***/
  getUserDetails(){

    /*** GET ALL USRES   ***/
    this.users.getUsers('http://localhost:3000/users').subscribe(res=>{
        this.usersList = res;
        // console.log(this.usersList);

      /**** LISTEN TO ANY CHANGES IN URL [id changes with changing of users selected] ****/
      this.activatedRoute.params.subscribe( params => {
          // console.log(params);

          /*** GET ID TERM FROM URL ****/
          this.idParam = this.activatedRoute.snapshot.params['id'],
          console.log(this.idParam);

              /*** SEARRCH FOR MATCHED USER ****/
              for(var i=0;i<this.usersList.length;i++)
                     {
                       if(this.usersList[i]._id == this.idParam){
                         console.log("user found");
                         this.selectedUserDetails=this.usersList[i];
                         console.log(this.selectedUserDetails);
                         // console.log(this.usersList[i].country)
                       }
                    }
          /*** ADMIN SHOULd  SEE THE ORIGINAL USER`S DATA SO CAN EDIT  ****/
          this.editedUserDetails={
            name:this.selectedUserDetails.name,
            email:this.selectedUserDetails.email,
            phone:this.selectedUserDetails.phone,
            country:this.selectedUserDetails.country,
            password:this.selectedUserDetails.password,
            role:this.selectedUserDetails.role
          }
        console.log(this.editedUserDetails.country);

        /*** EACH TIME URL CHANGE EDIT & DELETE SHOULD BE
            FALSE SO I CAN GO BACK TO USER`S DETAILS PAGE ***/
            this.editFLag=false;
            // console.log(this.editFLag);
            this.isDeleted=false;
            // console.log(this.isDeleted);
                          )}
              )};
      }
  }
