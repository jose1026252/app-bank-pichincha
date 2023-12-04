import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MpdalService {

  constructor() { }

  $modalClose = new EventEmitter<any>();
  $modalCloseError = new EventEmitter<any>();
  $modalConfirm = new EventEmitter<any>();
}
