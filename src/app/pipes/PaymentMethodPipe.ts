import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentMethod',
  standalone: true
})
export class PaymentMethodPipe implements PipeTransform {
  private translations: { [key: string]: string } = {
    TRANSFER: 'Virement',
    CHEQUE: 'Chèque',
    EXCHANGE: 'Échange',
    CASH: 'Espèces'
  };

  transform(value: string): string {
    return this.translations[value] || value;
  }
}
