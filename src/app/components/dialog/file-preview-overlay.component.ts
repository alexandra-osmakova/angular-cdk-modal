import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IncomeDataService } from "./../../service/income-data.service";
import { DialogStateService } from "../../service/dialog-state.service";
import { DIALOG_DATA } from "./../../service/dialog-data";
import { User } from "../../models/user-model.interface";

@Component({
  selector: "app-file-preview-overlay",
  templateUrl: "./file-preview-overlay.component.html",
  styleUrls: ["./file-preview-overlay.component.scss"]
})
export class FilePreviewOverlayComponent {
  form: FormGroup;
  mode = "create";

  constructor(
    private fb: FormBuilder,
    private incomeData: IncomeDataService,
    private dialogState: DialogStateService,
    @Inject(DIALOG_DATA) public user: User
  ) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.dialogState.isClosed.next(false);
    this.mode = "create";
    this.onOpen();
  }

  onOpen() {
    if (this.user) {
      this.form.controls.name.setValue(this.user.name);
      this.form.controls.password.setValue(this.user.password);
      this.mode = "eddit";
    }
  }

  get isEddit() {
    return this.mode === "eddit" ? true : false;
  }

  onAddEvent() {
    if (this.mode === "create") {
      this.incomeData.userArrey.push(this.form.value);
      this.form.reset();
      this.dialogState.isClosed.next(true);
    } else {
      for (let i = 0; i < this.incomeData.userArrey.length; i++) {
        if (
          this.incomeData.userArrey[i].name === this.user.name &&
          this.incomeData.userArrey[i].password === this.user.password
        ) {
          this.incomeData.userArrey.splice(i, 1);
          break;
        }
      }
      this.form.reset();
      this.dialogState.isClosed.next(true);
    }
  }
}
