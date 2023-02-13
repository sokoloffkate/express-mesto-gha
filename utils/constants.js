const OK = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const FORBIDDEN_ERROR = 403;
const CONFLICT_ERROR = 409;
const TOKEN_ERROR = 401;

const BAD_REQUEST_MESSAGE = 'Переданы некорректные данные';
const INTERNAL_SERVER_ERROR_MESSAGE = 'Ошибка сервера';
const NOT_FOUND_MESSAGE = 'Запрашиваемый ресурс не найден';

// eslint-disable-next-line no-useless-escape
const RegUrl = /^https?:\/\/([\w]*[^\w])+#?/;

const { JWT_SECRET = 'some-secret-key' } = process.env;

module.exports = {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN_ERROR,
  CONFLICT_ERROR,
  TOKEN_ERROR,
  BAD_REQUEST_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
  RegUrl,
  JWT_SECRET,
};
