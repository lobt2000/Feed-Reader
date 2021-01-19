import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/interface';
import { NewsRss } from 'src/app/shared/interfaces/news-rss';
import { RoterService } from 'src/app/shared/services/roter.service';
import * as xml2js from "xml2js";
@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  rss: string;
  RssData: NewsRss;
  data = [];

  feeds: Array<string> = [
    //   "https://www.nasa.gov/rss/dyn/breaking_news.rss",
    //   "https://www.reddit.com/.rss",
    //   "https://www.mobileworldlive.com/latest-stories/feed"

  ];
  currentUser: IUser
  isEnclosure = true;
  isAdd = false;
  currentFeed: string = '';
  angle: string = "../../../assets/image/angle-down-solid.svg"
  overflow = "hidden";
  mySelect = false;
  newFeed: string = '';
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router, private roterService: RoterService) { }

  ngOnInit(): void {
    this.getUser()
  }
  getUser(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.feeds = this.currentUser.feeds
    this.currentFeed = this.feeds[0]
  }
  chooseFeed(feed: string): void {
    this.currentFeed = feed;
    this.selectFeed();
  }
  selectFeed(): void {
    this.mySelect = !this.mySelect;
    if (this.mySelect) {
      this.angle = '../../../assets/image/angle-up-solid.svg';
      this.overflow = 'visible';

    }
    else {
      this.angle = '../../../assets/image/angle-down-solid.svg';

      this.overflow = 'hidden';
    }
  }
  clickAdd(): void {
    this.isAdd = true
  }
  addFeed(): void {
    if (this.newFeed) {
      this.feeds.push(this.newFeed);
      const saveU = {
        id: this.currentUser.userId,
        userId: this.currentUser.userId,
        email: this.currentUser.email,
        password: this.currentUser.password,
        feeds: this.feeds
      }
      // delete saveU.id
      console.log(saveU.id);

      this.roterService.updateJsonUser(saveU).subscribe(() => {
        localStorage.setItem('user', JSON.stringify(saveU))
        this.getUser();
        this.toastr.success('You add new feed!', 'Success');

        this.newFeed = '';

      },
        err => {
          console.log(err);

        })

    }
    else {
      this.toastr.error('You write invalid data!', 'Denied');
      this.newFeed = '';
    }
    this.isAdd = false;

  }
  deleteFeed(feed): void {
    this.feeds.splice(feed, 1);
    const saveU = {
      id: this.currentUser.id,
      userId: this.currentUser.userId,
      email: this.currentUser.email,
      password: this.currentUser.password,
      feeds: this.feeds
    }

    this.roterService.updateJsonUser(saveU).subscribe(() => {
      localStorage.setItem('user', JSON.stringify(saveU))
      this.getUser();
      this.toastr.success('You delete feed!', 'Success');
      this.selectFeed();

    },
      err => {
        console.log(err);

      })
  }
  SignOut(): void {
    localStorage.removeItem('user');
    this.router.navigateByUrl('log');
  }
  GetRssFeedData(): void {
    const requestOptions: Object = {
      observe: "body",
      responseType: "text"
    };
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    this.http
      .get<any>(proxyurl + this.currentFeed, requestOptions)
      .subscribe(data => {
        let parseString = xml2js.parseString;
        parseString(data, (err, result: NewsRss) => {
          this.RssData = result;
          if (result.hasOwnProperty('rss')) {
            this.data = this.RssData.rss.channel[0].item;
            console.log(this.RssData.rss.channel[0].item)
            this.rss = 'rss'

            if (this.RssData.rss.channel[0].item[0].hasOwnProperty('enclosure')) {
              this.isEnclosure = true;

            }
            else {
              this.isEnclosure = false;

            }

          }
          else if (result.hasOwnProperty('feed')) {
            this.data = result.feed.entry;
            console.log(this.data)
            this.rss = 'feed'
          }
        });
      });
  }

  goToDetails(oneArticle): void {
    localStorage.setItem('article', JSON.stringify(oneArticle))
    this.router.navigateByUrl('feed-details');
  }

}
