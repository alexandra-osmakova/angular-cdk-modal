import { InjectionToken } from "@angular/core";
import { User } from "../models/user-model.interface";

export const DIALOG_DATA = new InjectionToken<User>("DIALOG_DATA");
