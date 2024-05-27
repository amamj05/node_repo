const Sequelize = require('sequelize');

class comment extends Sequelize.Model{
    static initiate(sequelize){}
    static associate(db){}
}
module.exports = comment;