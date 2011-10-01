var junction = require('junction');
var disco = require('junction-disco');
var argv = require('optimist').argv;

console.log('Junction/Disco: Info#Query Example');
console.log('  (using Junction/Disco + ' + disco.version + ')');

var options = {
  type: 'client',
  jid: argv.I,
  password: argv.P
};

var connection = disco.createConnection(options);
connection.on('online', function() {
  console.log('Connected as: ' + connection.jid);
  connection.send(new junction.elements.Presence());
});


var store = new junction.pending.MemoryStore();
//connection.use(junction.logger());
connection.use(junction.pending({ store: store }));

connection.use(junction.presence(function(handler) {
  handler.on('available', function(stanza) {
    console.log('Discovering info about ' + stanza.from + ' ...');
    
    var iq = new junction.elements.IQ(stanza.from);
    iq.id = connection.generateID();
    iq.c(new disco.elements.InfoQuery());
    connection.send(iq);
  });
}));

connection.info(null, function(req, res, next) {
  var identities = [ { category: 'client', type: 'bot', name: 'Junction/Disco Example' } ];
  var features = [ 'http://jabber.org/protocol/disco#info' ];
  
  var disco = res.c('query', { xmlns: 'http://jabber.org/protocol/disco#info' });
  identities.forEach(function(identity) {
    disco.c('identity', { category: identity.category,
                              type: identity.type,
                              name: identity.name });
  });
  features.forEach(function(feature) {
    disco.c('feature', { var: feature });
  });
  res.send();
})

connection.use(disco.middleware.infoQueryResultParser());
connection.use(function(stanza, next) {
  if (!(stanza.irt && stanza.irt.xmlns === 'http://jabber.org/protocol/disco#info' && stanza.irt.query === 'info')) {
    return next();
  }
  
  if (stanza.type == 'error') {
    console.log('Failed to discovered info about ' + stanza.from);
    return;
  }
  
  console.log('Discovered info about ' + stanza.from);
  console.log('  identities:');
  stanza.identities.forEach(function(identity) {
    console.log('    category: ' + identity.category + ', type: ' + identity.type + ', name: ' + identity.name);
  });
  console.log('  features:');
  stanza.features.forEach(function(feature) {
    console.log('    ' + feature);
  });
});

connection.use(junction.serviceUnavailable());
connection.use(junction.errorHandler());


connection.filter(disco.filters.infoQuery());
connection.filter(junction.filters.pending({ store: store }));
