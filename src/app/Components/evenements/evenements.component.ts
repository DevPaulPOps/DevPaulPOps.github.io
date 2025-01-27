import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimelineModule} from 'primeng/timeline';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {ChipModule} from 'primeng/chip';
import {MessageService} from 'primeng/api';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {Evenements} from "../../models/evenements";
import {EvenementService} from "../../Services/evenements/evenement.service";
import {finalize} from 'rxjs/operators';
import {trigger, transition, style, animate} from '@angular/animations';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrl: './evenements.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    TimelineModule,
    CardModule,
    ButtonModule,
    RippleModule,
    ChipModule,
    ProgressSpinnerModule,
  ],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-15px)'}),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({opacity: 1, transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        style({opacity: 1, transform: 'translateY(0)'}),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({opacity: 0, transform: 'translateY(-15px)'}))
      ])
    ])
  ]
})
export class EvenementsComponent implements OnInit {
  evenements: Evenements[] = [];
  loading: boolean = true;
  currentEvent: Evenements | null = null;

  constructor(
    private evenementsService: EvenementService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.loadEvenements();
  }

  private loadEvenements(): void {
    this.loading = true;
    this.evenementsService.getAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.evenements = data
            .map(event => ({
              ...event,
              showSkills: false,
              dateDebut: this.formatDate(event.dateDebut),
              dateFin: this.formatDate(event.dateFin)
            }))
            .sort((a, b) => this.compareDates(b.dateDebut, a.dateDebut));
        },
        error: (error) => {
          console.error('Erreur lors du chargement des événements:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Impossible de charger le parcours. Veuillez réessayer.'
          });
        }
      });
  }

  toggleSkills(event: Evenements): void {
    // Ferme les autres événements ouverts
    this.evenements.forEach(e => {
      if (e !== event && e.showSkills) {
        e.showSkills = false;
      }
    });
    event.showSkills = !event.showSkills;
  }

  getEventStatus(event: Evenements): string {
    if (event.dateFin.toLowerCase().includes('actuellement')) {
      return 'En cours';
    }
    return 'Terminé';
  }

  getEventIcon(event: Evenements): string {
    if (event.nom.toLowerCase().includes('apprentissage')) {
      return 'pi pi-briefcase';
    }
    return 'pi pi-book';
  }

  private formatDate(date: string): string {
    // Ajouter une logique de formatage de date si nécessaire
    return date;
  }

  private compareDates(dateA: string, dateB: string): number {
    // Logique de comparaison des dates pour le tri
    // A adapter selon le format de vos dates
    return dateA.localeCompare(dateB);
  }

  // Méthodes utilitaires pour les chips de compétences
  getChipColor(skill: string): string {
    const skillCategories: { [key: string]: string } = {
      'DevOps': 'var(--blue-500)',
      'Cloud': 'var(--purple-500)',
      'Development': 'var(--green-500)',
      'Security': 'var(--red-500)'
    };

    // Logique pour déterminer la catégorie de la compétence
    const category = Object.keys(skillCategories).find(cat =>
      skill.toLowerCase().includes(cat.toLowerCase())
    );

    return category ? skillCategories[category] : 'var(--orange-500)';
  }
}
