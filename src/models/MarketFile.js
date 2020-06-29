export default (sequelize, DataTypes) => {
  const MarketFile = sequelize.define('market_file', {
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
    type: {
      field: 'type',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    /* 파일 업로드 이름 */
    uploadName: {
      field: 'upload_name',
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'market_file',
    timestamps: false,
  });

  const attributes = [
    'originalName', 'uploadName', 'type',
  ];

  MarketFile.associate = (models) => {
    MarketFile.belongsTo(models.Market, {
      foreignKey: 'marketIdx',
      onDelete: 'CASCADE',
    });
  };

  MarketFile.getFilebyId = (idx) => MarketFile.findAll({
    attributes,
    where: {
      marketIdx: idx,
    },
    raw: true,
  });

  MarketFile.removeFileById = (idx) => MarketFile.destroy({
    where: {
      marketIdx: idx,
    },
  });

  MarketFile.getFiles = (idx) => MarketFile.findAll({
    where: {
      marketIdx: idx,
    },

    raw: true,
  });

  return MarketFile;
};
