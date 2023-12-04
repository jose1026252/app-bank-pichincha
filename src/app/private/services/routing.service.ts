import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private readonly router: Router,
  ) { }

  routingUrlRouter(url: string) {
    this.router.navigate([url]);
  }

  routingUrlReload(url: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]).then(() => {

      });
    });
  }



}
