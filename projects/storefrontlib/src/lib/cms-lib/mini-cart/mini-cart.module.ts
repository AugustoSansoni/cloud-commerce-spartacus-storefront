import { MediaModule } from './../../ui/components/media/media.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MiniCartComponent } from './mini-cart.component';

import { BannerModule } from '../banner/banner.module';
import { ConfigModule, CmsModuleConfig } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BannerModule,
    MediaModule,
    ConfigModule.withConfig(<CmsModuleConfig>{
      cmsComponents: {
        MiniCartComponent: { selector: 'cx-mini-cart' }
      }
    })
  ],
  declarations: [MiniCartComponent],
  entryComponents: [MiniCartComponent],
  exports: [MiniCartComponent]
})
export class MiniCartModule {}
