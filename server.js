let PORT = process.env.PORT || 3000;

const API_KEY = "e1b0b1c78c56b9057b0fd92ba08527a4";//process.env.API_KEY;
const express = require('express');
const app = express();

const axios = require('axios');

app.use(express.json());
app.use(express.static('public'))


app.get('/api/currencies',(req, res) => {

    axios.get(`http://api.currencylayer.com/list?access_key=${API_KEY}`)
  .then( (response) => {
    res.send(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
});

app.post('/api/convert',(req, res) => {

     let from = req.body.from;
     let to = req.body.to;

     let url = `http://api.currencylayer.com/live?access_key=${API_KEY}&currencies=${from},${to}`
    console.log(url);

    axios.get(url)
        .then((response) => {
          console.log(response.data);
          res.send(response.data)

        })
  .catch(function (error) {
    console.log(error);
    res.send(error)
  });
});

app.listen(PORT, ()=>{
    console.log('! -- Server Started -- !')
});