import { Component } from '@angular/core';
import { SvgLogo } from "../utils/svg-logo/svg-logo";
import { ThemeSwitcher } from "../utils/theme-switcher/theme-switcher";

@Component({
  selector: 'app-header',
  imports: [SvgLogo, ThemeSwitcher],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
