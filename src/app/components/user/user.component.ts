import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  user: any | null = null;
  loading = true;
  error = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Impossible de récupérer les informations utilisateur.';
        console.log("error: ", err);
        this.loading = false;
      }
    });
  }
  

  onChangePassword() {
    // Redirection vers une page de modification
    // ou ouverture d’un formulaire
    console.log('Redirection vers changement mot de passe');
  }

  onForgotPassword() {
    this.authService.sendPasswordResetEmail(this.user?.email!).subscribe({
      next: () => alert('Email de réinitialisation envoyé.'),
      error: () => alert('Erreur lors de l’envoi de l’email.')
    });
  }

  

}
