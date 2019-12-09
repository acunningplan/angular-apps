import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from "@angular/common/http";
import { Post } from "./post.model";
import { map, catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    this.http
      .post<{ name: string }>(
        "https://ng-wort.firebaseio.com/posts.json",
        postData,
        {
          observe: "response"
        }
      )
      .subscribe(
        res => {
          console.log(res);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        "https://ng-wort.firebaseio.com/posts.json",
        {
          headers: new HttpHeaders({
            "Custom-Header": "Hello"
          }),
          params: new HttpParams().set("print", "pretty")
        }
      )
      .pipe(
        map(res => {
          const posts: Post[] = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              posts.push({ ...res[key], id: key });
            }
          }
          return posts;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete("https://ng-wort.firebaseio.com/posts.json", {
        observe: "events",
        responseType: 'json'
      })
      .pipe(
        tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            //...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body)
          }
        })
      );
  }
}
