# Junction/Disco

[XMPP](http://xmpp.org/) [Service Discovery](http://xmpp.org/extensions/xep-0030.html)
framework for [Node](http://nodejs.org), built on [Junction](http://github.com/jaredhanson/junction).

Junction/Disco is a minimalist framework layered on top of Junction, providing
robust tooling to applications that need complete support for service discovery,
including information and item queries, as well as JID+node addressing.

The Junction/Disco architecture is modeled upon the proven pairing of
[Connect](http://www.senchalabs.org/connect/) + [Express](http://expressjs.com/),
making development of XMPP applications as simple as that of web applications.

## Installation

    $ npm install junction-disco

## Usage

#### Create an Application

To create a new application, simply invoke `disco()`.

     var app = disco();
     
#### Routing

Junction/Disco uses the fragment identifier of the `http://jabber.org/protocol/disco`
XML namespace to provide a routing API.  For example, a query may want to discover
items associated with a band:

    app.items('bands/:id', function(req, res, next) {
      Band.findById(req.params.id, function(err, band) {
        if (err) { return next(err); }
        
        var jid = req.to.toString();
        var items = res.c('query', { xmlns: 'http://jabber.org/protocol/disco#items' });
        band.albums.forEach(function(album) {
          var node = 'bands/' + band.id + '/' + album.id;
          items.c('item', { jid: jid, node: node, name: album.name });
        });
      });
      res.send();
    });

#### Mount and Connect to XMPP Network

Service discovery is a protocol that runs over XMPP, along side other extension
protocols.  Because of this, the service discovery `app` is typically mounted as
a sub-app of larger XMPP application.

    var xmpp = junction()
      .use(junction.logger())
      .use(app);  // use disco app in larger XMPP app
      
    xmpp.connect({ jid: 'user@jabber.org', password: 's3cr3t' });

## Tests

    $ npm install --dev
    $ make test

[![Build Status](https://secure.travis-ci.org/jaredhanson/junction-disco.png)](http://travis-ci.org/jaredhanson/junction-disco)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

(The MIT License)

Copyright (c) 2011 Jared Hanson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
