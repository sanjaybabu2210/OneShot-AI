var mongoose=require("mongoose");


var studentSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    batchYR: Number,
    collegeId: String,
   
    skills:{
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("students",studentSchema);

