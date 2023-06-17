const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        comment: "id"
      },
      content: {
        type: Sequelize.TEXT,
        comment: "content",
      },
      post_id: {
        type: Sequelize.STRING(40),
        comment: "post_id"
      },
      writer_ip: {
        type: Sequelize.STRING(40),
        comment:"writer_ip"
      }
    }, {
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",
      underscored: false,
      modelName: "Comment",
      tableName: "comments",
      timestamps: true,
      paranoid: true,
    });
  }
  static associate(db){
  }
};