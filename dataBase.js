import { createConnection } from 'mysql'


const db = mysql.createConnection({
   host: 'remotemysql.com',
   port: '3306',
   user: 'o8SO5VMV0e',
   database: 'o8SO5VMV0e',
   password: '2ztAV0X2oV'
})
db.connect((err) => {
   if (err) {
      console.log('error connecting: ' + err.stack)
   } else {
      console.log('connected')
   }
})

 
