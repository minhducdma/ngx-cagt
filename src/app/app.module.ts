/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
    NbDatepickerModule,
    NbDialogModule,
    // NbChatModule,
    // NbDatepickerModule,
    // NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbTimepickerModule,
    NbToastrModule,
    NbWindowModule,
} from '@nebular/theme';
import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule as CoreModuleAbp } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { IdentityConfigModule } from '@abp/ng.identity/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { environment } from '../environments/environment';
import { NgxsModule } from '@ngxs/store';
import { MessageService } from '@progress/kendo-angular-l10n';
import { MessageKendoService } from './@core/services/message-kendo.service';
import * as $ from 'jquery'
import { ContextMenuModule } from 'ngx-contextmenu';


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbTimepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        // NbChatModule.forRoot({
        //   messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
        // }),
        CoreModule.forRoot(),
        ThemeModule.forRoot(),
        //NbWindowModule.forRoot(),
        CoreModuleAbp.forRoot({
            environment,
            registerLocaleFn: registerLocale(),
        }),
        AccountConfigModule.forRoot(),
        IdentityConfigModule.forRoot(),
        TenantManagementConfigModule.forRoot(),
        SettingManagementConfigModule.forRoot(),
        NgxsModule.forRoot(),
        ContextMenuModule.forRoot(),
    ],
    providers: [
        { provide: MessageService, useClass: MessageKendoService },
        { provide: LOCALE_ID, useValue: 'en-EN' },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
