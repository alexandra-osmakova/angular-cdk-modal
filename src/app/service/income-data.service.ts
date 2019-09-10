import { Injectable } from "@angular/core";
import { User } from './../models/user-model.interface';

@Injectable()
export class IncomeDataService {
  userArrey: User[] = [];
}
