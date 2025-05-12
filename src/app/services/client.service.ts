import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private BASE_URL = environment.BASE_URL+'/api/v1/client';

  constructor(private http:HttpClient) { }

  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL).pipe(
      tap((clients) => {
        console.log("clients have been fetched", clients);
      }),
      catchError(error => {
        console.error('Erreur chargement clients', error);
        return of([]);
      })
    );
  }

  createClient(client: any): Observable<any> {
    return this.http.post<any>(this.BASE_URL, client);
  }

  getClientById(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${id}`);
  }
  updateClient(id: number, client: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/${id}`, client);
  }
  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/${id}`);
  }
  
}
