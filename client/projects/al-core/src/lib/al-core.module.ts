import { NgModule } from '@angular/core';
import { AlCoreComponent } from './al-core.component';

import { AlAuthService } from './al-auth/al-auth.service';

@NgModule({
  imports: [
  ],
  declarations: [AlCoreComponent],
  providers: [
    AlAuthService,
  ],
  exports: [
    AlCoreComponent
  ]
})
export class AlCoreModule { }
