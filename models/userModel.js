const mongoose = require('mongoose');

// const uris = process.env.atlas;
mongoose
  .connect(
    'mongodb+srv://apurva:9919293789@cluster0.msu0a.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log('Connected…');
  })
  .catch((err) => console.log(err));

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
