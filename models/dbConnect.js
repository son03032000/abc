const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://son03032000:03032000@cluster0.rhe01.mongodb.net/k14?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

module.exports = mongoose;

// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/k14db1", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });

// module.exports = mongoose;

