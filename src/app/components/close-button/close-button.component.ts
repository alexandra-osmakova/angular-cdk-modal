import { Component } from "@angular/core";
import { DialogStateService } from './../../service/dialog-state.service';

@Component({
  selector: "app-close-button",
  template: `
    <button (click)="closeModal()">X</button>
  `,
  styles: [
    `
      button {
        position: absolute;
        top: 16px;
        right: 16px;
      }
    `
  ]
})
export class CloseButtonComponent {
  constructor(private dialogState: DialogStateService) {}

  closeModal() {
    this.dialogState.isClosed.next(true);
  }
}
