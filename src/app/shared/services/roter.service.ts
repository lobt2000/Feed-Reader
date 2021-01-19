import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class RoterService {
  private user: Array<IUser> = [
  ]
  private url : string
  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/users'
  }
    getJsonUsers(): Observable<Array<IUser>>{
      return this.http.get<Array<IUser>>(this.url)
    }
    postJsonUsers(user: IUser): Observable<Array<IUser>>{
      return this.http.post<Array<IUser>>(this.url, user)
    }
    deleteJsonUser(user: IUser): Observable<Array<IUser>>{
      
      return this.http.delete<Array<IUser>>(`${this.url}/${user.id}`)
    }
    updateJsonUser(user: IUser): Observable<Array<IUser>>{
      return this.http.put<Array<IUser>>(`${this.url}/${user.id}`, user)
    }
}
