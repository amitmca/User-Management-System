import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private users: User[];
  
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers(){
    this.userService.getAllUser()
    .subscribe(
      users => {this.users = users;},
      err => {console.log(err);}
    );
  }

  redirectNewUserPage(){
    this.router.navigate(['/user/create']);
  }

  editUserPage(user: User) {
    if(user) {
      this.router.navigate(['/user/edit', user.id]);
    }
  }

  deleteUser(user: User){
    if(user) {
      console.log(user.id);
      this.userService.deleteUser(user.id).subscribe(
        res => {
          this.getAllUsers();
          this.router.navigate(['/user']);
          console.log('done');
        }
      )
    }
  }

}
