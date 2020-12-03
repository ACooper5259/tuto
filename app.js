const express = require('express')

// import deconstructed sequelize from models/index.js (because index.js is default, no need to add it afer models)
const { sequelize, User } = require('./models')

const app = express()
app.use(express.json())

app.post('/users', async(req, res) => {
  const { name, email, role } = req.body

  try{
    const user = await User.create({name, email, role})

    return res.json(user)
  }
  catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
})

app.listen({ port: 3000 }, async()=> {
  console.log('server up on port 3000')
  await sequelize.sync({force:true})
  console.log("databse synced")
})


