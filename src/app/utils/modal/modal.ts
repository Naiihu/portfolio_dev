import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, inject, Input, Type } from '@angular/core';
import { ModalService } from '../../services/modalService/modal-service.service';

@Component({
  selector: 'app-modal',
  imports: [NgComponentOutlet, CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal {
  @Input({ required: true }) component!: Type<unknown>;
  @Input({ required: true }) inputs!: Record<string, unknown>;

  private modalService = inject(ModalService);

  protected closeModal() {
    this.modalService.closeModal();
  }
}
