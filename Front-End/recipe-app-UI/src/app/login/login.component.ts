import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { AppComponent } from '../app.component';
import { RecipeHttp } from '../recipeHttp';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // username: string = '';
  // password: string = '';
  message: String = '';
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
  });
  isRegister: Boolean = false;
  isSubmitDisable: Boolean = true;
  public userDetails: any;
  appComponent: typeof AppComponent;

  constructor(
    private recipeHttp: RecipeHttp,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.appComponent = AppComponent;
  }

  ngOnInit(): void {
    //does nothing on initialization
    if(this.sessionService.getIsLogIn()){
      this.router.navigateByUrl('home');
    }
  }

  processLoginOrRegister(){
    if(this.isRegister){
      this.register();
    }else{
      this.login();
    }
  }
  login() {
    this.message = '';
    if (this.form.controls["username"].value.trim() !== '' && this.form.controls["password"].value.trim() !== '') {
      this.recipeHttp
        .authenticateUser(this.form.controls["username"].value.trim(), this.form.controls["password"].value.trim())
        .subscribe({
          next: (userDetails: any) => {
            console.log(userDetails);
            this.userDetails = userDetails;
            if (
              userDetails.hasOwnProperty('status') &&
              userDetails.status == 'failure'
            ) {
              this.message = 'Credentials not matched';
            } else {
              this.sessionService.logIn(
                userDetails.username,
                userDetails.user_id
              );
              this.router.navigateByUrl('home');
            }
          },
        });
    }
  }
  register() {
    this.message = '';
    if (this.form.controls["username"].value.trim() !== '' && this.form.controls["email"].value.trim() !== '' && this.form.controls["password"].value.trim() !== '') {
      this.recipeHttp
        .registerUser(this.form.controls["username"].value.trim(), this.form.controls["email"].value.trim(), this.form.controls["password"].value.trim())
        .subscribe({
          next: (userDetails: any) => {
            if (
              userDetails.hasOwnProperty('status') &&
              userDetails.status == 'failure'
            ) {
              this.message = 'Email or UserName Already Exists';
            } else {
              alert("User Registered! Kindly Login Now");
              this.changeToLogin();
            }
          },
        });
    }
  }
  changeToRegister(){
    this.isRegister = true;
  }
  changeToLogin(){
    this.isRegister = false;
  }

  checkForm(): any{
    if (this.form.controls["username"].value.trim() !== '' && this.form.controls["password"].value.trim() !== '' && (!this.isRegister || (this.isRegister && this.form.controls["email"].value.trim() !== ''))) {
      return null;
    }
    return true;
  }
}
