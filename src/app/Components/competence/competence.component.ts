import { Component, OnInit } from "@angular/core";
import { Domaines } from "../../models/domaines";
import { DomainesService } from "../../Services/domaines/domaines.service";

@Component({
    selector: 'app-competence',
    templateUrl: './competence.component.html',
    styleUrls: ['./competence.component.css'],
    standalone: false
})
export class CompetenceComponent implements OnInit {
  domaines: Domaines[] = [];

  constructor(private domainesService: DomainesService) { }

  ngOnInit() {
    this.domainesService.getDomaines().subscribe(
      (data: Domaines[]) => {
        this.domaines = Object.values(data);
      },
      (error) => {
        console.error('Erreur lors du chargement des domaines : ', error);
      }
    );
  }
}
