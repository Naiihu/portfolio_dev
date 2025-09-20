import { Component, inject } from '@angular/core';
import { SvgLogo } from "../utils/svg-logo/svg-logo";
import { ThemeSwitcher } from "../utils/theme-switcher/theme-switcher";
import { CommunicationService } from '../services/communicationService/communication.service';

@Component({
  selector: 'app-header',
  imports: [SvgLogo, ThemeSwitcher],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private communicationService = inject(CommunicationService);

  protected reloadCards() {
    this.communicationService.callDistantFunction('reload', []);
  }
}
