import { Phone } from './phone';

export class Transferencia {
  id: number;
  name: string;
  email: string;
  phone: Phone = new Phone();
  numero: string;
  agencia: string;
  data: string;
  conta_destino: string;
  agencia_destino: string;
  valor: number;
}
