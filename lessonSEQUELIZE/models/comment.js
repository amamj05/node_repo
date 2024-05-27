const Sequelize = require('sequelize');
// const { FOREIGNKEYS } = require('sequelize/lib/query-types');

class comment extends Sequelize.Model {
    static initiate(sequelize) {
        comment.init({
            comment: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            created_at: {type: Sequelize.DATE,
                allowNull: true,
                defaultValue:Sequelize.Now}  //언제 만들어졌는지
        }, {// 옵션
            sequelize,
            timestamps: false,
            modelName: 'comment',  //단수형
            tableName: 'comments',  //복수형 
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
    static associate(db) {
        db.comment.belongsTo(db.User,
            {
                foreignKey: 'commenter',
                targetKey: 'id'
            })
    }
}
module.exports = comment;