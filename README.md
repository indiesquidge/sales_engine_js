# Sales Engine - JavaScript Edition

To better understand basic JavaScript fundamentals, I've decided to take a
[Turing School](http://turing.io) project originally meant for Ruby and
re-create it in JavaScript.

[Original Overview](http://tutorials.jumpstartlab.com/projects/sales_engine.html)

## Issues I ran into along the way

#### Parsing a CSV file into a JSON collection
coming soon...

#### Returning `undefined` when using `forEach`

Ran into trouble when I was implementing the `findByName` method. My first
attempt came about using `forEach` as seen below.

```javascript
MerchantRepository.prototype.findByName = function (name) {
  return this.all.forEach(function (merchant) {
      if (merchant.name === name) {
        return merchant;
      }
  });
};

var merchantRepo = new MerchantRepository('./data/merchants.csv');
var merchant = merchantRepo.findByName('Marvin Group'); //undefined
```

Essentially we are iterating through the collection of merchants and, if one of
their names matches our query, we return it. I thought this would work since we
are returning out of the loop, and we are also returning the `forEach` itself.
But when I tried to run this, it would always return `undefined`. Curious. I am
still not sure why this always returns undefined. I thought it was perhaps
because we had an `if` statement, but even if I simplify the code in the
function it still returns `undefined`. I will need to do more research on this
or perhaps ask someone more experienced than myself.

My second approach was to just assign our match to an outside variable and
return that.

```javascript
MerchantRepository.prototype.findByName = function (name) {
  var match;

  this.all.forEach(function (merchant) {
      if (merchant.name === name) {
        match = merchant;
      }
  });

  return match;
};

var merchantRepo = new MerchantRepository('./data/merchants.csv');
var merchant = merchantRepo.findByName('Marvin Group'); // works!
```

This works, but it has a downfall. The obvious being that if we have two matches
this will return the last one found in the collection. The other issue is that
this will iterate over all elements, even if the item is immediately found. If
we had a larger collection, this would get very slow very quickly.

My final solution was to use a simple `for` loop.

```javascript
MerchantRepository.prototype.findByName = function (name) {
  var allMerchants = this.all;

  for (var i = 0; i < allMerchants.length; i++) {
    if (allMerchants[i].name === name) {
      return allMerchants[i];
    }
  }
};
```

We get the best of both worlds here because it works (important!), and we stop
return out of our loop as soon as we find a match.
