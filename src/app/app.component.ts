import {Component} from '@angular/core';
import {ScrollTopModule} from 'primeng/scrolltop';
import {ToastModule} from 'primeng/toast';
import {AboutMeComponent} from './Components/about-me/about-me.component';
import {CompetenceComponent} from './Components/competence/competence.component';
import {EvenementsComponent} from './Components/evenements/evenements.component';
import {FooterComponent} from './Components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    ScrollTopModule,
    ToastModule,
    AboutMeComponent,
    CompetenceComponent,
    EvenementsComponent,
    FooterComponent
  ]
})
export class AppComponent {
  title = 'ePortfolio';
}
