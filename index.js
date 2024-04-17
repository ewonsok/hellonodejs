const express = require('express');
const bodyParser = require('body-parser');
const { transporter, createMailOptions } = require('./mailsend');

const app = express();

// Body-parser 미들웨어를 Express 애플리케이션에 추가합니다.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

app.get('/', function (req, res) {
    res.send('Hello World')
  });


app.post('/error',(req,res)=> {
  const { resCode, room, sender, msg } = req.body;
  if (resCode == 'noSession') {
    // 메일 보내기
    let mailBody = `
    [Room] : ${room}
    [발신자] : ${sender} 

    [내용] : ${msg}
    `;
    let noSessionMailOptions = createMailOptions('[ERROR] Chatbot Room has no session', mailBody);

    transporter.sendMail(noSessionMailOptions, function(error, info) {
      if (error) {
          console.log('Error occurred:', error);
          res.send(error);
      } else {
          console.log('Email sent:', info.response);
          res.send(info.response);
      }
    });
  }
});

app.get('/sound/:name',(req,res)=> {
  const { name } = req.params;
  if (name == 'dog') {
    res.json({'sound':'멍멍'})
  } else if (name == 'cat') {
    res.json({'sound':'야옹'})
  } else if (name == '민지 블로그') {
    res.json({'sound':'m.blog.naver.com/minji894'})
  }  else if (name == '민지 인스타') {
    res.json({'sound':'www.instagram.com/iamminjikoo'})
  } else
  { res.json({'sound':'몰라'}) }
  
});


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
