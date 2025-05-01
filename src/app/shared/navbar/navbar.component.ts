import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService) {}


  logout() {
    if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
