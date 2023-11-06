import mongoose from "mongoose";
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
    "isAvailable":{                           // drivers would should have a checkbox in portal to check if they are available
        type:Boolean,
        required:false,
        default:false
    },
    "onRide":{
        type:Boolean,
        required:false,
        default:false
    },
    "ride": {
        type: [String, String],
        required: false
    },
    "tripCost": {
        type: Number,
        required: false,
    },
    "currentRideId": {
        type: String,
        required:false
    }
},{
    timestamps:true
});
var rideInfo = new Schema({
    'driverId': {
        type: String,
        required: true
    },
    'customerId': {
        type: String,
        required: true
    },
    "ride": {
        type: [String, String],
        required:true
    },
    "tripCost": {
        type: Number,
        required: true
    },
    "pickup": {
        type: Boolean,
        required: false,
        default: false
    },
    "active": {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});
const cabdb = mongoose.model("DriverInfo", driverInfo);
const ridedb = mongoose.model("RiderInfo", rideInfo);
export { cabdb, ridedb };