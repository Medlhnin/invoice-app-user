import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,
      CommonModule, FontAwesomeModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInForm: FormGroup;
  faUser = faUser;
  faLock = faLock;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.authService.login(this.signInForm.value).subscribe(
        response => {
          console.log('Login successful!', response);
          this.authService.setAuthToken(response.token);
          this.router.navigate(['/invoices']);
          this.successMessage = 'Login successful! Redirecting...';
          setTimeout(() => {
            this.successMessage = ''; 
          }, 5000);
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid username or password. Please try again.';
        }
      );
    }
  }
}
