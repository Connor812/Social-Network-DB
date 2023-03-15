const { Schema, model, default: mongoose } = require('mongoose');

// Reaction Schema

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => mongoose.Types.ObjectId(),
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
            get: function(createdAtVal) {
                return createdAtVal.toLocaleDateString();
            }
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    },
);

// Thoughts Schema

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            minLength: 1,
            maxLenght: 500
        },
        createdAt: {
            type: Date,
            default: Date.now,
            require: true,
            get: function(createdAtVal) {
                    return createdAtVal.toLocaleDateString();
                }
        },
        username: {
            type: String,
            require: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      }
)

// This is my virtuals getting the total amount of reactions
thoughtSchema
    .virtual('totalReactions')
    .get(function () {
        return this.reactions.length
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;