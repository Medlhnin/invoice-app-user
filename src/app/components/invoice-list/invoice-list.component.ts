import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';


@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css'
})
export class InvoiceListComponent implements OnInit {
  invoices: any[] = [];
  errorMessage: string = '';
  selectedInvoice: any = null;
  searchTerm: string = '';
  statusFilter: string = '';
  dateFilter: string = '';
  invoiceStatuses: string[] = ['Draft','Valid', 'Sent', 'Pending', 'Overdue', 'Paid', 'partiallyPaid'];

  paymentForm = this.fb.group({
    paymentMethod: ['TRANSFER', Validators.required],
    cheque_number: [null],
    remise_number: [null],
    amount: [0, Validators.required],
    notes: ['', Validators.required],
    datePayment : ['', Validators.required]
  });

  constructor(private invoiceService: InvoiceService,
              private paymentService: PaymentService,
              private fb: FormBuilder,
              private router: Router){}

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this.invoiceService.getInvoices().subscribe({
      next: (invoices) =>{
        this.invoices = invoices;
        console.log('Factures récupérées:', invoices);
      },
      error: (err) => {
        console.error('Erreur chargement factures', err),
        this.errorMessage = "Erreur lors du chargement des factures."
      }
    });
  }

  deleteInvoice(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      this.invoiceService.deleteInvoice(id).subscribe(() => {
        this.invoices = this.invoices.filter(inv => inv.id !== id);
      });
    }
  }

  openPaymentPopup(invoice: any) {
    this.selectedInvoice = invoice;
    console.log("Facture selectionée", this.selectedInvoice);
    this.paymentForm.reset({
      paymentMethod: 'CASH',
      cheque_number: null,
      remise_number: null
    });
  }

  closePopup() {
    this.selectedInvoice = null;
  }

  submitPayment() {
    const data = {
      ...this.paymentForm.value
    };
    
    this.paymentService.payInvoice(this.selectedInvoice.id, data).subscribe({
      next: (res) => {
        this.selectedInvoice = null;
        console.log('Paiement effectué avec succès:', res);
        alert("Paiement effectué avec succès.");
        
      },
      error: (err) => {
        alert("Erreur lors de la mise à jour du paiement.");
        console.error('Erreur lors de la mise à jour du paiement:', err);

      }
    });
  }

  get filteredInvoices() {
    return this.invoices.filter(invoice => {
      
      const matchesSearch = !this.searchTerm ||
        invoice.client?.nameEnterprise?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        invoice.projectDescription?.toLowerCase().includes(this.searchTerm.toLowerCase());
  
      const matchesStatus = !this.statusFilter || invoice.invoiceStatus === this.statusFilter;
  
      const matchesDate = !this.dateFilter || 
        new Date(invoice.dateFacture).toISOString().slice(0, 10) === this.dateFilter;
  
      return matchesSearch && matchesStatus && matchesDate;
    });
  }

  validateInvoice(id: number) { 
    this.invoiceService.validateInvoice(id).subscribe({
      next: (res) => {
        console.log('Facture validée avec succès:', res);
        this.loadInvoices();
      },
      error: (err) => {
        console.error('Erreur lors de la validation de la facture:', err);
        alert("Erreur lors de la validation de la facture.");
      }
    });
  }

  editInvoice(id: number) { 
    this.router.navigate(['/edit-invoice', id]); 
  }


}
