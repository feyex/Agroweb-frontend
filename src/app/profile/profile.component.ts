import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from 'rxjs/operators';

import { AlertService,AuthenticationService } from "../_services";
import { error } from '@angular/compiler/src/util';
import { config } from 'rxjs';


import { User } from "../_models";
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';


const URL = 'http://localhost:9000/photo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;

   //function responsible for preview of image in the browser before submission
   public imagePath;
   imgURL: any;
   public message: string;
  
   preview(files) {
     if (files.length === 0)
       return;
  
     var mimeType = files[0].type;
     if (mimeType.match(/image\/*/) == null) {
       this.message = "Only images are supported.";
       return;
     }
  
     var reader = new FileReader();
     this.imagePath = files;
     reader.readAsDataURL(files[0]); 
     reader.onload = (_event) => { 
       this.imgURL = reader.result; 
     }
   }
   
   //function responsible for binding angular with lumen
   public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'image'});
 
 //function responsible for form binding
   registerForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    phone: new FormControl(' ', Validators.required),
    sex: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    school: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    interest: new FormControl('', Validators.required),

 
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
    //function for uploading image by connecting with backend
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };
  }

  onSubmit() {
    this.submitted = true;
        
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      
      return console.log("Empty Input");
      
    }

    this.loading = true;
    this.authenticationService.profile(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/view']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false
        }
      )

      }

}
