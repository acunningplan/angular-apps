import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';

@Component({
    selector: 'app-add-trip-card',
    templateUrl: './add-trip-card.component.html',
    styleUrls: ['./add-trip-card.component.css']
})
export class AddTripCardComponent implements OnInit {
    signupForm: FormGroup;
    username: AbstractControl;
    email: AbstractControl;

    ngOnInit() {
        this.signupForm = new FormGroup({
            'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'secret': new FormControl('pet'),
            'hobbies': new FormArray([])
        })

        this.username = this.signupForm.get('username')
        this.email = this.signupForm.get('email')
    }

    getControls() {
        return (<FormArray>this.signupForm.get('hobbies')).controls;
    }

    onAddHobby() {
        const control = new FormControl(null, Validators.required);
        (<FormArray>this.signupForm.get('hobbies')).push(control);
    }

    forbiddenNames(control: FormControl): { [s: string]: boolean } {
        if (control.value == 'secret') {
            return { 'nameIsForbidden': true }
        }
        return null
    }

    onSubmit() {
        console.log(this.signupForm);
    }
}
