import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { User } from "../_models";
import { error } from '@angular/compiler/src/util';
import { MessageService } from "./message.service";
import {  BehaviorSubject,Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private messageService: MessageService) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  
  login(email: string, password: string,) {
    const uri ='http://localhost:9000/login';

    const obj = {
      email: email,
      password: password
    };

    return this.http.post<any>(uri, obj)
      .pipe(map(user => {
        if (user || user.api_token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
        console.log(user);
      }));

  }

  // getProduct(id: number) {
  //   const url = `http://localhost:9000/logout/${id}`;
  //   return this.http.get<any>(url).pipe(
  //     tap(_ => console.log(`fetched product id=${id}`)),
  //     catchError(this.handleError<any>(`user_id=${id}`))
  //   );
  // }

  register(user :User) {
    const uri = 'http://localhost:9000/newuser';

    // user.role = "bidder";

    return this.http.post<any>(uri, user)
      .pipe(map(user => {
        if (user && user.api_token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  profile(user :User) {
    const uri = 'http://localhost:9000/student';

    return this.http.post<any>(uri, user)
      .pipe(map(user => {
        if (user && user.api_token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout(id :number) {
   
    // remove user from local storage to log user out
    const url = `http://localhost:9000/logout/${id}`;

    console.log(id);

    return this.http.get(url)
    .pipe(
      tap( _ => this.log("logout successfully")),
      catchError(this.handleError('logout', []))
    )
  }

  /** 
   * 
   * Handle  Http operation that failed
   * Let the app continue
   * @param operation -  name of the operation that failed
   * @param result - operation value to return as the observable result
   * */ 
  private handleError<T>(operation = 'operation', result?: T) {
    
    return (error: any): Observable<T> => {

      // TODO: send the error ti remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }

  /** Log a AuthService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AuthenticationService: ${message}`);
  }


}
