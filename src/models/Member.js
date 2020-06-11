export default (sequelize, DataTypes) => {
  const Member = sequelize.define('member', {
    /** 회원 id */
    memberId: {
      field: 'member_id',
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    /** 회원 pw */
    pw: {
      field: 'pw',
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    /** 회원 권한 등급 */
    accessLevel: {
      field: 'access_level',
      type: DataTypes.INTEGER,
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
    tableName: 'member',
    timestamps: false,
  });

  Member.findMemberForLogin = (id, pw) => Member.findOne({
    where: {
      memberId: id,
      pw,
    },

    raw: true,
  });

  return Member;
};
