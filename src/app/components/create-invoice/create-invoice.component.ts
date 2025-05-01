import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css'
})
export class CreateInvoiceComponent implements OnInit {
  invoiceForm: FormGroup;
  clients: any[] = [];
  editMode = false;
  frequencies = ['NONE', 'MINUTELY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'ANNUALLY'];
  modes = ['MANUEL', 'SCHEDULED'];
  successMessage = '';
  errorMessage = '';
  invoiceId: number | null = null;

  constructor(private fb: FormBuilder, 
    private invoiceService: InvoiceService,
    private clientService: ClientService,
    private route: ActivatedRoute) {

    this.invoiceForm = this.fb.group({
      publicId: ['', Validators.required],
      projectDescription: ['', Validators.required],
      amount: [0, Validators.required],
      tva: [0, Validators.required],
      fees_disbursements: [0],
      deposit: [0],
      expectedDateTime: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }
  
  ngOnInit() {
    this.invoiceId = this.route.snapshot.params['id'];
  
    // 1. Toujours charger la liste des clients d'abord
    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.clients = clients;
  
        // 2. Ensuite, si editMode, charger la facture et patcher
        if (this.invoiceId) {
          this.editMode = true;
          this.invoiceService.getInvoiceById(this.invoiceId).subscribe({
            next: (invoice) => {
              this.invoiceForm.patchValue(invoice);
              console.log('Facture récupérée:', invoice);
            },
            error: (err) => {
              console.error('Erreur lors de la récupération de la facture:', err);
              this.errorMessage = 'Erreur lors de la récupération de la facture.';
            }
          });
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des clients:', err);
        this.errorMessage = 'Erreur lors de la récupération des clients.';
      }
    });
  }
  

  isInvalid(controlName: string): boolean {
    const control = this.invoiceForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit() {
    if (this.editMode && this.invoiceId !== null) {
      this.invoiceService.updateClient(this.invoiceId!, this.invoiceForm.value).subscribe({
        next: (res) => {
          this.successMessage = 'La facture mis à jour avec succès.';
          console.log('Facture mis à jour avec succès:', res);
        },
        error: (err) => {
          this.errorMessage = 'Une erreur est survenue.';
          console.error('Erreur lors de la mise à jour de la facture:', err);
        }
      });
    }

    else{
      this.invoiceService.createInvoice(this.invoiceForm.value).subscribe({
        next: () => {
          this.successMessage = 'Facture créée avec succès !';
          this.invoiceForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la création.';
          console.error(err);
        },
      });
    }

  }
}
