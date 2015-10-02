# Sales Engine - JavaScript Edition

To better understand basic JavaScript fundamentals, I've decided to take a
[Turing School](http://turing.io) project originally meant for Ruby and
re-create it in JavaScript.

[Original Overview](http://tutorials.jumpstartlab.com/projects/sales_engine.html)

## Issues I ran into along the way

<a name="disclaimer"></a>**DISCLAIMER:**

For learning purposes, I am trying to avoid using ES6 syntax or methods and also
avoid as many third-party libraries as possible.

#### Parsing a CSV file into a JSON collection
coming soon...

#### Returning `undefined` when using `forEach`

###### Attempt #1

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

###### Attempt #2

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

###### Attempt #3

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

**UPDATE**:

After talking with [Steve](https://github.com/stevekinney/) about this, he
pointed out that the reason `forEach` is returning `undefined` is because
`forEach` "throws away" the array it makes after iterating, unlike something
such as `map`, which iterates over the array you call it on, applies the
callback function you pass it, and then returns the new array with the applied
changes. More specifically, the [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
says

> _forEach() executes the callback function once for each array element; unlike
map() or reduce() it **always returns the value undefined** and is not chainable.
The typical use case is to execute side effects at the end of a chain._

So there's that. I guess the moral of the story is read the docs ;)

#### Testing equality for `BigDecimal` object

This is only a problem because of JavaScript's equality (`===`) operator. In
Ruby, the equality operator (`==`) compares _value_ equality for all data types.
JavaScript has two difference approaches for this.

> _Primitives, like strings and numbers, are compared by value, while objects
like arrays, dates, and plain objects are compared by *reference*. That
comparison by reference basically checks to see if the objects given refer to
the same location in memory._

[source](http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html)

This poses a problem for this project since any data representing revenue in
some way is meant to be returned as a `BigDecimal` object representing dollars
and cents. I first ran into this issue when dealing with `findByUnitPrice` for
`itemRepository`. When an `item` is created and put into the `itemRepository`,
it's unit price looks like this

```javascript
function Item(data) {
  this.unitPrice = new BigDecimal((data.unit_price / 100).toString());
}
```

Where `BigDecimal` is some external library. Since `unit_price` is given to us
in cents, we have to divide it by 100 to get the dollar value.

`findByUnitPrice` works the same way as other `findByX` methods have worked,
only now we must compare objects to find a match.

```javascript
ItemRepository.prototype.findByUnitPrice = function (price) {
  var allItems = this.all;

  for (var i = 0; i < allItems.length; i++) {
    if (allItems[i].unitPrice === price) {
      return allItems[i];
    }
  }
};
```

This code assumes that what is being passed in

The problem here is, as you probably guessed, our equality check. It will
always return `false` since the two objects its comparing are not the same
instance in memory (though they may have the same values).

###### Attempt #1

My first thought was to create my own function do deal value equality for
objects, which I found the source for
[here](http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html).

```javascript
function isEquivalent(a, b) {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
      return false;
  }

  for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
          return false;
      }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}
```

```javascript
ItemRepository.prototype.findByUnitPrice = function (price) {
  var allItems = this.all;

  for (var i = 0; i < allItems.length; i++) {
    if (isEquivalent(allItems[i].unitPrice, price)) {
      return allItems[i];
    }
  }
};
```

This still fails. Can you guess why?

It's because one of the property values of the `BigDecimal` object is itself an
object.

```javascript
{
  [String: '304.67']
  s: 1,
  e: 2,
  c: [ 3, 0, 4, 6, 7 ],
  constructor: { [Function: Big] DP: 20, RM: 1, E_NEG: -7, E_POS: 21 }
}
```

The post I was following addresses this, and talks about other cases in which
this simple `isEquivalent` method will fail. The solution according to the post?
Use a more robust, well-tested function from a library such as
[Underscore](http://underscorejs.org/#isEqual) or
[lodash](http://lodash.com/docs#isEqual).

Despite my [disclaimer](#disclaimer), I think believe this is an okay use of a
third-party library because 1) both underscorejs and lodash are widely used and
accepted, and 2) I have spent a sufficient amount of time to understand the pain
points of dealing with object equality and be able to use a good solution
someone else has provided.
