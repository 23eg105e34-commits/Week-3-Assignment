import exp from 'express'
export const userApp = exp.Router()
let users = []
// body parsing middleware
userApp.use(exp.json())
// GET all users
userApp.get('/users', (req, res) => {
  res.status(200).json({ message: "All users", payload: users })
})

// POST create user
userApp.post('/users', (req, res) => {
  let newUser = req.body
  users.push(newUser)
  console.log(newUser)

  res.status(200).json({ message: "user created", payload: users })
})

// PUT update user
userApp.put('/users', (req, res) => {
  let modifieduser = req.body

  let modifyusersIndex = users.findIndex(user => modifieduser.id == user.id)

  if (modifyusersIndex == -1) {
    return res.status(404).json({ message: "user not found" })
  }

  // update using splice
  users.splice(modifyusersIndex, 1, modifieduser)

  res.status(200).json({ message: "user modified", payload: modifieduser })
})

// GET user by id
userApp.get('/users/:id', (req, res) => {
  let userId = Number(req.params.id)

  let user = users.find(userObj => userObj.id === userId)

  if (!user) {
    return res.status(404).json({ message: "user not found" })
  }

  res.status(200).json({ message: "user", payload: user })
})

// DELETE user by id 
userApp.delete('/users/:id', (req, res) => {
  let userId = Number(req.params.id)

  let deleteIndex = users.findIndex(user => user.id === userId)

  if (deleteIndex == -1) {
    return res.status(404).json({ message: "user not found" })
  }

  let deletedUser = users.splice(deleteIndex, 1)
  res.status(200).json({ message: "user deleted", payload: deletedUser })
})
