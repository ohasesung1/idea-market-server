export default (sequelize, DataTypes) => {
  const Basket = sequelize.define('basket', {
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
    memberId: {
      field: 'member_id',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  },
  {
    tableName: 'basket',
    timestamps: false,
  });

  const JoinMemberAttributes = `a.idx AS idx, a.member_id AS memberId,
   a.market_idx AS marketIdx, b.title AS title, b.description AS description, b.price AS price,
   b.phone AS phone, b.name AS name, b.email AS email`;

  Basket.associate = (models) => {
    Basket.belongsTo(models.Market, {
      foreignKey: 'marketIdx',
      onDelete: 'CASCADE',
    });
  };

  Basket.getBasket = (memberId) => Basket.findAll({
    where: {
      memberId,
    },
    
    raw: true,
  });

  return Basket;
};
