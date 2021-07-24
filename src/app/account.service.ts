import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { ServerService } from './server.service';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private logInStatus: any = {
    username: '',
    expiryTime: 0
  }

  // information for sign up a user
  private userBasicInfo = new BehaviorSubject<UserBasicInfo | undefined>(undefined);
  // information of all details
  private userDetails = new BehaviorSubject<any>({
    email: ''
  });

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
    })
  };
  urlSignIn = this.server.host + '/sign-in';
  urlSignUp = this.server.host + '/sign-up';
  urlRetrieveUserDetails = this.server.host + '/retrieve-user-details';
  urlSendCompleteEmail = this.server.host + '/send-complete-email';

  constructor(
    private http: HttpClient,
    private server: ServerService,
  ) { }

  setUserBasicInfo(userBasicInfo: UserBasicInfo) {
    this.userBasicInfo.next(userBasicInfo);
  }

  getUserBasicInfo() {
    return this.userBasicInfo.asObservable();
  }

  // TODO: make an interface for user details
  setUserDetails(userDetails: object) {
    this.userDetails.next(userDetails);
  }

  getUserDetails() {
    return this.userDetails.asObservable();
  }

  /**
   * @param signInInfo - the data for sign in and has two fields -- username & password
   */
  signIn(signInInfo: object) {
    return this.http.post(this.urlSignIn, signInInfo, {responseType: 'text'});
    // return of({
    //   success: true,
    //   // progress: 40,
    // })
  }

  signUp(signUpInfo: UserBasicInfo) {
    return this.http.post<any>(this.urlSignUp, signUpInfo, this.httpOptions);
    // return of({
    //   success: true
    // })
  }

  retrieveUserDetails(username: string) {
    return this.http.post<any>(this.urlRetrieveUserDetails, {username: username}, this.httpOptions);
  }

  sendCompleteEmail(email_address: string, stage: string, next_link: string) {
    return this.http.post<any>(this.urlSendCompleteEmail, {
      email_address: email_address,
      stage: stage,
      next_link: next_link
    });
  }
}

interface UserBasicInfo {
  username: string;
  password: string;
  group_name: string;
  email: string;
}