import { Component, OnInit } from '@angular/core';
import { TrickApiService } from '../trick-api.service';
import { HttpClient } from 'selenium-webdriver/http';
import { Http } from '@angular/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.pug',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user: object = {
    username: '',
    email: '',
    password: ''
  };

  newUser: object = {
    username: '',
    email: '',
    password: ''
  };


  constructor(private service: TrickApiService, public http: Http) { }

  login() {
    this.service.login(this.user);
  }

  register() {
    this.service.register(this.newUser);
  }

  logout() {
    this.service.logout();
  }

  ngOnInit() {
  }

}
