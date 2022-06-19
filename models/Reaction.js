const { Schema, Types } = require('mongoose');
const dateFormat = require("../utils/data-format");

const ReactionSchema = new Schema({
    //set id to avoid mix up with parent thought id
    reactionId: {
        // Mongoose's ObjectId data type
        type: Schema.Types.ObjectId,
        // Default value is set to a new ObjectId
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
}, {
    toJSON: {
        getters: true
    },
    id: false
});
const Reaction = model('Reaction', ReactionSchema);
module.exports = Reaction;