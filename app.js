const express = require('express')

// import deconstructed sequelize from models/index.js (because index.js is default, no need to add it afer models)
const { sequelize, User } = require('./models')

const app = express()
app.use(express.json())

// route 1: get users#index
app.get('/users', async(req, res) => {
  try {
    const users = await User.findAll()
    return res.json(users)
  } catch(err){
    console.log ("error in listing users:", err)
    return res.status(500).json({ error: "something went wrong in listing users" })
  }
})

// route2: get user#show
app.get('/users/:uuid', async(req, res) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({
      where: { uuid }
    })
    return res.json(user)
  } catch(err){
    console.log("error in finding user:", err)
    return res.status(500).json({ erro: "something went wrong in finding user"})
  }
})

// route3: users#create
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

// route4: user#delete
app.delete('/users/:uuid', async(req, res) => {
  const uuid = req.params.uuid;
  try {
    const deleted = await User.destroy({
      where: { uuid }
    });
    if (deleted) {
      console.log("user deleted")
      return res.status(204).send("user deleted")
    }
    throw new Error("user not found")
  } catch (err) {
    return res.status(500).json(err)
  }
})

// server
app.listen({ port: 3000 }, async()=> {
  console.log('server up on port 3000')
  await sequelize.authenticate()
  console.log("databse connected")
})


