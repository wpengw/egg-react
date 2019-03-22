const uuidv1 = require('uuid/v1');

const generateUUID = () => {
  return uuidv1().replace(/-/g, '');
}

const defineModel = (app, name, attributes) => {
  const { UUID } = app.Sequelize;
  
  let attrs = {};
  for (let key in attributes) {
    let value = attributes[key];
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull && true;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: true
      };
    }
  }

  attrs.id = {
    type: UUID,
    primaryKey: true,
    defaultValue: () => {
      return generateUUID();
    }
  };

  return app.model.define(name, attrs, {
    createdAt: '',
    updatedAt: '',
    version: true,
    freezeTableName: true
  });
}

module.exports = { defineModel };