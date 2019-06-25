import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();

const salt = process.env.SALT || 5;
const SALT_ROUNDS = parseInt(salt);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.CITEXT,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: user => User.hashPassword(user),
      beforeUpdate: user => User.hashPassword(user)
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  User.hashPassword = async (user) => {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    await user.setDataValue('password', hash);
  };
  return User;
};