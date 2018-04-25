import { Component, OnInit } from '@angular/core';
import { TrickApiService } from '../trick-api.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tricks: any;
  newTrick: any = {};
  newerTrick: any = {};
  diffData: Array<String> = ['easy', 'medium', 'hard', 'veryhard', 'extreme'];

  constructor(public http: Http) {
    this.trickList();
  }

  trickList() {
    this.http.get(`http://localhost:3000/tricks/`).forEach(
      data => this.tricks = JSON.parse(data['_body']));
  }

  addTrick() {
    if (this.newTrick.link === undefined) {
      this.newTrick.link = 'tJf-QjZu2LQ';
    }
    this.http.post(`http://localhost:3000/tricks/`, this.newTrick).subscribe(
      data => this.trickList());

    this.newTrick = {};
  }

  modal(id) {
    const choosen = this.tricks.filter(data => data._id === id)[0];
    this.newerTrick = Object.assign({}, choosen);
  }

  updateTrick() {
    this.http.put(`http://localhost:3000/tricks/${this.newerTrick._id}`, this.newerTrick).subscribe(
      data => this.trickList());
    this.newerTrick = {};
  }

  deleteTrick(trickId) {
    this.http.delete(`http://localhost:3000/tricks/${trickId}`).subscribe(
      data => this.trickList());
  }
  ngOnInit() {
  }

}
