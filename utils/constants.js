const OK = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const UserResult = (user) => {
  return {
    name: user.name,
    about: user.about,
    avatar: user.avatar,
    _id: user._id
  }
}

const CardResult = (card) => {
  return {
    _id: card._id,
    name: card.name,
    link: card.link,
    likes: card.likes,
    owner: card.owner,
    createdAt: card.createdAt
  }
}

module.exports = {
  OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, UserResult, CardResult
};
