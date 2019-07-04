import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthComponent } from './auth/auth.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ContactComponent } from './user/contact.component';
import { UserComponent } from './admin/user.component';
import { NavComponent } from './navigation/nav.component';

import { UserService } from './services/users.service';
import { ContactService } from './services/contacts.service';

import { SearchPipe } from './admin/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ContactComponent,
    UserComponent,
    NavComponent,
    NotfoundComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService,
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
