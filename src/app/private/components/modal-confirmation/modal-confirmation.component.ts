import { Component, Input, OnInit } from '@angular/core';
import { MpdalService } from '../../services/mpdal.service';
import { MessageModal } from '../../interfaces/message-modal.interface';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent implements OnInit {
  @Input() message: MessageModal = {} as MessageModal;
  public typeModalDelete: boolean = false;

  constructor(
    private readonly modalService: MpdalService
  ) {

  }
  ngOnInit(): void {
    if (this.message.type != null && this.message.type === 'R') {
      this.typeModalDelete = true;
    }

  }

  closedModal() {
    this.modalService.$modalClose.emit(false);
  }

  confirmModal() {
    this.modalService.$modalConfirm.emit(true);
  }


}
