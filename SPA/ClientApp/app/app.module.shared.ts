import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AddFormComponent } from './components/addform/addform.component';
import { EditGridComponent } from './components/editgrid/editgrid.Component';  
import { GridComponent } from './components/grid/grid.Component';  
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataService } from './services/todo.service'
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { CustomOption } from './components/notify/custom-option';



@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        GridComponent,
        EditGridComponent,
        AddFormComponent
    ],
    providers: [DataService, AppConfig,
        {
            provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(),
            deps: [AppConfig], multi: true
        },
        { provide: ToastOptions, useClass: CustomOption },
    ],
    imports: [
        ToastModule.forRoot(),
        CommonModule,
        HttpModule,
        NgxDatatableModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent }, 
            { path: 'grid', component: GridComponent },
            {
                path: 'editgrid', component: AddFormComponent,
                children: [
                    {
                        path: '',
                        component: EditGridComponent,
                        outlet: 'child1'
                    }
                   
                ]


            },
            { path: '**', redirectTo: 'home' }
        ])
    ],
  
})
export class AppModuleShared {

}





