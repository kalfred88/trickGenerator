import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent, SafePipe } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { ContactComponent } from './contact/contact.component';
import { ApiComponent } from './api/api.component';
import { HomeComponent } from './home/home.component';
import { TrickApiService } from './trick-api.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    ProfileComponent,
    KnowledgeComponent,
    ContactComponent,
    ApiComponent,
    HomeComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TrickApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
