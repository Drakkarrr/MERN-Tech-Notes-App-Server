import mongoose from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    title: {
        type: String,
        required: true
    },
    text: [{
        type: String,
        required: true
    }],
    completed: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'tickerNums',
    start_seq: 500,
});

const Note = mongoose.model("Note", noteSchema);
export default Note;