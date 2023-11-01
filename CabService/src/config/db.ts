import mongoose from "mongoose";

let Schema = mongoose.Schema;
var newSchema = new Schema({
    "firstName":{
        type:String,
        required:true
    },
    "lastName":{
        type:String,
        required:true
    },
    "cabId":{
        type:String,
        unique:true
    },
    "isOccupied":{
        type:Boolean,
        required:false,
        default:false
    },
    "onRide":{
        type:Boolean,
        required:false,
        default:false
    }
},{
    timestamps:true
});
const storeSchema = mongoose.model("NewSch",newSchema);
export default storeSchema;