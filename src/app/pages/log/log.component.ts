import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/classes/users.model';
import { IUser } from 'src/app/shared/interfaces/interface';
import { RoterService } from 'src/app/shared/services/roter.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  regExpEmail = /^[a-z0-9\-\.]{1,}(@gmail\.com|net\.us|org\.ua)$/i;
  regExpPass = /^[a-zA-Z0-9]{6,15}$/;
  inputUser: string = '';
  inputPass: string = '';
  users: Array<IUser> = []
  check = false;
  feeds: Array<string> = [
    "https://www.nasa.gov/rss/dyn/breaking_news.rss",
    "https://www.reddit.com/.rss",
    "https://www.mobileworldlive.com/latest-stories/feed"

  ];
  constructor(private roterService: RoterService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getJsonUsers()

  }
  getJsonUsers(): void {
    this.roterService.getJsonUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);

    },
      err => {
        console.log(err);

      })
  }
  regCheck(): boolean {
    return this.regExpEmail.test(this.inputUser);

  }
  regCheckPass(): boolean {
    return this.regExpPass.test(this.inputPass);

  }

  signIN(): void {
    if (this.inputUser && this.inputPass) {
      if (this.regExpEmail.test(this.inputUser) && this.regExpPass.test(this.inputPass)) {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].email == this.inputUser) {
            if (this.users[i].password == this.inputPass) {
              localStorage.setItem('user', JSON.stringify(this.users[i]))
              this.toastr.success('You log as user!', 'Hello user');
              this.router.navigateByUrl('feed');
              this.check = true
            }
            else {
              this.check = false
            }
            break;
          }
          else {
            this.check = false;
          }
        }

        if (!this.check) {
          const newUser = {
            id: 1,
            userId: this.users.length + 1,
            email: this.inputUser,
            password: this.inputPass,
            feeds: this.feeds
          }
          delete newUser.id

          this.roterService.postJsonUsers(newUser).subscribe(() => {
            localStorage.setItem('user', JSON.stringify(newUser))
            this.toastr.success('You log as user!', 'Hello user');
            this.router.navigateByUrl('feed');

            this.getJsonUsers()
          },
            err => {
              console.log(err);
              this.toastr.error('You write invalid data!', 'Denied');


            })


        }

      }
      else {
        this.toastr.error('You write invalid data!', 'Denied');

      }
    }
    else {
      this.toastr.error('You don`t write any data!', 'Denied');

    }
  }

}
