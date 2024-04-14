const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', function (req, res) {
    res.send('Hello World')
  });

app.get('/dog',(req,res)=> {
    res.json({'sound':'멍멍'})
});

app.get('/sound/:name',(req,res)=> {
  const { name } = req.params;
  if (name == 'dog') {
    res.json({'sound':'멍멍'})
  } else if (name == 'cat') {
    res.json({'sound':'야옹'})
  } else
  { res.json({'sound':'몰라'}) }
  
});

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
