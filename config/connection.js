const { connect, connection } = require('mongoose');

connect('mongodb://localhost/<name of database>', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
