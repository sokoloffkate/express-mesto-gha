const express = require('express');
const mongoose = require('mongoose');
const {
  createUser, login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/ErrorHandler');

const { NOT_FOUND } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use('/', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Неверный url запрос' });
});

app.use(errors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
