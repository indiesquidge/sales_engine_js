# Sales Engine - JavaScript Edition

To better understand basic JavaScript fundamentals, I've decided to take a
[Turing School](http://turing.io) project originally meant for Ruby and
re-create it in JavaScript.

[Original Overview](http://tutorials.jumpstartlab.com/projects/sales_engine.html)

## Getting Started

Clone
```sh
git clone https://github.com/indiesquidge/sales_engine_js.git
cd sales_engine_js
```

Install dependencies
```sh
npm install
```

Run whole test suite
```sh
npm test
```

Run individual tests
```sh
mocha test/<test_file>
```

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
we are inside of a callback function that was passed to `map`, and that callback
is one passing the arguments from a completely different scope. Instead, we must
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

**UPDATE**:

So `var that = this;` is not the most intuitive thing, is rather ugly, and
doesn't really make full use of JavaScript's function methods. Instead of saving
the scope to a variable, we can use `bind()`.

```javascript
MerchantRepository.prototype.createMerchants = function (file) {
  var merchantList = new Parser().parse(file);

  this.all = merchantList.map(function (merchant) {
    return new Merchant(merchant, this);
  }.bind(this));
};
```

The example above works because we used `bind(this)` to explicitly set the value
of `this` on the callback function while we're still in the scope of
`MerchantRepository`. When the callback is eventually called, it remembers what
this is because we bound it to the function.

[source of help for using bind](http://ow.ly/Tp2Hs)

## For the Future

1. [Introduce ES6 syntax and new methods to the application](#es6)
2. [Re-writing the application in a more functional programming manner](#functional)

<a name="es6"></a>ES6 is the new JavaScript standard that introduced a whole
slew of changes to the language. I won't go and list them all, but some major
things include new ways to create functions

```javascript
// Arrow functions
const add = (x, y) => {
  return x + y
}

// Concise methods
const MathUtils = {
  add (x, y) {
    return x + y
  }
}

// Classes
class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}
```

[source](https://medium.com/@ryanflorence/functions-without-function-bc356ed34a2f)

New methods, such as
[find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find),
which would have been very useful for this application particularly, easier
ways to concatenate strings with template strings, and a whole lot
[more](https://github.com/lukehoban/es6features).

Implementing these into SalesEngine would be a fun task that would help students
new to ES6 (like myself) see the changes and understand why they were made.

---

<a name="functional"></a>Sales Engine as a project isn't really set up to be a
"real" application, much less a JavaScript application. The whole point is to
test new students on mimicking database relationships, and seeing how they deal
with the hierarchy, the wiring up of files, the algorithms to parse the data,
etc. With that said, I think it was an excellent way to learn Ruby, and turned
out to be an excellent way to learn Prototypal Object-Oriented JavaScript as
well.

As with any code base, iterations or constraints could make things cleaner. Many
in the JavaScript community would argue that the language is not meant to be
Object-Oriented, and instead should be written in a functional manner.

> _If you're creating constructor functions and inheriting from them, you haven't
learned JavaScript....You're working in the phony version of JavaScript that only
exists to dress the language up like Java....You're coding in this amazing,
game-changing, seminal programming language and completely missing what makes it
so cool and interesting._

[Eric Elliot](https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3)

This is a new paradigm for people coming from Ruby. Functional programming is
about composing mathematical functions and avoiding shared state and mutable
data. Those are all pretty abstract to me right now, but the way I understand it
is that there are no more constructors in which you instantiate new objects from
which in turn have their own set of methods. It's about keeping side-effects to
a minimum by knowing that if you put the same thing into a function, it should
return the same thing.

So that would be one thing to consider. _How could we re-create SalesEngine in a
more functional way?_ As I mentioned above, this may not be the most ideal
project to try that out with, but it's worth keeping in mind and doing more
research on.
