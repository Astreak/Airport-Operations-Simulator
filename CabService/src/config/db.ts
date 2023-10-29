import mongoose from "mongoose";

let Schema = mongoose.Schema;
var newSchema = new Schema({
    "empId":{
        type:String,
        required:true,
        unique:true
    },
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
        type:String,
        required:false,
        default:false
    },
    "onRide":{
        type:String,
        required:false,
        default:false
    }
},{
    timestamps:true
});
const storeSchema = mongoose.model("NewSch",newSchema);
export default storeSchema;