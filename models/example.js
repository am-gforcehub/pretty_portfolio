module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Example;
};

module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Product;
};
