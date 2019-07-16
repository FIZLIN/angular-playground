import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { reducers, metaReducers } from './+store/reducers';
import { RouterEffects } from './+store/effects/router';
import { AppRouterStateSerializer } from './+store/router-state-serializer';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(),
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: AppRouterStateSerializer
    }
  ],
})
export class AppModule { }
