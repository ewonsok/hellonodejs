//axios를 이용하여 요청을 보내는 코드를 작성한다.
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


app.post('/summarize',(req,res)=> {
    // const { text } = req.body;
    const axios = require('axios');
    axios({
      method: 'post',
      url: 'https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize',
      headers: {
        'Content-Type': 'application/json',
        'X-NCP-APIGW-API-KEY-ID': 'dqujbk1ved',
        'X-NCP-APIGW-API-KEY': 'A6U0GX3lGecOBEmHfAkqx2FQig5XS03jjMqFzGGa'
      },
      data: {
        "document": {
          "title": "'하루 2000억' 판 커지는 간편송금 시장",
          "content": "간편송금 이용금액이 하루 평균 2000억원을 넘어섰다. 한국은행이 17일 발표한 '2019년 상반기중 전자지급서비스 이용 현황'에 따르면 올해 상반기 간편송금서비스 이용금액(일평균)은 지난해 하반기 대비 60.7% 증가한 2005억원으로 집계됐다. 같은 기간 이용건수(일평균)는 34.8% 늘어난 218만건이었다. 간편 송금 시장에는 선불전자지급서비스를 제공하는 전자금융업자와 금융기관 등이 참여하고 있다. 이용금액은 전자금융업자가 하루평균 1879억원, 금융기관이 126억원이었다. 한은은 카카오페이, 토스 등 간편송금 서비스를 제공하는 업체 간 경쟁이 심화되면서 이용규모가 크게 확대됐다고 분석했다. 국회 정무위원회 소속 바른미래당 유의동 의원에 따르면 카카오페이, 토스 등 선불전자지급서비스 제공업체는 지난해 마케팅 비용으로 1000억원 이상을 지출했다. 마케팅 비용 지출규모는 카카오페이가 491억원, 비바리퍼블리카(토스)가 134억원 등 순으로 많았다."
        },
        "option": {
          "language": "ko",
          "model": "news",
          "tone": 2,
          "summaryCount": 3
        }
      },
    })
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(error => {
      console.error(error);
      res.send(error);
    });
  });
  

  app.post('/extract',(req,res)=> {
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
          console.log("bodyText is empty");
          res.send("bodyText is empty");
        }
        else {
        console.log(titleText);
        res.send("body length:"+bodyText.length+"\n\n\n"+titleText+"\n\n\n"+bodyText);
        }
      })
      .catch(error => {
        console.error('Error fetching web page:', error);
      });
  });
  

  app.post('/extractandsummary',(req,res)=> {
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
