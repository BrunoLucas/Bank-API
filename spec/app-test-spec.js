var request = require("request");

var base_url = "http://localhost:5000"

describe("Teste de App", function() {

        describe("GET /conta", function() {
            
            it("returns status code 200", function() {
                request.get(base_url + '/conta', function(error, response, body) {
                expect(response.statusCode).toBe(200);
                });
            });
        });
});
      