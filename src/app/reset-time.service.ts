import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ResetTimeService {

  constructor() { }

  public static resetTimeToZero(date) {
    return moment(date).set(`hour`, 0).set('minute', 0).set(`second`, 0).set(`millisecond`, 0);
  }
}
