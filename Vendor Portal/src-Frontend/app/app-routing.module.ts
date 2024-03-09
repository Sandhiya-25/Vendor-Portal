import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreditComponent } from './credit/credit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DebitComponent } from './debit/debit.component';
import { GoodsreceiptComponent } from './goodsreceipt/goodsreceipt.component';
import { InventoryComponent } from './inventory/inventory.component';

import { LoginComponent } from './login/login.component';
import { PayageComponent } from './payage/payage.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseOrdComponent } from './purchase-ord/purchase-ord.component';
import { RfQuotationComponent } from './rf-quotation/rf-quotation.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '',component: LoginComponent },
      { path: 'dashboard',component: DashboardComponent },
      { path: 'profile' , component: ProfileComponent},
      { path: 'rf-quotation',component:RfQuotationComponent},
      { path: 'purchase-ord', component:PurchaseOrdComponent},
      { path: 'goodsreceipt', component:GoodsreceiptComponent},
      { path: 'inventory', component:InventoryComponent},
      { path: 'payage' , component:PayageComponent},
      { path: 'credit',component:CreditComponent},
      { path: 'debit',component:DebitComponent}
    ]
  }
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
