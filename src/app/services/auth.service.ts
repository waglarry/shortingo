import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  endPoint = 'http://localhost:3000/user';

  getUsers() {
    return this._http.get(this.endPoint);
  }

  getByCode(code: any) {
    return this._http.get(`${this.endPoint}/?email=${code}`);
  }

  register(inputData: any) {
    return this._http.post(this.endPoint, inputData);
  }
}
