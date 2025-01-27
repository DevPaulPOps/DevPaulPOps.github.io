import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CardModule} from 'primeng/card';
import {ProgressBarModule} from "primeng/progressbar";
import {SkeletonModule} from "primeng/skeleton";
import {TagModule} from 'primeng/tag';
import {RippleModule} from 'primeng/ripple';
import {MessageService} from 'primeng/api';
import {Domaines} from "../../models/domaines";
import {DomainesService} from "../../Services/domaines/domaines.service";
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrl: './competence.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TagModule,
    RippleModule,
    SkeletonModule,
    ProgressBarModule
  ]
})
export class CompetenceComponent implements OnInit {
  domaines: Domaines[] = [];
  loading: boolean = true;

  // Map pour stocker les progrès de chaque domaine
  private domainProgressMap: Map<string, number> = new Map();

  constructor(
    private domainesService: DomainesService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.domainesService.getAll()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (data: Domaines[]) => {
          this.domaines = Object.values(data);
          this.initializeDomainProgress();
        },
        error: (error) => {
          console.error('Erreur lors du chargement des domaines :', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Impossible de charger les compétences. Veuillez réessayer.'
          });
        }
      });
  }

  /**
   * Initialise les valeurs de progression pour chaque domaine
   */
  private initializeDomainProgress(): void {
    this.domaines.forEach(domaine => {
      // La progression est calculée en fonction du nombre de compétences
      const progressValue = Math.min(
        (domaine.competences.length / 10) * 100, // 10 est le nombre max de compétences pour 100%
        100
      );
      this.domainProgressMap.set(domaine.nom, progressValue);
    });
  }

  /**
   * Retourne la valeur de progression pour un domaine donné
   */
  getDomainProgress(domaine: Domaines): number {
    return this.domainProgressMap.get(domaine.nom) || 0;
  }
}
