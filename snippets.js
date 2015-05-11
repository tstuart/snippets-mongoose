
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');

mongoose.connection.on('error', function(err) {
  console.error('Could not connect.  Error: ', err);
});

mongoose.connection.once('open', function() {
  var snippetSchema = mongoose.Schema({
    name: {type: String, unique: true},
    content: String
  });
  
  var Snippet = mongoose.model('Snippet', snippetSchema);
  
  // Create Method
  var create = function(name, content) {
    var snippet = {
      name: name,
      content: content
    };
    Snippet.create(snippet, function(err, snippet) {
      if (err || !snippet) {
        console.error("Could not create snippet", name);
        mongoose.disconnect();
        return;
      }
      console.log("Created snippet", snippet.name);
      mongoose.disconnet();
    });
  }; // End Create
  
  // Read Method
  var read = function(name) {
    Snippet.findOne({name:name}, function(err, snippet) {
      if (err || !snippet) {
        console.error("Could Not Read Snippet", name);
        mongoose.disconnet();
        return;
      }
      console.log("Read snippet", snippet.name);
      console.log(snippet.content);
      mongoose.disconnect();
    });  
  }; // End Read Method
  
  // Update Method
  var update = function(name, content) {
    Snippet.findOneAndUpdate({name: name}, {content: content}, function(err, snippet) {
      console.error("Could Not Update Snippet", name);
      mongoose.disconnect();
      return;
    });
    console.log("Updated snippet", snippet.name);
    mongoose.disconnect();
  }; // End Update Method
  
  // Delete Method
  var del = function(name) {
    Snippet.findOneAndRemove({name: name}, function(err, snippet) {
      console.error("Could Not Delete Snippet", name);
      mongoose.disconnect();
      return;
    });
    console.log("Deleted Snippet", snippet.name);
    mongoose.disconnect();
  }; // End Delete Method
  
});