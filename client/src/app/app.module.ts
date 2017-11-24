import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TransferService } from './transfers/transfer.service';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { routing } from './app.routing';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { SigninComponent } from './signin/signin.component';
import { AccountService } from './account/account.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedModule,
    routing
  ],
  providers: [
    AuthGuard,
    AuthService,
    TransferService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
