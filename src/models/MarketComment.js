export default (sequelize, DataTypes) => {
  const MarketComment = sequelize.define('market_comment', {
    idx: {
      field: 'idx',
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    /* foreign key - 마켓 게시물 idx */
    marketIdx: {
      field: 'market_idx',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    /* 파일 타입 */
    contents: {
      field: 'contents',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    /* 파일 업로드 이름 */
    joinDate: {
      field: 'join_date',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
    },
  },
  {
    tableName: 'market_comment',
    timestamps: false,
  });

  const attributes = [
    'originalName', 'uploadName', 'type',
  ];

  MarketComment.associate = (models) => {
    MarketComment.belongsTo(models.Market, {
      foreignKey: 'marketIdx',
      onDelete: 'CASCADE',
    });
  };

  return MarketComment;
};
