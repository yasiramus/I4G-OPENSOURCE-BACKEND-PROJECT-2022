import mongoose from ("mongoose");

import bcrypt from ("bcrypt");

const { Schema } = mongoose;

// user schema model 
const userSchema = new Schema({

    name: {
        
        type: String,

        required: true,

        trim:true,

        minlength: [15, "name character schould be above 10."],
        
        maxlength: [40, "name character schould be below 50."]
        
    },

   email: {
        
        type: String,

        required: true,

        uniquie: true,
            
        lowercase:true,

        trim:true
        
    },

    password: {
        
        type: String,

        required: true,

        trim:true,

        minlength: [5, 'password should be above 5 characters.'],
        
    }

});

// hashing of password before it get save into the database
userSchema.pre("save", async (next) => {
    
    if (this.password.length > 50) next();
        
    // generate salt 
    const generateSalt = await bcrypt.genSalt();
    
    // hash password 
    this.password = await bcrypt.hash(this.password, generateSalt)
    
});

// exportation of user model 
module.exports.User = mongoose.Model("User", userSchema);