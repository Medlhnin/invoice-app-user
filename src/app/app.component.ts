import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'invoice-app';
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe(status => {
      this.isLoggedIn = status;
    });
  }
}
