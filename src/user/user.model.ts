import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    login: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    active: { type: Boolean },
});

UserSchema.pre('save', function(next){

    let user = this;

    if(!user.isModified('senha')) return next();

    bcrypt.genSalt(10, (err, salt) => {

        if(err) return next(err);

        bcrypt.hash(user.senha, salt, (err, hash) => {

            if(err) return next(err);
            user.senha = hash;
            next();

        });

    });

});

UserSchema.methods.checkPassword = function(attempt, callback){

    let user = this;

    bcrypt.compare(attempt, user.senha, (err, isMatch) => {
        if(err) return callback(err);
        callback(null, isMatch);
    });

};

export interface User {
    id: string;
    login: string;
    senha: string;
    active: boolean;
}