import { TestBed } from '@angular/core/testing';

import { MpdalService } from './mpdal.service';

describe('MpdalService', () => {
  let service: MpdalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpdalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('Verify whether securities are being issued', () => {
    jest.spyOn(service.$modalClose, 'emit');
    jest.spyOn(service.$modalCloseError, 'emit');
    jest.spyOn(service.$modalConfirm, 'emit');
  });

});
