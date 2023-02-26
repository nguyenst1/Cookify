import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { AppComponent } from '../app.component';
import { RecipeHttp } from '../recipeHttp';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  message: string = '';
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
  }

  login() {
    this.message = '';
    if (this.username.trim() !== '' && this.password.trim() !== '') {
      this.recipeHttp
        .authenticateUser(this.username, this.password)
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
                userDetails.user_data.username,
                userDetails.user_data.id
              );
              this.router.navigate(['home']).then(() => {
                window.location.reload();
              });
            }
          },
        });
    }
  }
  cancel() {
    this.router.navigate(['home']).then(() => {
      window.location.reload();
    });
  }
}
