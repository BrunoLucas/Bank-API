var request = require('request');

var base_url = 'http://localhost:5000'

describe('Teste de App', function() {

        describe('GET /account', function() {
            
            it('returns status code 200', function() {
                request.get(base_url + '/api/v1/account', function(error, response, body) {
                expect(response.statusCode).toBe(200);
                });
            });
        });
});
      