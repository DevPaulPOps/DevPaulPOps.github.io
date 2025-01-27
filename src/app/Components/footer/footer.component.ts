import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {RippleModule} from 'primeng/ripple';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule,
    RippleModule
  ]
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
  readonly email = 'perigault.paul@gmail.com';

  socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/DevPaulPOps',
      icon: 'pi pi-github',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/paulperigault',
      icon: 'pi pi-linkedin',
    }
  ];

  constructor(private messageService: MessageService) {
  }

  copyEmail(): void {
    navigator.clipboard.writeText(this.email).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Email copié',
        detail: 'L\'adresse a été copiée dans le presse-papier'
      });
    });
  }

  openLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
