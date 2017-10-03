import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';


@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        ServerModule,
        AppModuleShared,
        BrowserAnimationsModule
    ]
})
export class AppModule {
}
