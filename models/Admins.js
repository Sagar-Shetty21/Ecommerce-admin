import {model, Schema, models} from "mongoose";

const AdminsSchema = new Schema({
    gmail: {type: String, required: true},
},{
    timestamps: true
});

export const Admins = models.Admins || model('Admins', AdminsSchema)