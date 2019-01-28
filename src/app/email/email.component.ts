import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from 'rxjs/operators';

import { AlertService,AuthenticationService } from "../_services";
import { error } from '@angular/compiler/src/util';
import { config } from 'rxjs';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  

  registerForm = new FormGroup({
    // firstName: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl(' ', Validators.required),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required)

 
  });

  
  constructor(
    private http: HttpClient, 
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router, 
    private formBuilder: FormBuilder
    )
    {} 
     

  ngOnInit() {
    
  }

  onSubmit() {
    this.submitted = true;
        
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return console.log("Empty Input");
    }

    this.loading = true;
    this.authenticationService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/profile']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false
        }
      )

      }

}
