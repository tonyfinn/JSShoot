About
=====

This is a port of the Kongregate [Shootorial](http://www.kongregate.com/games/Kongregate/shootorial-0) from Flash to Javascript/Canvas. It also clones a subset of the Flash AS2 API that it uses for it's functionality, mostly because after looking into it, how it's done seems kind of nice. It's not an exact clone, because of the differences between JS/Canvas and Actionscript, but it's very similar.

Layout
------
* shoot.js - The Shootorial game
* flap.js - The flap object, core of the cloned parts of the Flash API (so as not to fill up the global namespace mainly)
* flaptypes.js - Other cloned parts of the Flash API that aren't in the flap object. Mostly equivalents of the base types used in Flash.
