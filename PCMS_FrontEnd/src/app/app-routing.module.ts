import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IpaComponent } from './project/ipa/ipa.component';
import { MainnavComponent } from './mainnav/mainnav.component';
import { FontpageComponent } from './fontpage/fontpage.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ViwersComponent } from './Users/viwers/viwers.component';
import { PtableComponent } from './project/ptable/ptable.component';
import { IpatestComponent } from './project/ipatest/ipatest.component';
import { ProassgComponent } from './project/proassg/proassg.component';
import { CollectionComponent } from './chart/collection/collection.component';
import { BarchartsComponent } from './chart/barcharts/barcharts.component';
import { UserPermissionComponent } from './Users/user-permission/user-permission.component';


const routes: Routes = [
  {
    path:'',pathMatch:'full',
  component:FontpageComponent
  },
  {
    path:'mainnav',
    component:MainnavComponent,
    children:[
      {path:'',pathMatch:'full',redirectTo:'welcome'}
      ,
      {path:'welcome',
      component:WelcomeComponent
      },
      {
        path:'viwers',
        component:ViwersComponent
      },
      {
        path:'project',
        component:PtableComponent
      },
      {
        path:'proassg',
        component:ProassgComponent
      },
      {
        path:'userAssign',
        component:UserPermissionComponent
      },
      {
        path:'mtabletest/:id',
        component:IpatestComponent
      },
      {
        path:'mtable',
        component:IpaComponent
      },
      {
        path:'collection',
        component:CollectionComponent
      },
      {
        path:'barcharts/:id',
        component:BarchartsComponent

      }
      
    ]
  }
        

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
