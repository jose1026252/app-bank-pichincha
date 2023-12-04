import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { EnvironmentParamsService } from './private/services/environment-params.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES, {onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'}),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (env: EnvironmentParamsService) => () => env.getEnvParams(),
      deps: [EnvironmentParamsService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
