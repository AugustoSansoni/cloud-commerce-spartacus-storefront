import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ConfigurableRoutesService } from './configurable-routes.service';
import { ConfigurableRoutesLoader } from './configurable-routes-loader';
import { ConfigModule, Config } from '../config/config.module';
import {
  ConfigurableRoutesModuleConfig,
  defaultConfigurableRoutesModuleConfig
} from './configurable-routes-module.config';
import { PathService } from './path/path.service';
import { DynamicPathService } from './path/dynamic-path.service';

export function loadRoutesConfig(loader: ConfigurableRoutesLoader) {
  const result = () => loader.loadRoutesConfig(); // workaround for AOT compilation (see https://stackoverflow.com/a/51977115)
  return result;
}

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(defaultConfigurableRoutesModuleConfig)
  ],
  declarations: [],
  exports: [],
  providers: [
    ConfigurableRoutesService,
    ConfigurableRoutesLoader,
    PathService,
    DynamicPathService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadRoutesConfig,
      deps: [ConfigurableRoutesLoader],
      multi: true
    },
    { provide: ConfigurableRoutesModuleConfig, useExisting: Config }
  ]
})
export class ConfigurableRoutesModule {}
