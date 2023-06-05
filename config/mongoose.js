const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hospital:z2swpgr4Ken6sdGz@cluster1.c3wrh.mongodb.net/hospitalApi?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Database Connected !!!");
});

module.exports= db;