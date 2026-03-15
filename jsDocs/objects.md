# JavaScript Object Methods and Properties

Reference for `Object` static methods, prototype methods, and common properties. Grouped by **mutating** (changes the object) vs **non-mutating** (returns a result; original unchanged).

---

## Mutating Object methods (change the object)

These modify the given object in place or return the same object reference after modifying it.

### Object.assign(target, ...sources)

Copies own enumerable properties from one or more source objects **into** `target`. Returns `target`. Later sources overwrite earlier ones. Shallow copy.

```js
const target = { a: 1 };
Object.assign(target, { b: 2 }, { c: 3, a: 99 });
// target is { a: 99, b: 2, c: 3 }; returns target
```

### Object.defineProperty(obj, prop, descriptor)

Defines or modifies a property on `obj` with the given descriptor. Mutates `obj`. Returns `obj`.

```js
const o = { a: 1 };
Object.defineProperty(o, 'b', {
  value: 2,
  writable: false,
  enumerable: true,
  configurable: true,
});
// o is { a: 1, b: 2 }; b is read-only if writable: false
```

### Object.defineProperties(obj, props)

Defines multiple properties on `obj`. Mutates `obj`. Returns `obj`.

```js
const o = {};
Object.defineProperties(o, {
  foo: { value: 1, enumerable: true },
  bar: { value: 2, enumerable: true },
});
// o is { foo: 1, bar: 2 }
```

### Object.freeze(obj)

Makes `obj` immutable: can't add/remove/change properties. Mutates `obj`. Returns `obj`. Shallow (nested objects are not frozen).

```js
const o = { a: 1, b: 2 };
Object.freeze(o);
o.a = 99;   // no effect (strict mode may throw)
o.c = 3;    // no effect
// o is still { a: 1, b: 2 }; returns o
```

### Object.seal(obj)

Prevents adding or removing properties; existing properties stay configurable. Mutates `obj`. Returns `obj`.

```js
const o = { a: 1 };
Object.seal(o);
o.a = 99;   // ok
o.b = 2;    // no effect (can't add)
delete o.a; // no effect (can't delete)
// o is { a: 99 }; returns o
```

### Object.preventExtensions(obj)

Prevents new properties from being added. Mutates `obj`. Returns `obj`.

```js
const o = { a: 1 };
Object.preventExtensions(o);
o.b = 2;    // no effect
o.a = 99;   // ok (can still modify existing)
// o is { a: 99 }; returns o
```

### Object.setPrototypeOf(obj, proto)

Sets the prototype of `obj` to `proto`. Mutates `obj`. Returns `obj`. Prefer `Object.create` when possible for performance.

```js
const o = { a: 1 };
const proto = { b: 2 };
Object.setPrototypeOf(o, proto);
// o.a is 1, o.b is 2 (from prototype); returns o
```

---

## Non-mutating Object methods (original unchanged)

### Return new object

#### Object.create(proto, propertiesObject?)

Creates a new object with the given prototype (and optional property descriptors). Original unchanged.

```js
const proto = { greet() { return 'hi'; } };
const o = Object.create(proto, { foo: { value: 1, enumerable: true } });
// o is { foo: 1 }, o.greet() is 'hi'; proto unchanged
```

#### Object.fromEntries(iterable)

Creates a new object from an iterable of [key, value] pairs (e.g. from `Object.entries`).

```js
const entries = [['a', 1], ['b', 2]];
Object.fromEntries(entries);  // entries unchanged; returns { a: 1, b: 2 }
const obj = { x: 10, y: 20 };
Object.fromEntries(Object.entries(obj));  // obj unchanged; returns { x: 10, y: 20 }
```

### Return array

#### Object.keys(obj)

Returns an array of the object's **own** enumerable string keys. Object unchanged.

```js
const o = { a: 1, b: 2 };
Object.keys(o);   // o unchanged; returns ['a', 'b']
```

#### Object.values(obj)

Returns an array of the object's **own** enumerable property values. Object unchanged.

```js
const o = { a: 1, b: 2 };
Object.values(o);  // o unchanged; returns [1, 2]
```

#### Object.entries(obj)

Returns an array of [key, value] for own enumerable properties. Object unchanged.

```js
const o = { a: 1, b: 2 };
Object.entries(o); // o unchanged; returns [['a', 1], ['b', 2]]
```

#### Object.getOwnPropertyNames(obj)

Returns an array of **all** own string property names (including non-enumerable). Object unchanged.

```js
const o = {};
Object.defineProperty(o, 'a', { value: 1, enumerable: false });
Object.getOwnPropertyNames(o); // o unchanged; returns ['a']
```

#### Object.getOwnPropertySymbols(obj)

Returns an array of own symbol keys. Object unchanged.

```js
const sym = Symbol('id');
const o = { [sym]: 42, a: 1 };
Object.getOwnPropertySymbols(o); // o unchanged; returns [sym]
```

### Return descriptor(s)

#### Object.getOwnPropertyDescriptor(obj, prop)

Returns the property descriptor for the given own property, or `undefined`. Object unchanged.

```js
const o = { a: 1 };
Object.getOwnPropertyDescriptor(o, 'a');
// o unchanged; returns { value: 1, writable: true, enumerable: true, configurable: true }
```

#### Object.getOwnPropertyDescriptors(obj)

Returns an object with all own property descriptors. Object unchanged.

