import { Phone } from './phone';

export class Transfer {
  _id: number;
  name: string;
  email: string;
  phone: Phone = new Phone();
  number: string;
  agency: string;
  date: string;
  recipient_account: string;
  recipient_agency: string;
  amount: number;
}
