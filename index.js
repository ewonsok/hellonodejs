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

app.post('/news',(req,res)=> {
  const { link } = req.body;
  const axios = require('axios');
  const cheerio = require('cheerio');
  
  // 웹 페이지 다운로드 및 HTML 파싱
  axios.get(link)
    .then(response => {
      // 다운로드한 HTML을 cheerio로 로드하여 DOM으로 변환
      const $ = cheerio.load(response.data);
      
      // 기사 본문 추출
      const titleText = $('h2#title_area').text().trim();
      const bodyText = $('div#newsct_article').text().trim();

      if (bodyText.length == 0) {
        // console.log("bodyText is empty");
        res.send(null);
        return Promise.reject('Response data is null.'); // catch로 이동
      }
      else {
        console.log(titleText);
        // res.send("body length:"+bodyText.length+"\n\n\n"+titleText+"\n\n\n"+bodyText);
        return axios({
          method: 'post',
          url: 'https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize',
          headers: {
            'Content-Type': 'application/json',
            'X-NCP-APIGW-API-KEY-ID': 'dqujbk1ved',
            'X-NCP-APIGW-API-KEY': 'A6U0GX3lGecOBEmHfAkqx2FQig5XS03jjMqFzGGa'
          },
          data: {
            "document": {
              "title": titleText,
              "content": bodyText
            },
            "option": {
              "language": "ko",
              "model": "news",
              "tone": 2,
              "summaryCount": 3
            }
          },
        });
      }
    })
    .then(response => {
      console.log("news summary sent successfully");
      res.send(response.data);
    })
    .catch(error => {
      console.error(error);
    });
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
