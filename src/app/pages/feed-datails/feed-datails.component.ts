import { Component, OnInit } from '@angular/core';
import { RoterService } from 'src/app/shared/services/roter.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-feed-datails',
  templateUrl: './feed-datails.component.html',
  styleUrls: ['./feed-datails.component.scss']
})
export class FeedDatailsComponent implements OnInit {
  article: any;
  rss: string = "author";
  isEnclosure = true;
  regExp = /\/u\//gmi
  constructor(private roterService: RoterService, public location: Location) { }

  ngOnInit(): void {

    this.article = JSON.parse(localStorage.getItem('article'))
    console.log(this.article);
    if (this.article.hasOwnProperty('enclosure')) {
      this.rss = 'enclosure';
      // localStorage.removeItem('article');

    }
    else if (this.article.hasOwnProperty('author')) {
      this.rss = 'author'
      if(this.regExp.test(this.article.content[0]['_'])){
        // this.article.content[0]['_'] =  this.article.content[0]['_'].replace(this.regExp, '<br> ')
        console.log();
        
        
      }
      // localStorage.removeItem('article');

    }
    else if (this.article.hasOwnProperty('dc:creator')) {
      this.rss = 'dc:creator'
      // localStorage.removeItem('article');

    }
    // console.log(this.article.content[0]['_']);
    
  }
  

}
