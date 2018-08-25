import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
// import { ROUTE_PATHS } from './route-paths';

const ROUTES: Routes = [
    {
        path: '',
        component: AppComponent,
        // anActivate: [InternalGuardService],
        children: [
            {
                path: '',
                loadChildren: './modules/home/home.module#HomeModule'
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, { useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
