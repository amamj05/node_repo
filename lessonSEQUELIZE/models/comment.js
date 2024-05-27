const Sequelize = require('sequelize');

class comment extends Sequelize.Model{
    static initiate(sequelize){comment.init({
        comment:{},
        created_at:{}  //언제 만들어졌는지
    },{});}
    static associate(db){}
}
module.exports = comment;