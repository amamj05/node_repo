const Sequelize = require('sequelize');

class User extends Sequelize.Model{
    static initiate(sequelize){User.init({
        name:{type: Sequelize.STRING(20),
            allowNull: false, //not Null
            unique: true,
            defaultValue: '0'
        },
        age:{type: Sequelize.INTEGER.UNSIGNED,
            // INTEGER 정수형 UNSIGNED 양수
            allowNull: false,
            defaultValue: '0'
        },
        comment:{type: Sequelize.TEXT,  //외래키 해야함
            allowNull: false,
            defaultValue: '0'
        }, 
        marketing:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        created_at:{type: Sequelize.DATE,
            allowNull: false,
            defaultValue:Sequelize.NOW
        }  
    },{// 옵션
        sequelize,
        timestamps: false,
        underscored:false,
        modelName:'User',  //단수형
        tableName:'users',  //복수형 
        paranoid:false,
        charset:'utf8',
        collate:'utf8_general_ci'
    });}
    static associate(db){}
}
module.exports = User;