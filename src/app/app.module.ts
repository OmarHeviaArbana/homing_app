import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducers, EffectsArray } from './app.reducers';
import { AuthModule } from './Modules/Auth/auth.module';

import { AuthInterceptorService } from './Shared/Services/auth-interceptor.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import  {MatChipsModule } from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';

import { HeaderComponent } from './Shared/Components/header/header.component';
import { FooterComponent } from './Shared/Components/footer/footer.component';
import { AnimalModule } from './Modules/Animals/animal.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserModule } from './Modules/Users/user.module';
import { SharedModule } from './Shared/shared.module';
import { ShelterModule } from './Modules/Shelters/shelter.module';
import { BreederModule } from './Modules/Breeders/breeder.module';
import { DetailBreederComponent } from './Modules/Breeders/component/detail-breeder/detail-breeder.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, DetailBreederComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    AnimalModule,
    UserModule,
    SharedModule,
    ShelterModule,
    BreederModule,
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    EffectsModule.forRoot(EffectsArray),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
