import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HtmlService {
  constructor(
    private httpClient: HttpClient
  ) {}

  public get(path: string): Observable<string>{
    return this.httpClient.get(`/assets/data/templates/${path}.html`, {responseType: 'text'});
  }
}
