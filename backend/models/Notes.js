const mongoose = require("mongoose");

const NotesSchema = new Schema({
    title:{
        type: string,
        required: true
    },
    description:{
        type: string,
        required: true
    },
    tag:{
        type: string,
        default: "General"
    },
    timestamp:{
        type: Date,
        default: Date.now
    },
});

module.export = mongoose.model('notes', NotesSchema)
