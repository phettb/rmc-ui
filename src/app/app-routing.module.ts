import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { RawMatComponent } from './raw-mat/raw-mat.component'
import { AppComponent } from './app.component'
import { RawFormComponent } from './raw-form/raw-form.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },{
    path: 'detail/:id',
    component: RawMatComponent,
    title: 'Material Detail'
  }, {
    path: 'form',
    component: RawFormComponent,
    title: 'Material Form'
  }, {
    path: 'form/:id',
    component: RawFormComponent,
    title: 'Material Form'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}