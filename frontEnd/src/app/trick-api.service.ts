import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class TrickApiService {
  datas: any;
  tricks: any;
  loggedIn = false;
  loggedInUser: any;

  constructor(public http: Http) { }


  getTrick(trickId) {
    this.http.get(`http://localhost:3000/tricks/${trickId}`).subscribe(
      data => this.tricks = JSON.parse(data['_body']));
  }

  trickList() {
    this.http.get(`http://localhost:3000/tricks/`).subscribe(
      async data => this.tricks = await JSON.parse(data['_body']));
    return this.tricks;
  }

  addTrick(newTrick) {
    this.http.post(`http://localhost:3000/tricks/`, newTrick).subscribe(
      data => this.tricks = JSON.parse(data['_body']));
  }

  updateTrick(editedTrick) {
    this.http.put(`http://localhost:3000/tricks/${editedTrick.id}`, editedTrick).subscribe(
      data => this.tricks = JSON.parse(data['_body']));
  }

  deleteTrick(trickId) {
    this.http.delete(`http://localhost:3000/tricks/${trickId}`).subscribe(
      data => this.tricks = JSON.parse(data['_body']));
  }

  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error: ' + JSON.stringify(res.error));
    } else {
      this.datas = res;
    }
  }

  register(user) {
    this.http.post('http://localhost:3000/user/register', user).subscribe(
      data => {
        console.log(data);
        this.errorHandling(data);
      });
  }

  login(user) {
    this.http.post('http://localhost:3000/user/login', user).subscribe(
      data => {
        console.log(data);
        this.loggedIn = data.ok;
        this.loggedInUser = JSON.parse(data['_body']).user;
        this.errorHandling(data);
      });
  }

  logout() {
    this.http.get('http://localhost:3000/user/logout').subscribe(
      data => {
        this.loggedIn = false;
        console.log(data);
        this.errorHandling(data);
      });
  }
}
