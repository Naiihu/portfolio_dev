import { Component, inject, OnInit, signal, Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { MainDisplayer } from "./utils/main-displayer/main-displayer";
import { DisplayList } from "./utils/display-list/display-list";
import { DisplayJsonContentInterface } from './interfaces/display-json-content.interface';
import { JsonService } from './services/jsonService/json.service';
import { ModalService } from './services/modalService/modal-service.service';
import { Modal } from './utils/modal/modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MainDisplayer, DisplayList, Modal],
  providers: [JsonService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('portfolio');

  protected mainCards: DisplayJsonContentInterface[] = [];
  protected secondaryCards: DisplayJsonContentInterface[] = [];

  protected modalComponent!: Type<unknown>;

  private jsonService = inject(JsonService);
  protected modalService = inject(ModalService);

  ngOnInit(): void {
    this.fetchCards();

    this.modalService.componentEmmiter.subscribe(value => {
      this.modalComponent = value;
    });
  }

  private async fetchCards() {
    this.jsonService.get<DisplayJsonContentInterface[]>('assets/data/cards.json').subscribe((cards) => {
      for(const card of cards) {
        switch (card.defaultDisplay) {
          case 'Main':
            if(this.mainCards.length < 4) {
              this.mainCards.push(card as DisplayJsonContentInterface);
            } else {
              this.secondaryCards.push(card as DisplayJsonContentInterface);
            }
            break;
          default:
            this.secondaryCards.push(card as DisplayJsonContentInterface);
        }
      }
    });
  }
}
