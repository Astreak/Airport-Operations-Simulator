import mongoose from "mongoose";
type experience = 'New' | 'Decent' | 'Profound';
const Schema = mongoose.Schema;
var driverInfo = new Schema({
    "id": {
        type: String,
        required: false,
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
    "experience": {
        type: String,
        unique:false
    },
    "userRating": {
        type: String,
        unique: false

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
const storeSchema = mongoose.model("NewSch",driverInfo);
export default storeSchema;