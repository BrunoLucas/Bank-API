export class TransferenciasInMemoryDS {
  createDb() {
    let transferencias = [
      {
        id: 1,
        name: 'Tyrion',
        email: 'tyrion@email.com',
        phone: {
          phoneNumber: '99876-1234'
        },
        numero : 123456,
        agencia: '1234',
        data: '10/10/2020',
        conta_destino: 2345,
        agencia_destino: '1235',
        valor: 230.00
      },
      {
        id: 2,
        name: 'Gandalf',
        email: 'gandalf@email.com',
        phone: {
          phoneNumber: '98887-6789'
        },
        numero : 123456,
        agencia: '1234',
        data: '12/10/2020',
        conta_destino: 6565,
        agencia_destino: '3825',
        valor: 130.00
      }
    ];
    return { transferencias };
  }
}
