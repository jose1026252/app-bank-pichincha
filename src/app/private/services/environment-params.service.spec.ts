import { TestBed } from '@angular/core/testing';

import { EnvironmentParamsService } from './environment-params.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EnvironmentParams } from '../interfaces/environment-params.interface';

describe('EnvironmentParamsService', () => {
  let httpClientSpy: { get: jest.Mock };
  let service: EnvironmentParamsService;


  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn()
    };
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(EnvironmentParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should call params in method getEnvParams', () => {
    const paramsExpect: EnvironmentParams = {} as EnvironmentParams;

    service.getEnvParams().then(params => {
      expect(params).toEqual(paramsExpect)

    })
  })

  test('should call params in method getEnvironment', () => {
    const paramsExpect: EnvironmentParams = {} as EnvironmentParams;

    const serviceParams = service.getEnvironment()

    expect(serviceParams).toEqual(paramsExpect);
  })


});
