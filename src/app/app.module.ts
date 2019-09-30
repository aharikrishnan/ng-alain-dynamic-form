import { NgModule, APP_INITIALIZER, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { registerLocaleData } from '@angular/common';
// import localeZh from '@angular/common/locales/zh';
// registerLocaleData(localeZh);

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonChartModule } from '@delon/chart';
import { DelonFormModule } from '@delon/form';
import { DelonAuthModule } from '@delon/auth';
import { DelonACLModule } from '@delon/acl';
import { DelonCacheModule } from '@delon/cache';
import { DelonUtilModule, LazyService } from '@delon/util';
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../../_mock';

@Injectable()
export class StartupService {
  constructor(private lazy: LazyService) { }
  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.lazy.load([
        'https://cdn.bootcss.com/ajv/6.6.1/ajv.min.js'
      ])
        .then(() => resolve(null));
    });
  }
}

export function StartupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

import { VERSION as VERSION_ALAIN } from '@delon/theme';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    NgZorroAntdModule,
    AlainThemeModule.forRoot(),
    DelonABCModule,
    DelonChartModule,
    DelonACLModule,
    DelonCacheModule,
    DelonUtilModule,
    DelonAuthModule,
    DelonFormModule.forRoot(),
    DelonMockModule.forRoot({ data: MOCKDATA }),
  ],
  providers: [
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true
    }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    setTimeout(() => {
      document.querySelector('#VERSION').innerHTML = `@delon version: ${VERSION_ALAIN.full}`;
    }, 1000);
  }
}
