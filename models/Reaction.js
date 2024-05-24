const reactionSchema = new Schema({
    // reactionId - Use Mongoose's ObjectId data type - Default value is set to a new ObjectId 
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    //reactionBody - String - Required - 280 character maximum
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    //username - String - Required
    username: {
        type: String,
        required: true,
    },
    // createdAt - Date - Set default value to the current timestamp - Use a getter method to format the timestamp on query
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  });
  
  module.exports = reactionSchema;
  