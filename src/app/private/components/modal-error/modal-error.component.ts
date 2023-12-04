import { Component, Input } from '@angular/core';
import { MpdalService } from '../../services/mpdal.service';
import { MessageModal } from '../../interfaces/message-modal.interface';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css']
})
export class ModalErrorComponent {

  public messageModalError: string = 'Ha ocurrido un error! no pudimos procesar tu solicitud';
  public image: string = './assets/img/error.png'

  constructor(
    private readonly modalService: MpdalService
  ) {}

  closedModal() {
    this.modalService.$modalCloseError.emit(false);
  }
}
