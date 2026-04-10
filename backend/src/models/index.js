"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const db = {};

let sequelize; // 👈 singleton

const getSequelize = () => {
  console.log("DB URL exists:", !!process.env.DATABASE_URL);
  console.log("DB URL length:", process.env.DATABASE_URL?.length);
  console.log("Debug")
  if (!sequelize) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
      pool: {
        max: 2, // 🔥 clave en Lambda
        min: 0,
        idle: 10000,
        acquire: 30000,
      },
    });
  }

  return sequelize;
};

const sequelizeInstance = getSequelize();

// cargar modelos dinámicamente
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelizeInstance,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

// asociaciones
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

module.exports = db;
