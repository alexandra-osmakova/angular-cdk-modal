import { OverlayRef } from '@angular/cdk/overlay';
import { FilePreviewOverlayComponent } from './../components/dialog/file-preview-overlay.component';

export class FilePreviewOverlayRef {
  componentInstance: FilePreviewOverlayComponent;

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.detach();
    this.componentInstance = null!;
  }
}
