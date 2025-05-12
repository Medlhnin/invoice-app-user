import { Routes } from '@angular/router';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { CreateScheduledInvoiceComponent } from './components/create-scheduled-invoice/create-scheduled-invoice.component';
import { ListScheduledInvoiceComponent } from './components/list-scheduled-invoice/list-scheduled-invoice.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { PublicGuard } from './shared/guards/public.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserComponent } from './components/user/user.component';
import { PaymentsComponent } from './components/payments/payments.component';

export const routes: Routes = [
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    { path: 'create-invoice', component: CreateInvoiceComponent, canActivate: [AuthGuard]},
    { path: 'invoices', component: InvoiceListComponent, canActivate: [AuthGuard]},
    { path: 'clients', component: ClientListComponent, canActivate: [AuthGuard]},
    { path: 'create-client', component: CreateClientComponent, canActivate: [AuthGuard] },
    { path: 'edit-client/:id', component: CreateClientComponent, canActivate: [AuthGuard] },
    { path: 'scheduled-templates', component: ListScheduledInvoiceComponent, canActivate: [AuthGuard] },
    { path: 'create-template', component: CreateScheduledInvoiceComponent, canActivate: [AuthGuard] },
    { path: 'edit-template/:id', component: CreateScheduledInvoiceComponent, canActivate: [AuthGuard] },
    { path: 'sign-in', component: SignInComponent, canActivate: [PublicGuard] },
    { path: 'settings', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'edit-invoice/:id', component: CreateInvoiceComponent, canActivate: [AuthGuard] },
    { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'sign-in' }

];
