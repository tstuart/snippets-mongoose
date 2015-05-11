
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
  
  // Create a document
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
  
  
});