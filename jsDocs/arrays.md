# JavaScript Array Methods

Reference for all array methods, grouped by **mutating** (changes the original array) vs **non-mutating** (returns a result; original array unchanged).

---

## Mutating methods (original array changes)

These methods modify the array in place.

### push

Adds one or more elements to the **end**. Returns the new length.

```js
const a = [1, 2, 3];
a.push(4);           // a is [1, 2, 3, 4]; returns 4 (new length)
a.push(5, 6);        // a is [1, 2, 3, 4, 5, 6]; returns 6
```

### pop

Removes the **last** element. Returns that element.

```js
const b = [1, 2, 3];
b.pop();             // b is [1, 2]; returns 3
```

### unshift

Adds one or more elements to the **start**. Returns the new length.

```js
const c = [1, 2, 3];
c.unshift(0);        // c is [0, 1, 2, 3]; returns 4
c.unshift(-2, -1);   // c is [-2, -1, 0, 1, 2, 3]; returns 6
```

### shift

Removes the **first** element. Returns that element.

```js
const d = [1, 2, 3];
d.shift();           // d is [2, 3]; returns 1
```

### splice

Removes and/or inserts elements at a given index. Returns the removed elements.

- `splice(start, deleteCount?, ...items)`

```js
const e = [1, 2, 3, 4, 5];
e.splice(2, 1);            // e is [1, 2, 4, 5]; returns [3] (removed)
e.splice(2, 0, 99);       // e is [1, 2, 99, 4, 5]; returns [] (insert only)
e.splice(1, 2, 'a', 'b'); // e is [1, 'a', 'b', 4, 5]; returns [2, 99]
```

### sort

Sorts the array **in place**. Returns the same array reference. Without compare function, sorts as strings.

```js
const f = [3, 1, 4, 1, 5];
f.sort();                  // f is [1, 1, 3, 4, 5]; returns f (same ref)
const g = [10, 2, 30];
g.sort((a, b) => a - b);   // g is [2, 10, 30]; numeric sort
```

### reverse

Reverses the array **in place**. Returns the same array reference.

```js
const h = [1, 2, 3];
h.reverse();         // h is [3, 2, 1]; returns h (same ref)
```

### fill

Fills elements with a value (optionally from start to end). Returns the same array.

```js
const i = [1, 2, 3, 4];
i.fill(0);           // i is [0, 0, 0, 0]; returns i
const j = [1, 2, 3, 4];
j.fill(9, 1, 3);     // j is [1, 9, 9, 4]; returns j (fill from index 1 to 2)
```

### copyWithin

Copies a slice to another position **within the same array**. Returns the same array.

- `copyWithin(target, start?, end?)`

```js
const k = [1, 2, 3, 4, 5];
k.copyWithin(0, 3);        // k is [4, 5, 3, 4, 5]; copy indices 3..end to 0
const l = [1, 2, 3, 4, 5];
l.copyWithin(2, 0, 2);     // l is [1, 2, 1, 2, 5]; copy indices 0..1 to index 2
```

---

## Non-mutating – return new array

Original array is never changed.

### concat

Returns a new array: original + items (arrays are flattened one level).

```js
const a = [1, 2];
a.concat(3);            // a still [1, 2]; returns [1, 2, 3]
a.concat([3, 4]);       // a still [1, 2]; returns [1, 2, 3, 4]
a.concat([3], [4, 5]);  // a still [1, 2]; returns [1, 2, 3, 4, 5]
```

### slice

Returns a new array: shallow copy from start to end. Negative indices count from end.

```js
const b = [1, 2, 3, 4, 5];
b.slice(2);            // b unchanged; returns [3, 4, 5]
b.slice(1, 4);         // b unchanged; returns [2, 3, 4]
b.slice(-2);           // b unchanged; returns [4, 5]
b.slice();             // b unchanged; returns [1, 2, 3, 4, 5] (shallow copy)
```

### map

Returns a new array: result of callback on each element.

```js
const c = [1, 2, 3];
c.map(x => x * 2);     // c unchanged; returns [2, 4, 6]
c.map((x, i) => i);    // c unchanged; returns [0, 1, 2]
```

### filter

Returns a new array: elements for which callback returns truthy.

```js
const d = [1, 2, 3, 4, 5];
d.filter(x => x > 2);        // d unchanged; returns [3, 4, 5]
d.filter((_, i) => i % 2 === 0); // d unchanged; returns [1, 3, 5]
```

### flat

Returns a new array: flattened to given depth (default 1).

```js
const e = [1, [2, 3], [4, [5, 6]]];
e.flat();              // e unchanged; returns [1, 2, 3, 4, [5, 6]]
e.flat(2);             // e unchanged; returns [1, 2, 3, 4, 5, 6]
```

### flatMap

Same as `map(callback)` then `flat(1)`. Returns a new array.

```js
const f = [1, 2, 3];
f.flatMap(x => [x, x * 10]); // f unchanged; returns [1, 10, 2, 20, 3, 30]
```

### toReversed (ES2023)

Returns a new array: reversed. Original unchanged.

```js
const g = [1, 2, 3];
g.toReversed();        // g unchanged; returns [3, 2, 1]
```

### toSorted (ES2023)

Returns a new array: sorted. Original unchanged.

```js
const h = [3, 1, 2];
h.toSorted();          // h unchanged; returns [1, 2, 3]
h.toSorted((a, b) => b - a); // h unchanged; returns [3, 2, 1]
```

### toSpliced (ES2023)

Returns a new array: result of splice without mutating. Original unchanged.

