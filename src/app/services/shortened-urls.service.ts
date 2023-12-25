import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShortenedUrlsService {
  endpoint = 'http://localhost:3000/shortened-urls';

  constructor(private _http: HttpClient) {}

  saveUrlToDatebase(data: any): Observable<any> {
    return this._http.post<any>(this.endpoint, data);
  }

  getSavedUrls(): Observable<any> {
    return this._http.get<any>(this.endpoint)
  }
}
