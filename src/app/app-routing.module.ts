import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductStoreComponent } from './pages/product-store/product-store.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
// loadChildren
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'product-store',
    component: ProductStoreComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
