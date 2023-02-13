class UnauthorisedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorised';
    this.status = 401;
  }
}
module.exports = UnauthorisedError;
