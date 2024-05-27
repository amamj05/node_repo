const Sequelize = require('sequelize');

class User extends Sequelize.Model{
    static initiate(sequelize){User.init({
        name:{type: Sequelize.STRING(20),
            allowNull: false, //not Null
            unique: true
        },
        age:{type: Sequelize.INTEGER.UNSIGNED,
            // INTEGER 정수형 UNSIGNED 양수
            allowNull: false
        },
        comment:{type: Sequelize.TEXT,  //외래키 해야함
            allowNull: false
        },  
        created_at:{type: Sequelize.DATE,
            allowNull: false,
            defaultValue:Sequelize.Now
        }  
    },{});}
    static associate(db){}
}
module.exports = User;