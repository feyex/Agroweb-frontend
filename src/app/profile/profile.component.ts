import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from 'rxjs/operators';

import { AlertService,AuthenticationService } from "../_services";
import { error } from '@angular/compiler/src/util';
import { config } from 'rxjs';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
