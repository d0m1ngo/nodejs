module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      timestamps: true
    }
  );

  Comments.associate = models => {
    Comments.belongsTo(models.Posts, {
      foreignKey: "postId",
      targetKey: "id",
      as: "post"
    });
  };

  return Comments;
};
