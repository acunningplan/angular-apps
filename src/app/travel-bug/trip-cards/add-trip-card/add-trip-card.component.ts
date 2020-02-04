import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { TripCard } from "../trip-card.model";

@Component({
  selector: "app-add-trip-card",
  templateUrl: "./add-trip-card.component.html",
  styleUrls: ["./add-trip-card.component.css"]
})
export class AddTripCardComponent implements OnInit {
  signupForm: FormGroup;
  name: AbstractControl;
  description: AbstractControl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      date: new FormControl(),
      name: new FormControl(),
      description: new FormControl(),
      hobbies: new FormArray([])
    });

    this.name = this.signupForm.get("name");
    this.description = this.signupForm.get("description");
  }

  onCreateTripCard(postData: { title: string; content: string }) {
    this.http.post<TripCard>("sample-url", postData).subscribe(res => {
      console.log(res);
    });
  }

  onFetchTripCards() {
    this.http
      .get<TripCard[]>("sample-url")
      .pipe(
        map((res: TripCard[]) => {
          return res;
        })
      )
      .subscribe(res => {
        console.log(res);
      });
  }

  getControls() {
    return (<FormArray>this.signupForm.get("hobbies")).controls;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get("hobbies")).push(control);
  }

  // Synchronous validator example
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (control.value == "secret") {
      return { nameIsForbidden: true };
    }
    return null;
  }

  // Async validator example
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
