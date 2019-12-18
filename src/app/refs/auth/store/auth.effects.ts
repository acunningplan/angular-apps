import { Actions, ofType, Effect } from "@ngrx/effects";

import * as AuthActions from "./auth.actions";
import { switchMap, catchError, map, tap } from "rxjs/operators";
// import { AuthResponseData } from "../auth.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../user.model";
import { AuthService } from "../auth.service";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

const handleAuthentication = resData => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  const { email, localId, idToken } = resData;
  const user = new User(email, localId, idToken, expirationDate);
  localStorage.setItem("userData", JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email,
    userId: localId,
    token: idToken,
    expirationDate,
    redirect: true
  });
};

const handleError = error => {
  let errorMsg = "An unknown error occurred.";
  if (!error.error || !error.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMsg));
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
  return of(new AuthActions.AuthenticateFail(errorMsg));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      const { email, password } = signupAction.payload;
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
        .pipe(
          tap(resData =>
            this.authService.setLogoutTimer(+resData.expiresIn * 1000)
          ),
          map(handleAuthentication),
          catchError(handleError)
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      const { email, password } = authData.payload;
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
        .pipe(
          tap(resData =>
            this.authService.setLogoutTimer(+resData.expiresIn * 1000)
          ),
          map(handleAuthentication),
          catchError(handleError)
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(["/"]);
      }
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem("userData"));
      if (!userData) {
        return { type: "DUMMY" };
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
        return new AuthActions.AuthenticateSuccess({
          email,
          userId: id,
          token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false
        });
        // const expirationDuration =
        //   new Date(userData._tokenExpirationDate).getTime() -
        //   new Date().getTime();
        // this.autoLogout(expirationDuration);
      }
      return { type: "DUMMY" };
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem("userData");
      this.router.navigate(["/auth"]);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
