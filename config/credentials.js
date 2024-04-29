const fs = require('fs');
const yaml = require('js-yaml');

// credentials.yml 파일을 읽어옵니다.
try {
  const fileContents = fs.readFileSync('credentials.yml', 'utf8');
  const credentials = yaml.load(fileContents);

  // ID와 패스워드를 출력합니다.
  console.log('SMTP Server:', credentials.mail.sender.host);
  console.log('Username:', credentials.mail.sender.user);
  console.log('Password:', credentials.mail.sender.pass);
  console.log('From:', credentials.mail.address.from);
  console.log('To:', credentials.mail.address.to);
} catch (err) {
  console.error('Error reading or parsing YAML file:', err);
}
