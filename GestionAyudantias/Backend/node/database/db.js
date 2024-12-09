import {Sequelize} from 'sequelize'

const db = new Sequelize('mydb', 'root', 'admin',{
    host: 'localhost',
    dialect: 'mysql'
})
export default db