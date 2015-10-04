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

#### Finding ways to write `findByX` methods

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

My third attempt was to use a simple `for` loop.

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

**UPDATE**:

#### Final Solution

Looking for one item seemed tricky at first, and it wasn't until I implemented
`findAllByName` that I realized how similar these methods could really be.

```javascript
MerchantRepository.prototype.findAllByName = function (name) {
  return this.all.filter(function (merchant) {
    return merchant.name.toLowerCase() === name.toLowerCase();
  });
};
```

JavaScript's `filter` function allows for very easy way to query a collection.
It creates a new array with all elements that pass the conditional implemented
by the function you give it. This makes `findByName` all the easier to create;
just grab the first element from `findAllByName`'s array.

```javascript
MerchantRepository.prototype.findByName = function (name) {
  return this.findAllByName(name)[0];
};
```

Done and done.

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

#### Dealing with bindings

This is the first _truly_ tricky part of Sales Engine. The relationships
portion is where the project looks at your ability to wire the repositories
together (i.e. find all of a customer's invoices) while maintaining basic Object
Oriented principles of managing dependencies. You don't want all repositories to
know about each other; the reason we created `SalesEngine` was to be the only
object that knows about all of the repositories.

The easiest way to accomplish this is to create our objects with a hierarchy in
mind. The lowest level will be the instances, like `merchants` and `invoices`
and all that. Those will have a "parent" in which they know about, which in this
case would be that instance's correlating repository.

```javascript
function Merchant(data, parent) {
...
}
```

And each repository would also have a "parent", being `SalesEngine`. This
structure keeps the instances and repositories from knowing too much.

In Ruby, this is fairly easy to accomplish. You just pass in `self` as a
parameter upon the creation of each object. JavaScript is similar, but it seems
to be a bit easier to lose track of what current binding you're in. I ran into
trouble with that when creating `Merchant` instances inside of the
`MerchantRepository` object. The current structure of `createMerchants` is this

```javascript
MerchantRepository.prototype.createMerchants = function (file) {
  var merchantList = new Parser().parse(file);

  this.all = merchantList.map(function (merchant) {
    return new Merchant(merchant);
  });
};
```

Here, we cannot simply just pass in `this` when we call `new Merchant()` because
we are inside of a callback function that was passed to `map`. Instead, we must
save the binding we want to a variable and use that.

```javascript
MerchantRepository.prototype.createMerchants = function (file) {
  var merchantList = new Parser().parse(file);
  var that = this;

  this.all = merchantList.map(function (merchant) {
    return new Merchant(merchant, that);
  });
};
```

Now I finally understand why I see `var that = this` all over the place. Some
may argue doing this is bad practice, or should have a different name, etc. At
this point in my learning career, finding these nuances and seeing _why_ they
are used is a primary goal; I can always make things more practical down the
road.
