/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';

import { AuthService } from '@abp/ng.core';
import { OAuthService } from 'angular-oauth2-oidc'
import { NbMenuService} from '@nebular/theme';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private seoService: SeoService,private authService: AuthService,
    private oAuthService: OAuthService, private menuService : NbMenuService) {
  }

  ngOnInit(): void {
    this.checkLogin();
    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }

  checkLogin(): void{
    if(!this.oAuthService.hasValidAccessToken()){
      console.log(1);
      this.authService.navigateToLogin();
    }

  }
  onContecxtItemSelection(title) {
    if(title == 'Log out')
      this.authService.logout();
      this.authService.navigateToLogin();
  }
}
