import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  logIn(username: string, user_id: string) {
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('user_name', username);
  }

  logOut() {
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
  }

  getUserId(): any {
    return localStorage.getItem('user_id');
  }

  getUserName(): any {
    return localStorage.getItem('user_name');
  }

  getIsLogIn(): any {
    return localStorage.getItem('user_id') != null;
  }
}