```js
const i = [1, 2, 3, 4];
i.toSpliced(2, 1);         // i unchanged; returns [1, 2, 4]
i.toSpliced(2, 0, 99);     // i unchanged; returns [1, 2, 99, 3, 4]
```

### with (ES2023)

Returns a new array: one element replaced at index. Original unchanged.

```js
const j = [1, 2, 3];
j.with(1, 99);         // j unchanged; returns [1, 99, 3]
```

---

## Non-mutating – return single value

Original array is never changed; method returns a number, string, boolean, element, or undefined.

### join

Returns a string: elements joined by separator (default `','`).

```js
const a = [1, 2, 3];
a.join();              // a unchanged; returns "1,2,3"
a.join('-');           // a unchanged; returns "1-2-3"
a.join('');            // a unchanged; returns "123"
```

### indexOf

Returns first index of value, or -1. Optional second arg: start index.

```js
const b = [1, 2, 3, 2];
b.indexOf(2);          // b unchanged; returns 1
b.indexOf(2, 2);       // b unchanged; returns 3
b.indexOf(9);          // b unchanged; returns -1
```

### lastIndexOf

Returns last index of value, or -1.

```js
const c = [1, 2, 3, 2];
c.lastIndexOf(2);      // c unchanged; returns 3
c.lastIndexOf(9);      // c unchanged; returns -1
```

### includes

Returns true if array contains value. Optional second arg: start index.

```js
const d = [1, 2, 3];
d.includes(2);         // d unchanged; returns true
d.includes(2, 2);      // d unchanged; returns false
d.includes(9);        // d unchanged; returns false
```

### find

Returns first element for which callback returns truthy, or undefined.

```js
const e = [1, 2, 3, 4, 5];
e.find(x => x > 3);    // e unchanged; returns 4
e.find(x => x > 10);  // e unchanged; returns undefined
```

### findIndex

Returns index of first element for which callback returns truthy, or -1.

```js
const f = [1, 2, 3, 4, 5];
f.findIndex(x => x > 3);   // f unchanged; returns 3
f.findIndex(x => x > 10);  // f unchanged; returns -1
```

### findLast (ES2023)

Returns last element for which callback returns truthy, or undefined.

```js
const g = [1, 2, 3, 4, 5];
g.findLast(x => x > 3);   // g unchanged; returns 5
```

### findLastIndex (ES2023)

Returns index of last element for which callback returns truthy, or -1.

```js
const h = [1, 2, 3, 4, 5];
h.findLastIndex(x => x > 3); // h unchanged; returns 4
```

### every

Returns true if callback returns truthy for every element.

```js
const i = [2, 4, 6];
i.every(x => x % 2 === 0);  // i unchanged; returns true
i.every(x => x > 5);        // i unchanged; returns false
```

### some

Returns true if callback returns truthy for at least one element.

```js
const j = [1, 2, 3];
j.some(x => x > 2);    // j unchanged; returns true
j.some(x => x > 10);   // j unchanged; returns false
```

### reduce

Returns a single value: accumulated result. Optional second arg: initial value.

```js
const k = [1, 2, 3, 4];
k.reduce((acc, x) => acc + x, 0);  // k unchanged; returns 10
k.reduce((acc, x) => acc + x);      // k unchanged; returns 10 (no initial: uses first as acc)
```

### reduceRight

Same as reduce but from right to left.

```js
const l = [1, 2, 3];
l.reduceRight((acc, x) => acc + x, ''); // l unchanged; returns "321"
```

### at

Returns element at index. Negative index = from end.

```js
const m = [10, 20, 30];
m.at(1);               // m unchanged; returns 20
m.at(-1);              // m unchanged; returns 30
m.at(-2);              // m unchanged; returns 20
m.at(10);              // m unchanged; returns undefined
```

---

## Non-mutating – return iterator

Original array unchanged; returns an iterator (use with `for...of` or spread).

### keys

Iterator over indices.

```js
const a = [10, 20, 30];
[...a.keys()];         // a unchanged; returns [0, 1, 2]
```

### values

Iterator over elements (default for `for...of` on array).

```js
const b = [10, 20, 30];
[...b.values()];       // b unchanged; returns [10, 20, 30]
```

### entries

Iterator over [index, value] pairs.

```js
const c = [10, 20, 30];
[...c.entries()];      // c unchanged; returns [[0, 10], [1, 20], [2, 30]]
```

---

## Static methods

### Array.from

Creates a new array from an iterable or array-like object. Optional map function.

```js
Array.from('abc');                        // returns ['a', 'b', 'c']
Array.from([1, 2, 3], x => x * 2);        // returns [2, 4, 6]
Array.from({ length: 3 }, (_, i) => i);   // returns [0, 1, 2]
```

### Array.isArray

Returns true if value is an array.

```js
Array.isArray([1, 2]);   // returns true
Array.isArray('hello');  // returns false
Array.isArray({});       // returns false
```

---

## Quick reference

| Mutate (change original) | Don't mutate (original unchanged) |
|--------------------------|-----------------------------------|
| `push`, `pop` | `concat`, `slice`, `map`, `filter`, `flat`, `flatMap` |
| `unshift`, `shift` | `toReversed`, `toSorted`, `toSpliced`, `with` |
| `splice`, `sort`, `reverse` | `join`, `indexOf`, `lastIndexOf`, `includes` |
| `fill`, `copyWithin` | `find`, `findIndex`, `findLast`, `findLastIndex` |
| | `every`, `some`, `reduce`, `reduceRight`, `at` |
| | `keys`, `values`, `entries` |
