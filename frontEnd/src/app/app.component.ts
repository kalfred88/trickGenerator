import { Component } from '@angular/core';
import { TrickApiService } from './trick-api.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tricks: any;
  stances: Array<String> = ['', 'nollie', 'fakie', 'switch'];
  randomTrick: any = {
    trickname: 'Press Generate! ;)',
    description: '',
    link: '',
    stance: ''
  };
  ytLink: String = 'https://www.youtube.com/embed/tJf-QjZu2LQ?rel=0&showinfo=0';

  constructor(public http: Http, private service: TrickApiService) {
    this.trickList();
  }

  trickList() {
    this.http.get(`http://localhost:3000/tricks/`).subscribe(
      data => this.tricks = JSON.parse(data['_body']));
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

  getDifficulties() {
    const diffs: any = document.getElementsByClassName('difficulty');
    const checkedDiffs = [];
    for (let i = 0; i < diffs.length; i++) {
      if (diffs[i].checked === true) {
        checkedDiffs.push(diffs[i].value);
      }
    }
    if (checkedDiffs.length === 0) {
      checkedDiffs.push('medium');
    }
    return checkedDiffs;
  }

  getCurrentTricks() {
    const diffs = this.getDifficulties();
    const currentTricks = this.tricks.filter(trick => diffs.includes(trick.difficulty));
    return currentTricks;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getRandom() {
    const currentTricks = this.getCurrentTricks();
    const max = currentTricks.length;
    this.randomTrick = Object.assign({}, currentTricks[this.getRandomInt(max)]);
    this.randomTrick.stance = this.stances[this.getRandomInt(4)];
    this.ytLink = `https://www.youtube.com/embed/${this.randomTrick.link}?rel=0&showinfo=0`;
    // console.log(this.randomTrick);
    // console.log(this.ytLink);
  }

}
