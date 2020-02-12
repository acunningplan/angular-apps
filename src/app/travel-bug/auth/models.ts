export class User {
  displayName = "";
  imageUrl = "";

  constructor(
    // public email: string,
    // public id: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    private _username: string,
    displayName: string,
    imageUrl: string
  ) {
    this.displayName = displayName;
    this.imageUrl = imageUrl;
  }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  get username() {
    return this._username;
  }
}

export interface IUserData {
  // email: string;
  // id: string;
  _token: string;
  _tokenExpirationDate: Date;
  _username: string;
  displayName: string;
  imageUrl: string;
}

export interface AuthResponseData {
  token: string;
  username: string;
  displayName: string;
  // email: string;
  // refreshToken: string;
  expiresIn: string;
  image: string | null;
  // localId: string;
  // registered?: boolean;
}
