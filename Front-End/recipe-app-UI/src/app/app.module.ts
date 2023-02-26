import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoadingComponent } from './loading/loading.component';
import { InstructionComponent } from './instruction/instruction.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { HttpClientModule } from '@angular/common/http';
import { DailyRecipesComponent } from './daily-recipes/daily-recipes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoadingComponent,
    InstructionComponent,
    IngredientsComponent,
    DailyRecipesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgbModule,
    NgbCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
