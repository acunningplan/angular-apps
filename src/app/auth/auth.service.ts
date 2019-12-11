import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment'

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(this.handleError, this.handleAuth);
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+ environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(this.handleError, this.handleAuth);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }

    const {
      email,
      id,
      _token: token,
      _tokenExpirationDate: tokenExp
    } = userData;
    const loadedUser = new User(email, id, token, new Date(tokenExp));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
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

  private handleError = catchError(error => {
    let errorMsg = "An unknown error occurred.";
    if (!error.error || !error.error.error) {
      return throwError(errorMsg);
    }
    switch (error.error.error.message) {
      case "EMAIL_EXISTS":
        errorMsg = "There is already an account registered with this email.";
        break;
      case "EMAIL_NOT_FOUND":
        errorMsg = "No account registered with this email.";
        break;
      case "INVALID_PASSWORD":
        errorMsg = "Entered account name and password do not match.";
        break;
    }
    return throwError(errorMsg);
  });

  private handleAuth = tap(({ email, localId, idToken, expiresIn }) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  });
}