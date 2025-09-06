import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FrontendService } from '../../services/frontend.service';

@Component({
  selector: 'app-theme-switcher',
  imports: [],
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.scss'
})
export class ThemeSwitcher implements OnInit, OnDestroy {
  protected colorTheme: BehaviorSubject<string> = new BehaviorSubject<string>('dark');

  private readonly aSubscriptions: Subscription[] = [];

  private readonly frontEndService = inject(FrontendService);

  ngOnInit() {
    this.aSubscriptions.push(
      this.colorTheme.subscribe(value => {
        const rootElem = this.frontEndService.getDocument()?.querySelector('*:root');

        if (value === 'dark') {
          rootElem?.classList.add('dark');
          rootElem?.classList.remove('light');
        } else if (value === 'light') {
          rootElem?.classList.add('light');
          rootElem?.classList.remove('dark');
        }
      })
    );

    if (this.frontEndService.getWindow()?.matchMedia) {
      if (this.frontEndService.getWindow()?.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.colorTheme.next('dark');
      } else {
        this.colorTheme.next('light');
      }
    }
  }

  ngOnDestroy(): void {
      this.aSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  protected toggleTheme(event?: KeyboardEvent) {
    if (event?.key === 't' || !event) {
      this.colorTheme.next(this.colorTheme.getValue() === 'dark' ? 'light' : 'dark');
    }
  }
}
