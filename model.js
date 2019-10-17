let Sequelize = require('sequelize'),
    sequelize = new Sequelize('rollcall', null, null, {
        define: {
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            }
        },
       // logging: false,
        host: 'localhost',
        dialect: 'sqlite',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        // SQLite only
        storage: './rollcall.sqlite',
        // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
        operatorsAliases: false
    });

const studentId = sequelize.define('studentId', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        no:{
            type: Sequelize.STRING
        }
});

let models = {
    orm: sequelize,
    studentId: studentId
};

exports.models = models;