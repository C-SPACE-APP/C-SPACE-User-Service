const { User } = require('../models')

class UserRepository {
    /** */
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

    /** */
    async DeleteUser(id) {
        try {
            const user = await User.deleteOne({ _id: id })
            return user
        } catch(err) {
            console.log(`Error in UserRepository: DeleteUser: ${err}`)
            throw err
        }
    }

    /** */
    async EditUser(id, details) {
        try{
            let user = await User.findOne({_id:id})
            console.log(user)

            if(!user) return user

            for(const key in details) {
                user[key] = details[key]
            }

            user = await user.save()
           
            if(!user) throw `Error updating user ${id}`

            return user
        } catch(err) {
            console.log(`Error in UserRepository: EditUser: ${err}`)
            throw err
        }
    }

    /** */
    async FindUsers({ pattern, count, page } = {}) {
        const limit = count || 10
        const skip = page ? (page-1)*limit : 0

        try {
            const users = await User.find({
                $or: [
                    { givenName: {$regex: new RegExp(pattern), $options: 'i'} },
                    { lastName: {$regex: new RegExp(pattern), $options: 'i'} },
                    { username: {$regex: new RegExp(pattern), $options: 'i'} }
                ]
            })
            .sort({ username: 1 })
            .skip(skip)
            .limit(limit)
            .lean()

            const resultCount = await User.countDocuments({
                $or: [
                    { givenName: {$regex: new RegExp(pattern), $options: 'i'} },
                    { lastName: {$regex: new RegExp(pattern), $options: 'i'} },
                    { username: {$regex: new RegExp(pattern), $options: 'i'} }
                ]
            })
            const lastPage = Math.floor(resultCount/limit) + (resultCount%limit ? 1 : 0) || 1

            return { users, resultCount, lastPage }
        } catch(err) {
            console.log(`Error in UserRepository: FindUsers: ${err}`)
            throw err
        }
    }

    /** */
    async FindUser(id) {
        try {
            const user = await User.findOne({_id:id})
            return user
        } catch(err) {
            console.log(`Error in UserRepository: FindUser: ${err}`)
            throw err
        }
    }

    /** */
    async FindUserByGoogleId(id) {
        try {
            const user = await User.findOne({googleId:id})
            return user
        } catch(err) {
            console.log(`Error in UserRepository: FindUserByGoogleId: ${err}`)
            throw err
        }
    }

}

module.exports = UserRepository