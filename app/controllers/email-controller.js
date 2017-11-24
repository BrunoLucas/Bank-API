
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

exports.sendMail = (transactionData)=>{

    return new Promise((resolve, reject)=>{
        mailOptions.from = 'minibankstonepagamentos@gmail.com';
        mailOptions.to = transactionData.email;
        mailOptions.subject = `Comprovante de transferência - ${transactionData.date_movement}`;
        const content = `<html>
                <body></body>
                <h2>Comprovante de transferência - ${transactionData.date_movement}</h2>
                <div>Conta remetente:</div>
                <div>${transactionData.sender_account_number}</div>
                <div>Agência remetente:</div>
                <div>${transactionData.sender_agency}</div>
                <div>Conta destinatário:</div>
                <div>${transactionData.recipient_account_number}</div>
                <div>Agência destinatário:</div>
                <div>${transactionData.recipient_agency}</div>
                <div>Valor:</div>
                <div>${transactionData.amount}</div>
         </html>
        `;
        mailOptions.html = content;
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

