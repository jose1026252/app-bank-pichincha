import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentParams } from '../interfaces/environment-params.interface';
import { environments } from '../../..//environments/environments' ;
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentParamsService {

  private environmentParams: EnvironmentParams = {} as EnvironmentParams;

  constructor(
    private readonly http: HttpClient
  ) { }

  async getEnvParams() {
    const file = environments.production ? './assets/params.json' : './assets/params.dev.json';
    return lastValueFrom(this.http.get<EnvironmentParams>(file)).then(res => {
      this.environmentParams = res;
    })
      .catch(error => {

      });
  }

  getEnvironment() {
    return this.environmentParams;
  }
}
