import { Component, inject, OnDestroy, OnInit, signal, Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { MainDisplayer } from "./utils/main-displayer/main-displayer";
import { DisplayList } from "./utils/display-list/display-list";
import { DisplayJsonContentInterface } from './interfaces/display-json-content.interface';
import { JsonService } from './services/jsonService/json.service';
import { ModalService } from './services/modalService/modal-service.service';
import { Modal } from './utils/modal/modal';
import { Subscription } from 'rxjs';
import { CommunicationService } from './services/communicationService/communication.service';
import { DistantFunctionsInterface } from './interfaces/distant-functions.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MainDisplayer, DisplayList, Modal],
  providers: [JsonService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('portfolio');

  private cards: DisplayJsonContentInterface[] = [];
  protected mainCards: DisplayJsonContentInterface[] = [];
  protected secondaryCards: DisplayJsonContentInterface[] = [];

  protected modalComponent!: Type<unknown>;

  protected modalService = inject(ModalService);

  private jsonService = inject(JsonService);
  private communicationService = inject(CommunicationService);

  private aSubscriptions: Subscription[] = [];

  private distantFunctions: DistantFunctionsInterface = {
    'setUniqueMainDisplayed': this.setUniqueMainDisplayed,
    'reload': this.scatterCards
  };

  ngOnInit(): void {
    this.aSubscriptions.push(
      this.jsonService.get<DisplayJsonContentInterface[]>('assets/data/cards.json').subscribe((cards) => {
        this.cards = cards;
      }),
      this.modalService.componentEmmiter.subscribe(value => {
        this.modalComponent = value;
      }),
      this.communicationService.functionCalled.subscribe(([funct, params]) => {
        if (funct === 'setUniqueMainDisplayed') {
          this.distantFunctions[funct].call(this, params as DisplayJsonContentInterface);
        } else if (funct === 'reload') {
          this.distantFunctions[funct].call(this);
        }
      })
    );

    this.scatterCards();
  }

  ngOnDestroy() {
    this.aSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private setUniqueMainDisplayed(jsonContent: DisplayJsonContentInterface) {
    const cards = [
      ...this.mainCards,
      ...this.secondaryCards
    ];

    const queriedCard = cards.find(card => card.title === jsonContent.title);

    if (queriedCard) {
      this.mainCards = [queriedCard];
      this.secondaryCards = [...cards.filter(card => card.title !== jsonContent.title)];
    } else {
      throw new Error('Card not found');
    }
  };

  private scatterCards() {
    this.mainCards = [];
    this.secondaryCards = [];

    for (const card of this.cards) {
      switch (card.defaultDisplay) {
        case 'Main':
          if (this.mainCards.length < 4) {
            this.mainCards = [
              ...this.mainCards,
              card
            ];
          } else {
            this.secondaryCards = [
              ...this.secondaryCards,
              card
            ];
          }
          break;
        default:
          this.secondaryCards = [
            ...this.secondaryCards,
            card
          ];
      }
    }
  }

  private setCardPosition(jsonContent: DisplayJsonContentInterface, position: string) {

  };
}
