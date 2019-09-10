import { Component } from "@angular/core";
import { FilePreviewOverlayService } from "./service/file-preview-overlay.service";

import { IncomeDataService } from "./service/income-data.service";
import { FilePreviewOverlayRef } from "./service/file-preview-overlay-ref";

import { User } from "./models/user-model.interface";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "dialog-app";
  usersArr = this.incomeData.userArrey;

  constructor(
    private previewDialog: FilePreviewOverlayService,
    private incomeData: IncomeDataService
  ) {}

  openModal(item: User) {
    this.previewDialog.open();
  }

  setModal(item: User) {
    const dialogRef: FilePreviewOverlayRef = this.previewDialog.open({
      user: item
    });
  }
}
