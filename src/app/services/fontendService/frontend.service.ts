import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrontendService {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  public getDocument(): Document | null {
    return this.document;
  }

  public getWindow(): Window | null {
    return this.document.defaultView;
  }

  public getLocation(): Location | null {
    return this.document.location;
  }
}
