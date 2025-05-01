import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScheduledInvoiceService } from '../../services/scheduled-invoice.service';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-create-scheduled-invoice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-scheduled-invoice.component.html',
  styleUrl: './create-scheduled-invoice.component.css'
})
export class CreateScheduledInvoiceComponent implements OnInit {
  form: FormGroup;
  clients: any[] = []; 
  success = '';
  error = '';
  editMode = false;
  templateId: number | null = null;

  constructor(private fb: FormBuilder,
              private scheduledInvoiceService: ScheduledInvoiceService,
              private route: ActivatedRoute,
              private clientService: ClientService) {

    this.form = this.fb.group({
      publicId: ['', Validators.required],
      projectDescription: ['', Validators.required],
      amount: ['', Validators.required],
      tva: ['', Validators.required],
      fees_disbursements: [0],
      deposit: [0],
      frequency: ['', Validators.required],
      delaiEnJours: [30, Validators.required]
    });
  }

  ngOnInit(): void {

    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients.map(client => ({ name: client.nameEnterprise, publicId: client.publicId }));
    });

    this.templateId = this.route.snapshot.params['id'];
    
    if (this.templateId) {
      this.editMode = true;
      this.scheduledInvoiceService.getScheduledInvoiceById(this.templateId).subscribe({
        next: (template) => {
          this.form.patchValue(template);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du modèle de facture:', err);
          this.error = 'Erreur lors de la récupération du modèle de facture.';
        }
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.editMode && this.templateId !== null) {
        this.scheduledInvoiceService.updateScheduledInvoice(this.templateId!, this.form.value).subscribe({
          next: (res) => {
            this.success = 'Modèle de facture mis à jour avec succès.';
            console.log('Modèle de facture mis à jour avec succès:', res);
          },
          error: (err) => {
            this.error = 'Une erreur est survenue.';
            console.error('Erreur lors de la mise à jour du modèle de facture:', err);
          }
        });
      } 
      else {
        this.scheduledInvoiceService.createScheduledInvoice(this.form.value).subscribe({
          next: (res) => {
            this.success = 'Modèle de facture créé avec succès.';
            console.log('Modèle de facture créé avec succès:', res);
            this.form.reset();
          },
          error: (err) => {
            this.error = 'Une erreur est survenue.';
            console.error('Erreur lors de la création du modèle de facture:', err);
          }
        });
      }
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
  
  isValid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && (control.valid ?? false) && (control.dirty || control.touched);
  }
}
