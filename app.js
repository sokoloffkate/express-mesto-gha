const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '63c3bd99d2de6ab7707784f9',
  };

  next();
});

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));
app.use('/', (req, res) => {
  res.status(404).send({message: 'Неаправильеый url запрос'})
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
