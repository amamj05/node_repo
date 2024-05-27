const Sequelize = require('sequelize');
const comment = require('./comment');
const User = require('./user');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};


let sequelize = new Sequelize(config.database, config.username, config.password, config);



db.sequelize = sequelize;

db.User = User;
db.comment = comment;

User.initiate(sequelize);
comment.initiate(sequelize);

User.associate(db);
comment.associate(db);

module.exports = db;