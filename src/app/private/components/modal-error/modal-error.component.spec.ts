import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErrorComponent } from './modal-error.component';
import { MpdalService } from '../../services/mpdal.service';

describe('ModalErrorComponent', () => {
  let component: ModalErrorComponent;
  let fixture: ComponentFixture<ModalErrorComponent>;
  let compiled: HTMLElement;
  let service: MpdalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalErrorComponent],
      providers: [
        MpdalService,
      ],
    });
    fixture = TestBed.createComponent(ModalErrorComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(MpdalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should emit false when closedModal is called', () => {
    const emitSpy = jest.spyOn(service.$modalCloseError, 'emit');
    component.closedModal();
    expect(emitSpy).toHaveBeenCalledWith(false);
  });
});
