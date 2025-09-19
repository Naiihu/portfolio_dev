import { Injectable, Type, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isModalOpen = false;
  private component = new EventEmitter<Type<unknown>>();
  private inputs: Record<string, unknown> = {};

  get modalStatus() {
    return this.isModalOpen;
  }

  get componentEmmiter(): EventEmitter<Type<unknown>> {
    return this.component;
  }

  set componentEmmiter(value: Type<unknown>) {
    this.component?.emit(value);
  }

  get modalInputs() {
    return this.inputs;
  }

  set modalInputs(inputs: Record<string, unknown>) {
    this.inputs = inputs;
  }

  public openModal() {
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
  }
}
