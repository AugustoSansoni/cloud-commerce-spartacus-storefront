import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TermsConditionsLayoutModule } from './../../layout/terms-conditions-layout/terms-conditions-layout.module';
import { TermsConditionsPageComponent } from './terms-conditions-page.component';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { ConfigurableRoutes } from '@spartacus/core';

const routes: ConfigurableRoutes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'termsAndConditions', cxPath: 'termsAndConditions' },
    component: TermsConditionsPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    TermsConditionsLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TermsConditionsPageComponent],
  exports: [TermsConditionsPageComponent]
})
export class TermsConditionsPageModule {}
