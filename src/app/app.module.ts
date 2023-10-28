import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RawMaterialServiceService } from './raw-material-service.service';
import { RawMatComponent } from './raw-mat/raw-mat.component';
import { RawFormComponent } from './raw-form/raw-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RawMatComponent,
    RawFormComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,AppRoutingModule,FormsModule
  ],
  providers: [RawMaterialServiceService],
  bootstrap: [AppComponent,HomeComponent]
})
export class AppModule { }
