var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var fs = require('fs');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
app.use(loopback.static(path.resolve(__dirname, '../client')));
app.get('/', function(req, res) {
  var file = fs.readFileSync('./client/demos/toolbox/index.html', 'utf8');
  res.send(file);
});
// Bootstrap the application, configure models, datasources and middleware.ce
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

// curl -XPUT 'http://localhost:9200/ialumni/_mapping/linkedin' -d '
// {
//   "properties": {
//     "positions": {
//       "properties": {
//         "values": {
//           "properties": {
//             "company": {
//               "properties": {
//                 "name": {
//                     "type" : "string", "index" : "analyzed"
//                 },
//                 "name_untouched" : {
//                   "type" : "string", "index" : "not_analyzed"
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }'
//
// {
//   "properties": {
//     "positions": {
//       "properties": {
//         "values": {
//           "properties": {
//             "company": {
//               "properties": {
//                 "name": {
//                   {"type" : "string", "index" : "analyzed"}
//                 },
//                 "name_untouched" : {"type" : "string", "index" : "not_analyzed"}
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
