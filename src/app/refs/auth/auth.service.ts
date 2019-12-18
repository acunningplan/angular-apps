import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          environment.firebaseAPIKey,
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
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          environment.firebaseAPIKey,
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
      // this.user.next(loadedUser);
      const { email, id, token } = loadedUser;
      this.store.dispatch(
        new AuthActions.AuthenticateSuccess({
          email,
          userId: id,
          token,
          expirationDate: new Date(userData._tokenExpirationDate)
        })
      );
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.setLogoutTimer(expirationDuration);
    }
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    // this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      // this.logout();
      this.store.dispatch(new AuthActions.Logout())
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
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

  private handleAuth = tap(({ email, userId, token, expiresIn }) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    // this.user.next(user);
    this.store.dispatch(
      new AuthActions.AuthenticateSuccess({ email, userId, token, expirationDate })
    );
    this.setLogoutTimer(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  });
}
