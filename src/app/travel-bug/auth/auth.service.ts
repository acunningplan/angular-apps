import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";

import { User, AuthResponseData, IUserData } from "./models";

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>("http://localhost:5000/api/user/login", {
        email: email,
        password: password
        // returnSecureToken: true
      })
      .pipe(
        catchError(() => throwError("An error occurred.")),
        tap(resData => {
          // const expirationDate = new Date(
          //   new Date().getTime() + +resData.expiresIn * 1000
          // );
          const user = new User(
            resData.token,
            new Date(new Date().getTime() + 1000000000),
            resData.username,
            resData.displayName,
            resData.image
          );
          this.user.next(user);
          // this.autoLogout(+resData.expiresIn * 1000);
          localStorage.setItem("userData", JSON.stringify(user));
        })
      );
  }

  signup(email: string, password: string) {
    return this.login(email, password);
  }

  getUserData() {
    
  }

  autoLogin() {
    const userData: IUserData = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      return;
    }

    if (userData._token) {
      const loadedUser = new User(
        userData._token,
        new Date(new Date().getTime() + 1000000000),
        userData._username,
        userData.displayName,
        userData.imageUrl
      );
      this.user.next(loadedUser);
      const expirationDuration = 1000000000;
      // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() -
      // new Date().getTime();

      // this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // private handleAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token, expirationDate);
  //   this.user.next(user);
  //   this.autoLogout(expiresIn * 1000);
  //   localStorage.setItem("userData", JSON.stringify(user));
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = "An unknown error occurred!";
  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(errorMessage);
  //   }
  //   switch (errorRes.error.error.message) {
  //     case "EMAIL_EXISTS":
  //       errorMessage = "This email exists already";
  //       break;
  //     case "EMAIL_NOT_FOUND":
  //       errorMessage = "This email does not exist.";
  //       break;
  //     case "INVALID_PASSWORD":
  //       errorMessage = "This password is not correct.";
  //       break;
  //   }
  //   return throwError(errorMessage);
  // }
}
