const { User } = require('../models')

class UserRepository {
    async CreateUser(userData) {

        try {
            const newUser = await new User(userData)
            const user = await newUser.save()
            return(user)
        } catch (err) {
            console.log(`Error in UserRepository: CreateUser: ${err}`)
            throw err
        }
    }

    async FindUsers(pattern) {
        try {
            const users = await User.find({
                $or: [
                    { givenName: {$regex: new RegExp(pattern), $options: 'i'} },
                    { lastName: {$regex: new RegExp(pattern), $options: 'i'} },
                    { username: {$regex: new RegExp(pattern), $options: 'i'} }
                ]
            })
            return users
        } catch(err) {
            console.log(`Error in UserRepository: FindUsers: ${err}`)
            throw err
        }
    }

    async FindUser(id) {
        try {
            const user = await User.findOne({_id:id})
            return user
        } catch(err) {
            console.log(`Error in UserRepository: FindUser: ${err}`)
            throw err
        }
    }

    async FindUserByGoogleId(id) {
        try {
            console.log(id);
            const user = await User.findOne({googleId:id})
            return user
        } catch(err) {
            console.log(`Error in UserRepository: FindUserByGoogleId: ${err}`)
            throw err
        }
    }
    
}

module.exports = UserRepository