const { UserRepository } = require('../database')
const mongoose = require('mongoose')

class UserService {

    constructor() {
        this.repository = new UserRepository()
    }

    async AddUser(userData) {
        const {
            googleId,
            email,
            givenName,
            lastName,
            username,
            password,
            batch,
            college,
            course
        } = userData

        try {
            const user = await this.repository.CreateUser({
                googleId,
                email,
                givenName,
                lastName,
                username,
                password,
                batch,
                college,
                course
            })

            return(user)
        } catch (err) {
            console.log(`Error in UserService: AddUser: ${err}`)
            throw err
        }
    }

    async GetUsers(filter) {
        const blankPattern = /\S/g

        try {
            let pattern = filter

            if(!filter || typeof filter !== 'string' || !filter.match(blankPattern)) {
                pattern = ".*"
            }

            const users = await this.repository.FindUsers(pattern)

            return(users)
        } catch(err) {
            console.log(`Error in UserService: GetUser: ${err}`)
            throw err
        }
    }

    async GetUser(id) {
        try {
            mongoose.Types.ObjectId(id)
        } catch(err) {
            throw `Invalid id '${id}'`
        }

        try {
            const user = await this.repository.FindUser(id)

            if(!user) throw `User ${id} not found`
            
            return(user)
        } catch(err) {
            throw `Error searching for User. Error: ${err}`
        }
    }

    async GetUserByGoogleId(id) {
        try {
            const user = await this.repository.FindUserByGoogleId(id)
            return(user)
        } catch(err) {
            throw `Error searching for User. Error: ${err}`
        }
    }

    async SubscribeEvents(payload){
 
        const { event, data } =  payload;
        const { userId, googleId } = data;

        switch(event){
            case 'FIND_BY_GOOGLE_ID':
                return this.GetUserByGoogleId(googleId)
            case 'ADD_USER':
                return this.AddUser(data)
            default:
                console.log(`Inside event`);
                break
        }
    }

}

module.exports = UserService