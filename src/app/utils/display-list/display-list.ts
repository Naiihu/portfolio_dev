import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { Display } from "../display/display";
import { DisplayJsonContentInterface } from '../../interfaces/display-json-content.interface';

@Component({
  selector: 'app-display-list',
  imports: [Display],
  templateUrl: './display-list.html',
  styleUrl: './display-list.scss'
})
export class DisplayList {
  @Input() cards: Array<DisplayJsonContentInterface> = [];

  @ViewChildren(Display) displays!: QueryList<Display>;
}
