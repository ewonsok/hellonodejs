const nodemailer = require('nodemailer');
const fs = require('fs');
const yaml = require('js-yaml');

// credentials.yml 파일을 읽어옵니다.
try {
    const fileContents = fs.readFileSync('credentials.yml', 'utf8');
    const credentials = yaml.load(fileContents);

    // transporter 생성
    let transporter = nodemailer.createTransport({
        host: credentials.mail.sender.host,
        port: 587, // SMTP 포트
        secure: false, // 보안 연결을 사용하지 않음
        auth: {
            user: credentials.mail.sender.user,
            pass: credentials.mail.sender.pass
        }
    });

    // 메일 옵션 설정
    let mailOptions = {
        from: credentials.mail.address.from,
        to: credentials.mail.address.to,
        subject: '[ERROR] Chatbot Room has no session',
        text: 'Please check and send to open chat room!'
    };

    const createMailOptions = (subject, text) => {
        return {
            from: credentials.mail.address.from,
            to: credentials.mail.address.to,
            subject: subject,
            text: text
        };
    };


    // 메일 보내기
    // transporter.sendMail(mailOptions, function(error, info) {
    //     if (error) {
    //         console.log('Error occurred:', error);
    //     } else {
    //         console.log('Email sent:', info.response);
    //     }
    // });


    module.exports = { transporter, createMailOptions };
} catch (err) {
    console.error('Error reading or parsing YAML file:', err);
}
  
