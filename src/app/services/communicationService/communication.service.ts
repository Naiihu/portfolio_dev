import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private functionCallSource = new Subject<[string, unknown]>();

  public functionCalled = this.functionCallSource.asObservable();

  public callDistantFunction(funct: string, params: unknown) {
    this.functionCallSource.next([funct, params]);
  }
}
