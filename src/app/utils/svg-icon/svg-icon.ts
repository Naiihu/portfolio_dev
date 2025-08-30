import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  imports: [],
  templateUrl: './svg-icon.html',
  styleUrl: './svg-icon.scss'
})
export class SvgIcons {
  @Input() name?: string;
}
