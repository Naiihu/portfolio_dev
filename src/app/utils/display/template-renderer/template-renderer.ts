import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { Display } from '../display';
import { ModalService } from '../../../services/modalService/modal-service.service';

@Component({
  selector: 'app-template-renderer',
  imports: [],
  templateUrl: './template-renderer.html',
  styleUrl: './template-renderer.scss'
})
export class TemplateRenderer implements OnInit {
  @Input({required: true}) oParent!: Display;
  @Input({required: true}) folder = '';
  @Input({required: true}) file = '';

  private cdr = inject(ChangeDetectorRef);
  protected modalService = inject(ModalService);

  protected htmlString = '';

  ngOnInit(): void {
    this.oParent.fetchHtml(`${this.folder}/${this.modalService.modalStatus ? 'long' : 'small'}/${this.file}`).then(value => {
      this.htmlString = value;
      this.cdr.markForCheck();
    });
  }

  protected toggleModal() {
    if (this.modalService.modalStatus) {
      this.modalService.closeModal();
    } else {
      this.modalService.componentEmmiter = TemplateRenderer;
      this.modalService.modalInputs = {
        'folder': this.folder,
        'file': this.file,
        'oParent': this.oParent
      };

      this.modalService.openModal();
    }
  }
}
