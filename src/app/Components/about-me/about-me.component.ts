import {Component, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import {TagModule} from 'primeng/tag';
import {DialogModule} from 'primeng/dialog';
import {RippleModule} from 'primeng/ripple';
import {TooltipModule} from 'primeng/tooltip';
import {MessageService} from 'primeng/api';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

interface ProfileInfo {
  icon: string;
  label: string;
  value: string;
  tooltip?: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  class: string;
  tooltip?: string;
}

interface ExpertiseItem {
  icon: string;
  title: string;
  description: string;
  skills: string[];
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
}

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    AvatarModule,
    TagModule,
    DialogModule,
    RippleModule,
    TooltipModule,
    ProgressSpinnerModule
  ]
})
export class AboutMeComponent implements OnInit, OnDestroy {
  // Propriétés readonly
  profileImage = '/image/Photo.jpg';
  readonly cvUrl = 'https://raw.githubusercontent.com/DevPaulPOps/cv-latex/main/out/main.pdf';
  readonly email = 'contact@paulperigault.tech';
  readonly defaultAvatar = '/assets/default-avatar.png';

  // États du composant
  isLoading = true;
  isDownloading = false;
  showContactDialog = false;
  imageError = false;

  // Contenu dynamique
  bioContent = `
    <span class="highlight">Apprenti Ingénieur DevOps et Cloud</span> passionné par
    l'automatisation et les technologies cloud. Actuellement en formation à
    <strong>l'ESIEA</strong> et en apprentissage chez <strong>WeVii</strong>.
  `;

  profileInfo: ProfileInfo[] = [
    {
      icon: 'pi pi-briefcase',
      label: 'Poste',
      value: 'DevOps Engineer',
      tooltip: 'Apprenti Ingénieur DevOps'
    },
    {
      icon: 'pi pi-building',
      label: 'Entreprise',
      value: 'WeVii',
      tooltip: 'En alternance'
    },
    {
      icon: 'pi pi-map-marker',
      label: 'Localisation',
      value: 'Paris, France',
      tooltip: 'Île-de-France'
    }
  ];

  socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/paul-perigault/',
      icon: 'pi pi-linkedin',
      class: 'linkedin',
      tooltip: 'Voir mon profil professionnel'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/DevPaulPOps',
      icon: 'pi pi-github',
      class: 'github',
      tooltip: 'Découvrir mes projets'
    }
  ];

  expertiseItems: ExpertiseItem[] = [
    {
      icon: 'pi pi-server',
      title: 'DevOps',
      description: 'CI/CD, Docker, Kubernetes',
      skills: ['Jenkins', 'GitLab CI', 'Docker', 'Kubernetes', 'Terraform'],
      level: 'Avancé'
    },
    {
      icon: 'pi pi-cloud',
      title: 'Cloud',
      description: 'AWS, GCP, Azure',
      skills: ['AWS', 'GCP', 'Azure', 'Cloud Native'],
      level: 'Intermédiaire'
    },
    {
      icon: 'pi pi-code',
      title: 'Development',
      description: 'Full Stack Development',
      skills: ['Angular', 'Node.js', 'Python', 'Go'],
      level: 'Avancé'
    }
  ];

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initializeComponents();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  // Gestion de l'image de profil
  handleImageError(event: any): void {
    this.imageError = true;
    this.profileImage = this.defaultAvatar;
    this.messageService.add({
      severity: 'warn',
      summary: 'Image non chargée',
      detail: 'L\'image de profil n\'a pas pu être chargée'
    });
  }

  // Actions
  async downloadCV(): Promise<void> {
    try {
      this.isDownloading = true;
      const response = await fetch(this.cvUrl);
      if (!response.ok) throw new Error('Erreur lors du téléchargement');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CV_Paul_Perigault.pdf';
      link.click();
      window.URL.revokeObjectURL(url);

      this.messageService.add({
        severity: 'success',
        summary: 'Téléchargement réussi',
        detail: 'Le CV a été téléchargé avec succès'
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de télécharger le CV'
      });
    } finally {
      this.isDownloading = false;
    }
  }

  openContactDialog(): void {
    this.showContactDialog = true;
  }

  closeContactDialog(): void {
    this.showContactDialog = false;
  }

  private initializeComponents(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
