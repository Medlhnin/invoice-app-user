import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css'
})
export class CreateClientComponent implements OnInit {
  clientForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  editMode = false;
  clientId: number | null = null;

  constructor(private fb: FormBuilder,
              private clientService: ClientService,
              private route: ActivatedRoute) {
          

    this.clientForm = this.fb.group({
      nameEnterprise: ['', Validators.required],
      nameContact: ['', Validators.required],
      address: ['', Validators.required],
      ville: ['', Validators.required],
      codePostal: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      mail_address: ['', [Validators.required, Validators.email]],
      ice: ['', Validators.required],
    });
  }

  ngOnInit(): void {  
    this.clientId = this.route.snapshot.params['id'];
    
    if (this.clientId) {
      this.editMode = true;
      this.clientService.getClientById(this.clientId).subscribe({
        next: (client) => {
          
          this.clientForm.patchValue(client);
          console.log('Client récupéré:', client);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du client:', err);
          this.errorMessage = 'Erreur lors de la récupération du client.';
        }
      });
    }
  }

  onSubmit(): void {
    if (this.editMode && this.clientId !== null) {
      this.clientService.updateClient(this.clientId!, this.clientForm.value).subscribe({
        next: (res) => {
          this.successMessage = 'Modèle de facture mis à jour avec succès.';
          console.log('Modèle de facture mis à jour avec succès:', res);
        },
        error: (err) => {
          this.errorMessage = 'Une erreur est survenue.';
          console.error('Erreur lors de la mise à jour du modèle de facture:', err);
        }
      });
    }
    else{
      console.log('Client à enregistrer :', this.clientForm.value);
      this.clientService.createClient(this.clientForm.value).subscribe({
        next: (response) => {
          console.log('Client créé avec succès:', response);
          this.successMessage = 'Client ajouté avec succès !';
          this.clientForm.reset();
        },
        error: (error) => {
          console.error('Erreur lors de la création du client:', error);
          this.errorMessage = 'Erreur lors de la création du client.';
          
        }
      });
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.clientForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
  
  isValid(controlName: string): boolean {
    const control = this.clientForm.get(controlName);
    return !!control && (control.valid ?? false) && (control.dirty || control.touched);
  }
  

}
