

Aplicação para simular transferências bancárias. Para acessar o front-end da aplicação, navegar para a pasta client e executar o comando npm run start.



# Install dependencies

<pre>npm install</pre>

# Run application

<pre>npm run start</pre>

# Run tests

<pre>npm run test</pre>


# Environment

node versão v.7.0.0

npm version v.3.10.8

mongo v.2.6.10

You can run the following in browser:

http://localhost:4210<br/>
<i>Obs.: Run npm run start in client folder </i>

The back end can be found at: 

http://localhost:5000

<h5>List of endpoints provided:<h5>
<ul>
<li>GET     /api/v1/account</li>

<li>GET     /api/v1/account/:conta/agency/:agencia</li>

<li>GET     /api/v1/account</li>

<li>POST    /api/v1/login</li>

<li>GET     /api/v1/account/:numero/agency/:agencia/historic</li>

<li>GET     /api/v1/historic</li>

<li>GET     /api/v1/account/:numero/agency/:agencia/amount</li>

<li>POST    /api/v1/account/transfer</li>
</ul>

<h5>Running with memory database instead mongo</h5>
Run the command<pre> TEST=true npm run start</pre> 

<h5>Running with Docker</h5>
Run the command<pre> docker-compose up</pre>
</br>
<i>Change the file db_config.js to this url: 'mongodb://mongo/bank10'</i>

















