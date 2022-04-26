import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SettingsService } from './services/settings.service';


const appInitializerFunction = (appSettings: SettingsService) => {
  return async () => {
    const promise = await appSettings.load();

    return () => promise;
  };
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFunction,
      deps: [SettingsService],
      multi: true
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
