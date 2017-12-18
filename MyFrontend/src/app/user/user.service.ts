import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private apiUrl = "http://localhost:8080/login/api/user/";
  
  constructor(private http: Http) {}

  public getAllUser(): Observable<User[]>{
    return this.http.get(this.apiUrl + "all")
    .map((res: Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
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

  saveUser(user: User): Observable<User>{
    return this.http.post(this.apiUrl + "create", user)
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateUser(user: User): Observable<User>{
    return this.http.put(this.apiUrl + "update", user)
    .map((res: Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteUser(id: number): Observable<boolean>{
    return this.http.delete(this.apiUrl + "delete" + "/" +id)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }


}
