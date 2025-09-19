import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  private httpClient = inject(HttpClient);

  public get<T>(path: string): Observable<T>{
    return this.httpClient.get<T>(path);
  }
}
