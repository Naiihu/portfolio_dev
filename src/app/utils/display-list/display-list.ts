import { Component, Input, OnInit } from '@angular/core';
import { Display } from "../display/display";
import { DisplayJsonContentInterface } from '../../interfaces/display-json-content.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-display-list',
  imports: [Display],
  templateUrl: './display-list.html',
  styleUrl: './display-list.scss'
})
export class DisplayList implements OnInit{
  @Input() cards: DisplayJsonContentInterface[] = [];

  protected currPage$: Subject<number> = new Subject<number>();
  protected iCurrPage = 0;

  protected displayedList: DisplayJsonContentInterface[] = [];

  protected Array = Array;
  protected pageNumber = 0;

  ngOnInit() {
    if (this.cards) {
      this.pageNumber = Math.ceil(this.cards.length / 3);
    }

    this.currPage$.subscribe((page: number) => {
      this.displayedList = this.cards.slice(page * 3, (page * 3) + 3);

      this.iCurrPage = page;
    });

    this.currPage$.next(0);
  }

  protected prevPage(event?: KeyboardEvent) {
    if (event?.key === 'LeftArrow' || !event) {
      if (this.iCurrPage > 0) {
        this.currPage$.next(this.iCurrPage - 1);
      } else {
        this.currPage$.next(this.pageNumber - 1);
      }
    }
  }

  protected nextPage(event?: KeyboardEvent) {
    if (event?.key === 'RightArrow' || !event) {
      if (this.iCurrPage < this.pageNumber - 1) {
        this.currPage$.next(this.iCurrPage + 1);
      } else {
        this.currPage$.next(0);
      }
    }
  }

  protected pageKeypress(event: KeyboardEvent) {
    if (!event.key || isNaN(parseInt(event.key, 10))) {
      return;
    }
    if (parseInt(event.key, 10) < 1 || parseInt(event.key, 10) > this.pageNumber) {
      return;
    }

    this.currPage$.next(parseInt(event.key, 10) - 1);
  }
}
