class UnauthorisedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unuthorised';
    this.status = 401;
  }
}

module.exports = UnauthorisedError;
