import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../shared/interfaces';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`https://jsonplaceholder.typicode.com/users`);
  }

  getOne(id: number): Observable<IUser> {
    return this.http.get<IUser>(`https://jsonplaceholder.typicode.com/users/${id}`);
  }

  save(user: IUser): Observable<IUser> {
    return of(user).pipe(delay(1000));
    // const url = user.id ? `users/${user.id}/update` : `users/create`;
    // return this.http.post<IUser>(url, user);
  }
}
