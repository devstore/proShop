import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

//@desc Auth user & get Token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  //Comparing entered password with db password
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.name,
      isAdmin: user.isAdmin,
      token: null,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

export { authUser }
