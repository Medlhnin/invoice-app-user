import { Component, OnInit } from '@angular/core';
import { ScheduledInvoiceService } from '../../services/scheduled-invoice.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-scheduled-invoice',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-scheduled-invoice.component.html',
  styleUrl: './list-scheduled-invoice.component.css'
})
export class ListScheduledInvoiceComponent implements OnInit {
  scheduledInvoices: any[] = [];
  errorMessage = '';
  previewInvoice: any | null = null;

  constructor(private scheduledInvoiceService: ScheduledInvoiceService) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates() {
    this.scheduledInvoiceService.getAllScheduledInvoices().subscribe({
      next: (data) => {
        console.log('Modèles de factures récupérés:', data);
        this.scheduledInvoices = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des modèles de factures:', err);
        if (err.status === 401) {
          this.errorMessage = "Vous n'êtes pas autorisé à accéder à cette ressource."
        }
      }   
    });
  }

  deleteTemplate(id: number) {
    if (confirm('Supprimer ce modèle ?')) {
      this.scheduledInvoiceService.deleteScheduledInvoice(id).subscribe({ 
        next: (res) => {
          this.scheduledInvoices = this.scheduledInvoices.filter(invoice => invoice.id !== id);
          console.log('Modèle de facture supprimé avec succès.', res);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du modèle de facture:', err);
          if (err.status === 401) {
            this.errorMessage = "Vous n'êtes pas autorisé à accéder à cette ressource."
          }
        }
    });
    }
  }

  previewTemplate(id: number) {
    this.scheduledInvoiceService.previewScheduledInvoice(id).subscribe({
      next: data => this.previewInvoice = data,
      error: () => this.errorMessage = "Erreur lors de la prévisualisation"
    });
  }

  closePreview() {
    this.previewInvoice = null;
  }

  toggleActivation(invoice: any): void {
    this.scheduledInvoiceService.toggleScheduledInvoiceActivation(invoice.id, invoice.active).subscribe({
      next: (res) => {
        invoice.active = !invoice.active;
        console.log('État du modèle de facture mis à jour avec succès:', res);
      },
      error: (err) => {
        this.errorMessage = "Erreur lors de la mise à jour de l'état du modèle.";
        console.error(err);
      }
    });
  }
  

}
