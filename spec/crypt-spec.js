const crypt = require('../app/crypt');

describe('Teste de criptografia de senha', function(){

    it('Deve retornar senha criptografada', function(){
        const password = 'minibank123';
        const cryptPassword = crypt.encrypt(password);
        expect(cryptPassword).toBeDefined();
        
        const decryptPassword = crypt.decrypt(cryptPassword);
        expect(decryptPassword).toEqual(password);
    });
});