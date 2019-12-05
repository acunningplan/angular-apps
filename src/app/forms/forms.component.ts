import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.component.html",
  styleUrls: ["./forms.component.css"]
})
export class FormsComponent {
  @ViewChild("f") signUpForm: NgForm;
  defaultQuestion = "pet";
  answer = "";
  genders = ["male", "female"];

  suggestUserName() {
    const suggestedName = "Superuser";
  }

  onSubmit(form: NgForm) {
    console.log(this.signUpForm);
  }
}
