const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        comment: "id"
      },
      title: {
        type: Sequelize.STRING(40),
        comment: "title",
      },
      content: {
        type: Sequelize.TEXT,
        comment: "post",
      },
      writer_ip: {
        type: Sequelize.STRING(40),
        comment: "writer_ip",
      },
    }, {
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",
      underscored: false,
      modelName: "Post",
      tableName: "posts",
      timestamps: true,
      paranoid: true,
    });
  }
  static associate(db){
    
  }
};