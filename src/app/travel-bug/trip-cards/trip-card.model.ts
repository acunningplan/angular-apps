export interface INewTripCard {
  date: Date;
  name: string;
  description: string;
  imageUrl: string;
}

export interface TripCard {
  // id: string;
  date: Date;
  name: string;
  description: string;
  imageUrl: string;
  // pointsOfInterest: any;
  // author: {
  //   appUserId: string;
  //   displayName: string;
  //   mainPhotoUrl: string;
  // };
  author: {
    appUserId: string;
    displayName: string;
    mainPhotoUrl: string;
  };
  [key: string]: any;
  // pointsOfInterests: string[];
  // user: string;

  // "id": "4b0c416b-4ba2-4c57-bafc-8361b2bd685b",
  //       "date": "2019-10-15T23:01:58.0636915",
  //       "name": "Bristol",
  //       "description": "Beautiful city!",
  //       "pointsOfInterest": [],
  //       "author": {
  //           "appUserId": "sam",
  //           "displayName": "Sam",
  //           "mainPhotoUrl": null
  //       }
}

export interface TripCardPreview {
  id: string;
  date: Date;
  name: string;
  description: string;
  image: string;
  author: {
    appUserId: string;
    displayName: string;
    mainPhotoUrl: string;
  };

  [key: string]: any;
}
