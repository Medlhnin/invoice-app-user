import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private BASE_URL = environment.BASE_URL_LOCAL+'/api/v1/invoice';

  constructor(private http: HttpClient) {}

  createInvoice(invoice: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}`, invoice).pipe(
      tap((response) => { 
        console.log('Invoice created:', response);
      }
    )); 
  }

  getInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}`).pipe(
      tap((response) => {
        console.log('Invoices fetched:', response);
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des factures:', error);
        // Tu peux ici afficher une notification ou retourner une valeur vide
        return throwError(() => new Error('Une erreur est survenue lors du chargement des factures.'));
      })
    );
  }

  deleteInvoice(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}`).pipe(
      tap(() => {
        console.log(`Facture avec id ${id} supprimée`);
      }),
      catchError((error) => {
        console.error('Erreur lors de la suppression de la facture:', error);
        return throwError(() => new Error('Une erreur est survenue lors de la suppression de la facture.'));
      })
    );
  }

  payInvoice(id: number, paymentData: any): Observable<any> { 
    return this.http.put(`${this.BASE_URL}/${id}/payment`, paymentData);
  }

  validateInvoice(id: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}/validate`, {}).pipe(
      tap(() => {
        console.log(`Facture avec id ${id} validée`);
      }),
      catchError((error) => {
        console.error('Erreur lors de la validation de la facture:', error);
        return throwError(() => new Error('Une erreur est survenue lors de la validation de la facture.'));
      })
    );
  }
  
  editInvoice(id: number, invoice: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}`, invoice).pipe(
      tap((response) => { 
        console.log('Invoice updated:', response);
      })
    ); 
  }

  updateClient(id: number, invoice: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}`, invoice);
  }

  getInvoiceById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }

}
