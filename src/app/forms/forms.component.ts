import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.component.html",
  styleUrls: ["./forms.component.css"]
})
export class FormsComponent implements OnInit {
  projectForm: FormGroup;
  projectStatuses: ["Stable", "Critical", "Finished"];

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(
        null,
        Validators.required,
        this.validateProjectName
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl("Stable")
    });

    this.projectForm.setValue({
      projectName: "",
      email: "",
      projectStatus: "Stable"
    });
  }

  validateProjectName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "Test") {
          resolve({ projectNameIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 100);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.projectForm.value);
    this.projectForm.reset({
      projectStatus: "Stable"
    });
  }
}

// @Component({
//   selector: "app-forms",
//   templateUrl: "./forms.component.html",
//   styleUrls: ["./forms.component.css"]
// })
// export class FormsComponent implements OnInit {
//   genders = ["male", "female"];
//   signupForm: FormGroup;
//   forbiddenUserNames = ["Anonymous", "Unknown"];

//   constructor(private formBuilder: FormBuilder) {}

//   ngOnInit() {
//     this.signupForm = new FormGroup({
//       userData: new FormGroup({
//         username: new FormControl(null, [
//           Validators.required,
//           this.checkForbiddenNames.bind(this)
//         ]),
//         email: new FormControl(
//           null,
//           [Validators.required, Validators.email],
//           this.checkForbiddenEmails
//         )
//       }),
//       gender: new FormControl("male"),
//       hobbies: new FormArray([new FormControl(), new FormControl()])
//       // hobbies: this.formBuilder.array([])
//     });

//     // this.signupForm.valueChanges.subscribe(value => console.log(value));

//     this.signupForm.setValue({
//       userData: {
//         username: "James",
//         email: "jlfly12@test.com"
//       },
//       gender: "male",
//       hobbies: ["hiking", "running"]
//     });
//   }

//   onAddHobby() {
//     const control = new FormControl(null, Validators.required);
//     (<FormArray>this.signupForm.get("hobbies")).push(control);
//   }

//   getControls() {
//     return (<FormArray>this.signupForm.get("hobbies")).controls;
//   }

//   checkForbiddenNames(control: FormControl): { [s: string]: boolean } {
//     if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
//       return { nameIsForbidden: true };
//     }
//     return null;
//   }

//   checkForbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
//     const promise = new Promise<any>((resolve, reject) => {
//       setTimeout(() => {
//         if (control.value === "test@test.com") {
//           resolve({ emailIsForbidden: true });
//         } else {
//           resolve(null);
//         }
//       }, 1500);
//     });
//     return promise;
//   }

//   onSubmit() {
//     console.log(this.signupForm);
//     this.signupForm.reset({
//       gender: "male"
//     });
//   }
// }

// @Component({
//   selector: "app-forms",
//   templateUrl: "./forms.component.html",
//   styleUrls: ["./forms.component.css"]
// })
// export class FormsComponent {
// @ViewChild("f") signUpForm: NgForm;
// defaultQuestion = "pet";
// answer = "";
// genders = ["male", "female"];
// user = {
//   username: "",
//   email: "",
//   secretQuestion: "",
//   answer: "",
//   gender: ""
// };
// submitted = false;

// suggestUserName() {
//   const suggestedName = "Superuser";
//   // this.signUpForm.setValue({
//   //   userData: {
//   //     username: suggestedName,
//   //     email: ''
//   //   },
//   //   secret: 'pet',
//   //   questionAnswer: '',
//   //   gender: 'male'
//   // })
//   this.signUpForm.form.patchValue({
//     userData: {
//       username: suggestedName
//     }
//   });
// }

// onSubmit() {
//   this.submitted = true;
//   this.user.username = this.signUpForm.value.userData.username;
//   this.user.email = this.signUpForm.value.userData.email;
//   this.user.secretQuestion = this.signUpForm.value.secret;
//   this.user.answer = this.signUpForm.value.questionAnswer;
//   this.user.gender = this.signUpForm.value.gender;

//   this.signUpForm.reset();
// }
// }

// @Component({
//   selector: "app-forms",
//   templateUrl: "./forms.component.html",
//   styleUrls: ["./forms.component.css"]
// })
// export class FormsComponent {
//   @ViewChild("f") subscriptionForm: NgForm;

//   email = "";
//   subscription = "";
//   password = "";
//   defaultSubscription = "Advanced";
//   subscriptions = ["Basic", "Advanced", "Pro"]

//   onSubmit() {
//     console.log({
//       email: this.subscriptionForm.value.email,
//       subscription: this.subscriptionForm.value.subscription,
//       password: this.subscriptionForm.value.password
//     });
//   }
// }
