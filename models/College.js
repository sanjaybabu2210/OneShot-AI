var mongoose=require("mongoose");


var collegeSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    year: Number,
    city: String,
    state: String,
    country: String,
    nofstudends: Number,
    courses:{
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("colleges",collegeSchema);

