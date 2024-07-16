import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompetenceComponent } from './Components/competence/competence.component';
import {HttpClientModule} from "@angular/common/http";
import {DomainesService} from "./Services/domaines/domaines.service";
import { AboutMeComponent } from './Components/about-me/about-me.component';
import {EvenementsComponent} from "./Components/evenements/evenements.component";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {TimelineModule} from "primeng/timeline";
import { FooterComponent } from './Components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CompetenceComponent,
    AboutMeComponent,
    EvenementsComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CardModule,
    DividerModule,
    TimelineModule,
  ],
  providers: [DomainesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
