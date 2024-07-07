import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
    }, { timestamps: false, versionKey: false }
);

userSchema.methods.toJSON = function () {
const obj = this.toObject();
delete obj.password;
return obj;
};

export const User = model('user', userSchema);
