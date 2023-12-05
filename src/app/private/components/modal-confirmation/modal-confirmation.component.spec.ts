import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmationComponent } from './modal-confirmation.component';
import { MpdalService } from '../../services/mpdal.service';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('debe emitir el valor de cierre de modal', () => {
    jest.spyOn(service.$modalClose, 'emit');
    jest.spyOn(service.$modalConfirm, 'emit');
  });
});
