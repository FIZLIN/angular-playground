import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { reducers } from './+store/reducers';
import { EntityEffects } from './+store/effects/entity';
import { ListEffects } from './+store/effects/list';

import { ListComponent } from './list/list.component';
import { EntityComponent } from './entity/entity.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    CoreModule,
    // BrowserAnimationsModule,
    // HttpClientModule,
    UserRoutingModule,
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature([EntityEffects, ListEffects])
  ],
  entryComponents: [EntityComponent],
  declarations: [ListComponent, EntityComponent],
})
export class UserModule { }
