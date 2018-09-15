import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http:HttpClient) { }

  /************* USER ACTIONS *****************/
  getUsers(usersPath:string) : Observable<any>{
    return this.http.get(usersPath);
  }

  postUsers(usersPath:string,user:object) : Observable<any>{
    return this.http.post(usersPath,user);
  }

  deleteUsers(usersPath:string,id:string) : Observable<any>{
    return this.http.delete(usersPath,id);
  }

  updateUsers(usersPath:string,user:object) : Observable<any>{
    return this.http.put(usersPath,user);
  }


  /************** Admin ACTIONS ***************/
  getAdmin(adminPath:string) : Observable<any>{
    return this.http.get(adminPath);
  }

  postAdmin(adminPath:string,admin:object) : Observable<any>{
    return this.http.post(adminPath,admin);
  }

  deletAdmin(adminPath:string) : Observable<any>{
    return this.http.delete(adminPath);
  }
}
