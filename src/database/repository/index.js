const { User } = require('../models')

class UserRepository {
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
            throw err
        }
    }

    async FindUser(id) {
        try {
            const user = await User.findOne({_id:id})
            return user
        } catch(err) {
            throw err
        }
    }
    
}

module.exports = UserRepository