import { User } from './../user';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit, OnDestroy {

  id: number;
  user: User;

  userForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      password: new FormControl('', Validators.required),
      mobileNo: new FormControl('', Validators.required)
    });



    if (this.id) { //edit form
      this.userService.findById(this.id).subscribe(
        user => {
          this.id = user.id;
          this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobileNo: user.mobileNo,
            password: user.password
          });
        },error => {
          console.log(error);
        }
      );

    }

  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.id) {
        let user: User = new User(this.id,
          this.userForm.controls['firstName'].value,
          this.userForm.controls['lastName'].value,
          this.userForm.controls['email'].value,
          this.userForm.controls['password'].value,
          this.userForm.controls['mobileNo'].value)
          this.userService.updateUser(user).subscribe(
            res => {
              this.userService.getAllUser();
              this.router.navigate(['/user']);
              console.log("done");
            }
        );
      } else {
        let user: User = new User(null,
          this.userForm.controls['firstName'].value,
          this.userForm.controls['lastName'].value,
          this.userForm.controls['email'].value,
          this.userForm.controls['password'].value,
          this.userForm.controls['mobileNo'].value)
          this.userService.saveUser(user).subscribe(
            res => {
              this.userService.getAllUser();
              this.router.navigate(['/user']);
              console.log("done");
            }
          );

      }

      this.userForm.reset();
      //this.router.navigate(['/user']);

    }
  }

  redirectUserPage() {
    this.router.navigate(['/user']);

  }

}
