import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { PaymentMethodPipe } from '../../pipes/PaymentMethodPipe';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, PaymentMethodPipe],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {
  payments: any[] = [];
  searchTerm: string = '';
  paymentMethodFilter: string = '';
  dateFilter: string = '';
  errorMessage: string = '';

  paymentMethods: string[] = ['CASH', 'TRANSFER', 'CHEQUE', 'EXCHANGE'];

  constructor(private fb: FormBuilder, private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getPayments().subscribe({
      next: (payments:any) => {
        this.payments = payments;
        console.log('Paiements récupérés:', payments);
      },
      error: (err) => {
        console.error('Erreur chargement paiements', err);
        this.errorMessage = "Erreur lors du chargement des paiements.";
      }
    });
  }

  get filteredPayments() {
    return this.payments.filter(payment => {

      const matchesSearch = !this.searchTerm ||
        payment.invoice?.client?.nameEnterprise?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        payment.notes?.toLowerCase().includes(this.searchTerm.toLowerCase());
  
      const matchesStatus = !this.paymentMethodFilter || payment.paymentMethod === this.paymentMethodFilter;
  
      const matchesDate = !this.dateFilter || 
        new Date(payment.dateFacture).toISOString().slice(0, 10) === this.dateFilter;
  
      return matchesSearch && matchesStatus && matchesDate;
    });
  }

  deletePayment(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')) {
      this.paymentService.deletePayment(id).subscribe(() => {
        this.payments = this.payments.filter(payment => payment.id !== id);
      });
    }
  }

  editPayment(id: number): void {
    alert('Fonctionnalité de modification en cours de développement.');
  }

}
