
var nodemailer = require('nodemailer');
var crypt = require('../crypt');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'minibankstonepagamentos@gmail.com',
      pass: crypt.decrypt('1278b8c43ce78d6491a098')
    }
  });

var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Comprovante de transferencia',
    html: '<html></html>'
  };

exports.sendMail = (dadosMovimentacao)=>{

    return new Promise((resolve, reject)=>{
        mailOptions.from = 'minibankstonepagamentos@gmail.com';
        mailOptions.to = dadosMovimentacao.email_comprovante;
        mailOptions.subject = `Comprovante de transferência - ${dadosMovimentacao.data_movimentacao}`;
        const conteudo = `<html>
                <body></body>
                <h2>Comprovante de transferência - ${dadosMovimentacao.data_movimentacao}</h2>
                <div>Conta remetente:</div>
                <div>${dadosMovimentacao.numero_conta_remetente}</div>
                <div>Agência remetente:</div>
                <div>${dadosMovimentacao.agencia_remetente}</div>
                <div>Conta destinatário:</div>
                <div>${dadosMovimentacao.numero_conta_destinatario}</div>
                <div>Agência destinatário:</div>
                <div>${dadosMovimentacao.agencia_destinatario}</div>
                <div>Valor:</div>
                <div>${dadosMovimentacao.valor_movimentacao}</div>
         </html>
        `;
        mailOptions.html = conteudo;
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                reject(error);
            }else{
                console.log(info.response);
                resolve(info.response);
            }
        });
    });
   

}

