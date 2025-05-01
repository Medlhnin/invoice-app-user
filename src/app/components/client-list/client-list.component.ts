import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {
  clients: any[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  

  constructor(private clientService: ClientService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe({
      next: (data) => this.clients = data,
      error: (err) => this.errorMessage = "Erreur lors du chargement des clients."
    });
  }

  editClient(id: number) {
    this.router.navigate(['/edit-client', id]); 
  }

  deleteClient(id: number) {
    if (confirm("Confirmer la suppression de ce client ?")) {
      this.clientService.deleteClient(id).subscribe({
        next: (res) => {
          this.clients = this.clients.filter(c => c.id !== id);
          console.log("Client supprimé avec succès.", res);
        },
        error: (err) => {
          console.error("Erreur lors de la suppression du client:", err);
          this.errorMessage = "Erreur lors de la suppression du client.";
        }
      });
    }
  }

  get filteredClients() {
    return this.clients.filter(client =>
      client.nameEnterprise.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.nameContact.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.ville.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.phoneNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.mail_address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.ice.toString().includes(this.searchTerm)
    );
  }
  


}
