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
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

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
   image: new FormControl('', Validators.required),

 
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
      this.router.navigate(['/profile']);
       };
    }
  
}
