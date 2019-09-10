import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FilePreviewOverlayComponent } from './components/dialog/file-preview-overlay.component';
import { FilePreviewOverlayService } from './service/file-preview-overlay.service';
import { IncomeDataService } from './service/income-data.service';
import { CloseButtonComponent } from './components/close-button/close-button.component';
import { DialogStateService } from './service/dialog-state.service';

@NgModule({
  declarations: [
    AppComponent,
    FilePreviewOverlayComponent,
    CloseButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OverlayModule,
    ReactiveFormsModule
  ],
  providers: [FilePreviewOverlayService, IncomeDataService, DialogStateService],
  bootstrap: [AppComponent],
  entryComponents: [
    FilePreviewOverlayComponent
  ]
})
export class AppModule { }
