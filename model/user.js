import mongoose from 'mongoose'

// 创建User集合规则
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20
  }
})

// 创建User集合
export const User = mongoose.model('User', UserSchema)