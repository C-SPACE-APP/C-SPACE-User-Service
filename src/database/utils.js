const mongoose = require('mongoose')

class DBUtils {

    async validID(id) {
        try { 
            const validID = mongoose.Types.ObjectId(id)
            return validID
        } catch(err) {
            return false
        }
    }
    
}

module.exports = DBUtils