```js
const o = { a: 1, b: 2 };
Object.getOwnPropertyDescriptors(o);
// o unchanged; returns { a: {...}, b: {...} }
```

### Return prototype

#### Object.getPrototypeOf(obj)

Returns the prototype of `obj`. Object unchanged.

```js
const o = {};
Object.getPrototypeOf(o) === Object.prototype;  // true
```

### Return boolean

#### Object.hasOwn(obj, prop)

Returns true if `obj` has the given property as **own** (not inherited). ES2022. Object unchanged.

```js
const o = { a: 1 };
Object.hasOwn(o, 'a');   // o unchanged; returns true
Object.hasOwn(o, 'b');   // o unchanged; returns false
Object.hasOwn(o, 'toString'); // false (inherited)
```

#### Object.is(value1, value2)

Returns true if the two values are the same (SameValue equality). Handles `NaN` and +/-0 correctly. Does not touch any object.

```js
Object.is(1, 1);           // true
Object.is(NaN, NaN);       // true  (unlike ===)
Object.is(0, -0);          // false (unlike ===)
Object.is({}, {});          // false (different references)
```

#### Object.isFrozen(obj)

Returns true if the object is frozen. Object unchanged.

```js
const o = { a: 1 };
Object.freeze(o);
Object.isFrozen(o);  // true
```

#### Object.isSealed(obj)

Returns true if the object is sealed. Object unchanged.

```js
const o = { a: 1 };
Object.seal(o);
Object.isSealed(o);  // true
```

#### Object.isExtensible(obj)

Returns true if new properties can be added. Object unchanged.

```js
const o = { a: 1 };
Object.isExtensible(o);  // true
Object.preventExtensions(o);
Object.isExtensible(o);  // false
```

---

## Object.prototype methods (instance methods)

Called on an object instance. They do not mutate the object (except in custom implementations); they return a value or answer a question.

### obj.hasOwnProperty(prop)

Returns true if the object has the given property as **own** (not from prototype). Prefer `Object.hasOwn(obj, prop)` to avoid issues if `obj` has no prototype or overrides `hasOwnProperty`.

```js
const o = { a: 1 };
o.hasOwnProperty('a');        // true
o.hasOwnProperty('toString');  // false (inherited)
```

### obj.isPrototypeOf(value)

Returns true if the object is in the prototype chain of `value`.

```js
const proto = {};
const o = Object.create(proto);
proto.isPrototypeOf(o);  // true
Object.prototype.isPrototypeOf(o);  // true
```

### obj.propertyIsEnumerable(prop)

Returns true if the property is own and enumerable.

```js
const o = { a: 1 };
Object.defineProperty(o, 'b', { value: 2, enumerable: false });
o.propertyIsEnumerable('a');  // true
o.propertyIsEnumerable('b');  // false
```

### obj.toString()

Returns a string representation. Overridden by many types (e.g. Array, Date, Function).

```js
const o = { a: 1 };
o.toString();  // "[object Object]"
```

### obj.toLocaleString()

Locale-sensitive string. By default same as `toString` for plain objects; overridden by Number, Date, etc.

```js
const o = { a: 1 };
o.toLocaleString();  // "[object Object]"
```

### obj.valueOf()

Returns the primitive value of the object. For plain objects, returns the object itself. Overridden by Number, Date, etc.

```js
const o = { a: 1 };
o.valueOf();  // o (the object itself)
```

---

## Common object properties

### obj.constructor

References the constructor function that created the object. On plain objects, points to `Object`. Can be overwritten; don't rely on it for type checks.

```js
const o = {};
o.constructor === Object;  // true
```

### __proto__ (deprecated)

Accesses or sets the object's prototype. Use `Object.getPrototypeOf` / `Object.setPrototypeOf` instead.

```js
const o = {};
o.__proto__ === Object.prototype;  // true (deprecated, avoid in new code)
```

---

## Quick reference

| Mutate object | Don't mutate (return new/result) |
|---------------|----------------------------------|
| `Object.assign(target, ...sources)` | `Object.create(proto)`, `Object.fromEntries(iterable)` |
| `Object.defineProperty`, `Object.defineProperties` | `Object.keys`, `Object.values`, `Object.entries` |
| `Object.freeze`, `Object.seal`, `Object.preventExtensions` | `Object.getOwnPropertyNames`, `Object.getOwnPropertySymbols` |
| `Object.setPrototypeOf` | `Object.getOwnPropertyDescriptor`, `Object.getOwnPropertyDescriptors` |
| | `Object.getPrototypeOf` |
| | `Object.hasOwn`, `Object.is` |
| | `Object.isFrozen`, `Object.isSealed`, `Object.isExtensible` |

---

## Descriptor properties (for defineProperty / defineProperties)

| Key | Meaning |
|-----|---------|
| `value` | The value of the property. |
| `writable` | If true, value can be changed. Default false when using a descriptor. |
| `enumerable` | If true, shows up in `for...in`, `Object.keys`, etc. Default false. |
| `configurable` | If true, property can be deleted or descriptor changed. Default false. |
| `get` | Getter function (can't use with `value` or `writable`). |
| `set` | Setter function (can't use with `value` or `writable`). |

```js
// Example: getter/setter
const o = {};
let _x = 0;
Object.defineProperty(o, 'x', {
  get() { return _x; },
  set(v) { _x = v; },
  enumerable: true,
  configurable: true,
});
o.x = 10;
o.x;  // 10
```
