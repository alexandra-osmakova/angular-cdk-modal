import { Injectable, Injector, ComponentRef } from "@angular/core";
import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal, PortalInjector } from "@angular/cdk/portal";

import { FilePreviewOverlayComponent } from "../components/dialog/file-preview-overlay.component";
import { FilePreviewOverlayRef } from "./file-preview-overlay-ref";
import { DialogStateService } from "./../service/dialog-state.service";
import { DIALOG_DATA } from "./dialog-data";
import { User } from "../models/user-model.interface";

interface FilePreviewDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  user?: User;
}

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
  hasBackdrop: true,
  backdropClass: "dark-backdrop",
  panelClass: "tm-file-preview-dialog-panel",
  user: null
};

@Injectable()
export class FilePreviewOverlayService {
  constructor(
    private overlay: Overlay,
    private dialogState: DialogStateService,
    private injector: Injector
  ) {}

  open(config: FilePreviewDialogConfig = {}) {
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };
    const overlayRef = this.createOverlay(dialogConfig);
    const dialogRef = new FilePreviewOverlayRef(overlayRef);
    const overlayComponent = this.attachDialogContainer(
      overlayRef,
      dialogConfig,
      dialogRef
    );

    dialogRef.componentInstance = overlayComponent;

    this.dialogState.isClosed.subscribe(val => val && dialogRef.close());

    return dialogRef;
  }

  private createOverlay(config: FilePreviewDialogConfig) {
    const overlayConfig = this.getOverlayConfig(config);

    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private attachDialogContainer(
    overlayRef: OverlayRef,
    config: FilePreviewDialogConfig,
    dialogRef: FilePreviewOverlayRef
  ) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(
      FilePreviewOverlayComponent,
      null,
      injector
    );
    const containerRef: ComponentRef<
      FilePreviewOverlayComponent
    > = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector(
    config: FilePreviewDialogConfig,
    dialogRef: FilePreviewOverlayRef
  ): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(FilePreviewOverlayRef, dialogRef);
    injectionTokens.set(DIALOG_DATA, config.user);

    return new PortalInjector(this.injector, injectionTokens);
  }
}
