import { ChangeDetectorRef, Component, ElementRef, inject, Input, OnChanges, OnDestroy, SecurityContext, SimpleChanges } from '@angular/core';
import { DisplayJsonContentInterface } from '../../interfaces/display-json-content.interface';
import { FrontendService } from '../../services/fontendService/frontend.service';
import { SvgIcons } from '../svg-icon/svg-icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HtmlService } from '../../services/htmlService/html.service';
import { Observable, of, Subscription } from 'rxjs';
import { TemplateRenderer } from "./template-renderer/template-renderer";
import { CommunicationService } from '../../services/communicationService/communication.service';

@Component({
  selector: 'app-display',
  imports: [SvgIcons, TemplateRenderer],
  templateUrl: './display.html',
  styleUrl: './display.scss'
})
export class Display implements OnChanges, OnDestroy {
  @Input() jsonContent: DisplayJsonContentInterface = {
    title: 'Sample Title',
    text: 'Sample Text'
  };

  @Input() isSmall = false;
  @Input() isInModal = false;

  protected elementId: number = Math.round(Math.random() * Date.now());
  protected hideDragZones = true;

  protected htmlString = '';

  private draggedElemId = '';

  private aSubscriptions: Subscription[] = [];

  protected element = inject(ElementRef);
  private frontEndService = inject(FrontendService);
  private domSanitizer = inject(DomSanitizer);
  private htmlService = inject(HtmlService);
  private cdr = inject(ChangeDetectorRef);
  private communicationService = inject(CommunicationService);

  protected Object = Object;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jsonContent']) {
      this.initDisplay(changes['jsonContent'].currentValue);
    }
  }

  ngOnDestroy(): void {
    this.aSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public initDisplay(jsonContent: DisplayJsonContentInterface = this.jsonContent): void {
    if (jsonContent.template) {
      this.fetchHtml(`${jsonContent.template}/${jsonContent.template}`).then(value => {
        this.htmlString = value;
        this.cdr.detectChanges();
      });
    } else {
      this.sanitizeHtml(jsonContent.text ?? '').subscribe(value => {
        const domParser = new DOMParser();
        const doc = domParser.parseFromString(value, 'text/html');
        const ageElem = doc.querySelector('.age');

        if (ageElem) {
          const birthDate = new Date(2003, 6, 2); // 2 Juillet 2003

          const ageDifMs = Date.now() - birthDate.getTime();
          const ageDate = new Date(ageDifMs);

          const age = Math.abs(ageDate.getUTCFullYear() - 1970);

          ageElem.textContent = age + ' ans';
          value = doc.body.innerHTML;
        }

        const todayElem = doc.querySelector('.today');

        if (todayElem) {
          const today = new Date();

          const monthYear = today.toLocaleDateString('Fr', { month: 'long', year: 'numeric' });
          todayElem.textContent = monthYear.charAt(0).toUpperCase() + monthYear.slice(1);
          value = doc.body.innerHTML;
        }

        this.htmlString = value;
      });
    }
  }

  public fetchHtml(template: string): Promise<string> {
    return new Promise<string>(resolve => {
      this.htmlService.get(template).subscribe((html: string) => {
        this.sanitizeHtml(html).subscribe(value => {
          resolve(value);
        });
      });
    });
  }

  /** */
  protected drop(event: DragEvent) {
    this.handleFigurePlacement(event);
  }

  /** */
  protected dragOver(event: DragEvent) {
    event.preventDefault();

    this.handleFigurePlacement(event);
  }

  protected dragStart(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/dragFigure', (event.target as HTMLElement).id);
      this.draggedElemId = (event.target as HTMLElement).id;

      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.dropEffect = 'move';
    }

    this.hideDragZones = false;
  }

  protected dragEnd() {
    this.hideDragZones = true;
  }

  protected sanitizeHtml(text: string): Observable<string> {
    return of(this.domSanitizer.sanitize(SecurityContext.HTML, text) || '');
  }

  protected setUniqueDisplay() {
    this.communicationService.callDistantFunction('setUniqueMainDisplayed', this.jsonContent);
  }

  private handleFigurePlacement(event: DragEvent) {
    if (event.dataTransfer) {
      const draggedElemId = event.dataTransfer.getData('application/dragFigure');

      const draggedElem = this.frontEndService.getDocument()?.getElementById(draggedElemId) ?? this.frontEndService.getDocument()?.getElementById(this.draggedElemId);

      if (draggedElem) {
        draggedElem.classList.forEach((elem: string) => draggedElem.classList.remove(elem));

        switch ((event.target as HTMLDivElement).id) {
          case `dragZone_${this.elementId}_1`:
            draggedElem.classList.add('left');
            break;
          case `dragZone_${this.elementId}_2`:
            draggedElem.classList.add('right');
            break;
          case `dragZone_${this.elementId}_3`:
            draggedElem.classList.add('left');
            draggedElem.classList.add('bottom');
            break;
          case `dragZone_${this.elementId}_4`:
            draggedElem.classList.add('right');
            draggedElem.classList.add('bottom');
            break;
          default:
            draggedElem.classList.add('left');
            break;
        }
      }

      const article: HTMLElement = this.element.nativeElement.querySelector('article');
      const contentSection: HTMLElement = article.querySelector('.content') ?? article;

      let articleHeight = 0;

      contentSection.childNodes.forEach((node: ChildNode) => {
        if (node.nodeName !== 'FIGURE') {
          articleHeight += (node as HTMLElement).offsetHeight ?? 0;
        }
      });

      article.style.height = articleHeight + 'px';
    }
  }
}
