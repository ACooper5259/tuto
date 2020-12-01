'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // create Todo class with association method
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.TodoItem, {
          foreignKey: 'todoId',
          as: 'todoItems',
        })
    }
  };

  // instantiate Todo class with filed definitions
  Todo.init({
    title: DataTypes.STRING,
    allowNull: false,
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};