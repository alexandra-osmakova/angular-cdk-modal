import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DialogStateService {
  public isClosed = new BehaviorSubject(false);
}
