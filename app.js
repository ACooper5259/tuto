const express = require('express')

// import deconstructed sequelize from models/index.js (because index.js is default, no need to add it afer models)
const { sequelize, User, Post } = require('./models')

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
      where: { uuid }, include: 'posts',
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
      return res.status(204).json("user deleted")
    }
    throw new Error("user not found")
  } catch (err) {
    return res.status(500).json(err)
  }
})

// route5: posts#create
app.post('/posts', async(req, res) => {
  const { content, userUuid } = req.body
  try {
    const user = await User.findOne({
      where: {uuid: userUuid}
    });
    const post = await Post.create({content, userId: user.id})
    return res.json(post)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

// route6: posts#index
app.get('/posts', async(req, res) => {
  try {
    const posts = await Post.findAll({include: ['user']})
    return res.json(posts)
  } catch(err){
    console.log ("error in listing posts:", err)
    return res.status(500).json({ error: "something went wrong in listing posts" })
  }
})

// server
app.listen({ port: 3000 }, async()=> {
  console.log('server up on port 3000')
  await sequelize.authenticate()
  console.log("databse connected")
})


