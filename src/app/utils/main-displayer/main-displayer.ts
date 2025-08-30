import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { Display } from '../display/display';
import { DisplayJsonContentInterface } from '../../interfaces/display-json-content.interface';

@Component({
  selector: 'app-main-displayer',
  imports: [Display],
  templateUrl: './main-displayer.html',
  styleUrl: './main-displayer.scss'
})
export class MainDisplayer {
  @Input() cards: DisplayJsonContentInterface[] = [];

  @ViewChildren(Display) displays!: QueryList<Display>;

  protected defaultPositions: Record<number, string[]> = {
    1: ["full"],
    2: ["top", "bottom"],
    3: ["top", "bottom left", "bottom right"],
    4: ["top left", "top right", "bottom left", "bottom right"]
  };
}
