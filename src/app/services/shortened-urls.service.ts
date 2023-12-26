import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShortenedUrlsService {
  endpoint = 'http://localhost:3000/shortened-urls';

  constructor(private _http: HttpClient) {}

  saveUrlToDatebase(updatedPropertyValue: any): Observable<any> {
    return this._http.post<any>(this.endpoint, updatedPropertyValue);
  }

  getSavedUrls(searchTerm?: string): Observable<any> {
    return this._http.get<object>(
      `${this.endpoint}${searchTerm ? '?q=' + searchTerm : '/'}`
    );
  }

  deleteUrl(id: number): Observable<any> {
    return this._http.delete<object>(`${this.endpoint}/${id}`);
  }

  updateUrl(id: number, data: object): Observable<any> {
    return this._http.patch<object>(`${this.endpoint}/${id}`, data);
  }
}
