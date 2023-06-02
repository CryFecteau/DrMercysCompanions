import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import { ProductStoreComponent } from './pages/product-store/product-store.component';
import { CartComponent } from './pages/cart/cart.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CartService } from './services/cart.service';
import { ApiDataService } from './services/api-data.service';
import { CartDisplayComponent } from './pages/product-store/cart-display/cart-display.component';
import { ProductBoxComponent } from './pages/product-store/product-box/product-box.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HomeBannerComponent } from './pages/home/home-banner/home-banner.component';
import { HomeBannerBackgroundComponent } from './pages/home/home-banner/home-banner-background/home-banner-background.component';
import { HomeStoreInfoComponent } from './pages/home/home-store-info/home-store-info.component';
import { HomeQuizInfoComponent } from './pages/home/home-quiz-info/home-quiz-info.component';
import { HomeReviewsComponent } from './pages/home/home-reviews/home-reviews.component';
import { HomeFooterComponent } from './pages/home/home-footer/home-footer.component';
import { HomeCompanyInfoComponent } from './pages/home/home-company-info/home-company-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductStoreComponent,
    CartComponent,
    NavBarComponent,
    CartDisplayComponent,
    ProductBoxComponent,
    HomeBannerComponent,
    HomeBannerBackgroundComponent,
    HomeStoreInfoComponent,
    HomeQuizInfoComponent,
    HomeReviewsComponent,
    HomeFooterComponent,
    HomeCompanyInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTreeModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [CartService, ApiDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
