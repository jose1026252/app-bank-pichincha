import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmationComponent } from './modal-confirmation.component';
import { MpdalService } from '../../services/mpdal.service';
import { MessageModal } from '../../interfaces/message-modal.interface';

describe('ModalConfirmationComponent', () => {
  let component: ModalConfirmationComponent;
  let fixture: ComponentFixture<ModalConfirmationComponent>;
  let compiled: HTMLElement;
  let service: MpdalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfirmationComponent],
      providers: [
        MpdalService,
      ],
    });
    fixture = TestBed.createComponent(ModalConfirmationComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(MpdalService);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize typeModalDelete correctly based on message type', () => {
    component.message = { type: 'R' } as MessageModal;
    component.ngOnInit();
    expect(component.typeModalDelete).toBe(true);

    component.message = { type: 'S' } as MessageModal; // Simulamos un tipo diferente
    component.ngOnInit();
    expect(component.typeModalDelete).toBe(true);
  });

  it('should emit false when closedModal is called', () => {
    const emitSpy = jest.spyOn(service.$modalClose, 'emit');
    component.closedModal();
    expect(emitSpy).toHaveBeenCalledWith(false);
  });

  it('should emit true when confirmModal is called', () => {
    const emitSpy = jest.spyOn(service.$modalConfirm, 'emit');
    component.confirmModal();
    expect(emitSpy).toHaveBeenCalledWith(true);
  });
});
