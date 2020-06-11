export default (sequelize, DataTypes) => {
  const Market = sequelize.define('market', {
    /** 회원 id */
    idx: {
      field: 'idx',
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    memberId: {
      field: 'member_id',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    category: {
      field: 'category',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    price: {
      field: 'price',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    title: {
      field: 'title',
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    description: {
      field: 'description',
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    phone: {
      field: 'phone',
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      field: 'email',
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    joinDate: {
      field: 'join_date',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
    },
  }, {
    tableName: 'market',
    timestamps: false,
  });

  Market.associate = (models) => {
    Market.belongsTo(models.Member, {
      foreignKey: 'memberId',
      onDelete: 'CASCADE',
    });
  };

  Market.getMarketList = (requestPage, limit) => Market.findAll({
    offset: requestPage,
    limit,

    raw: true,
  });

  Market.getAllMarketList = () => Market.findAll({
    raw: true,
  });

  return Market;
};
