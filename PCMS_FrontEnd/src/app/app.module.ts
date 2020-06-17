import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IpaComponent } from './project/ipa/ipa.component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { MainnavComponent } from './mainnav/mainnav.component';
import { FontpageComponent } from './fontpage/fontpage.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
 
import { LogoutComponent } from './logout/logout.component';
import { ViwersComponent } from './Users/viwers/viwers.component';
import { PtableComponent } from './project/ptable/ptable.component';
import { IpatestComponent } from './project/ipatest/ipatest.component';
import { ProassgComponent } from './project/proassg/proassg.component';
import { DocumentComponent } from './project/document/document.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { BarchartsComponent } from './chart/barcharts/barcharts.component';
import { CollectionComponent } from './chart/collection/collection.component';

import { ChartsModule } from 'ng2-charts';
import { UserPermissionComponent } from './Users/user-permission/user-permission.component';


@NgModule({
  declarations: [
    AppComponent,
    IpaComponent,
    MainnavComponent,
    FontpageComponent,
    WelcomeComponent,
     
    LogoutComponent,
     
    ViwersComponent,
     
    PtableComponent,
    IpatestComponent,
    ProassgComponent,
    DocumentComponent,
    BarchartsComponent,
    CollectionComponent,
    UserPermissionComponent
     
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ContextMenuModule.forRoot(),
    HttpClientModule,

    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDnakA1LM4bg9UDOospurV4-FGBvuwztp4",
      authDomain: "pdms-a6a05.firebaseapp.com",
      storageBucket: "pdms-a6a05.appspot.com",
      projectId: "pdms-a6a05",
    }),
    AngularFireStorageModule,
    ChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
