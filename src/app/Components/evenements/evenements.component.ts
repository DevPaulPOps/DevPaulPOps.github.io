import {Component, OnInit} from '@angular/core';
import {Evenements} from "../../models/evenements";
import {EvenementService} from "../../Services/evenements/evenement.service";

@Component({
    selector: 'app-evenements',
    templateUrl: './evenements.component.html',
    styleUrl: './evenements.component.css',
    standalone: false
})
export class EvenementsComponent implements OnInit {
  evenements: Evenements[] = [];
  showSkills = false;


  constructor(private evenementsService: EvenementService) {
  }

  ngOnInit() {
    this.evenementsService.getEvenements().subscribe((data: Evenements[]) => {
      this.evenements = data;
    })
  };

  toggleSkills(event: Evenements) {
    event.showSkills = !event.showSkills;
  }
}
