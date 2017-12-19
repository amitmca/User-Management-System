import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private apiUrl = "http://localhost:8080/login/api/user/";
  
  constructor(private http: Http) {}

  //get all user list
  public getAllUser(): Observable<User[]>{
    return this.http.get(this.apiUrl + "all")
    .map(this.extractData)
		.catch(this.handleError);
  }

  //public void saveUser(User user);
	//public List<User> getAllUser();
  //public void deleteUser(User user);
  //public User findByEmail(String email);
  //public void updateUser(User user);
  //public User findById(long userId);
  //public boolean isValidUser(String username, String password);

  findById(id: number): Observable<User>{
    return this.http.get(this.apiUrl + id)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Error'));
  }

  //create : fully working
  saveUser(user: User): Observable<User>{
    return this.http.post(this.apiUrl + "create", user)
    .map(success => success.status)
    .catch(this.handleError);
  }

  //update : fullly working
  updateUser(user: User): Observable<User>{
    return this.http.put(this.apiUrl + "update", user)
    .map(success => success.status)
    .catch(this.handleError);
  }

  //delete : fully working
  deleteUser(id: number): Observable<boolean>{
    return this.http.delete(this.apiUrl + "delete" + "/" +id)
    .map(success => success.status)
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

  private extractData(res: Response) {
    let body = res.json();
      return body;
  }

}
