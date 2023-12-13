
tests.LOGGING = false;

// Test isList
let list = new lists.List();
new tests.AssertTrue(lists.List.isList(list));
new tests.AssertFalse(lists.List.isList(0));

// Test fromArray
let array = [1, "2", true];
list = lists.List.fromArray(array);

new tests.AssertEqual(list.get(0), array[0]);
new tests.AssertEqual(list.get(1), array[1]);
new tests.AssertEqual(list.get(2), array[2]);

// Test length
array = [1, 2, 3];
list = lists.List.fromArray(array);
new tests.AssertEqual(list.length, 3);

// Test verify
new tests.AssertEqual(list.verify(0), 0);
new tests.AssertEqual(list.verify(2), 2);
new tests.AssertRaises(() => list.verify(-1), lists.INVALID_INDEX);
new tests.AssertRaises(() => list.verify(1.5), lists.INVALID_INDEX);
new tests.AssertRaises(() => list.verify(3), lists.OUT_OF_RANGE);

// Test get
new tests.AssertRaises(() => list.get(-1), lists.INVALID_INDEX);
new tests.AssertRaises(() => list.get(1.5), lists.INVALID_INDEX);
new tests.AssertRaises(() => list.get(3), lists.OUT_OF_RANGE);
new tests.AssertEqual(list.get(0), 1);

// Test random
new tests.AssertRaises(() => list.random(-1), lists.INVALID_INDEX);
new tests.AssertRaises(() => list.random(1.5), lists.INVALID_INDEX);
new tests.AssertRaises(() => list.random(3), lists.OUT_OF_RANGE);

new tests.AssertRaises(() => list.random(0, -1), lists.INVALID_INDEX);
new tests.AssertRaises(() => list.random(0, 1.5), lists.INVALID_INDEX);
new tests.AssertRaises(() => list.random(0, 3), lists.OUT_OF_RANGE);

new tests.AssertRaises(() => list.random(2, 1), lists.INVALID_RANGE);
new tests.AssertRaises(() => new lists.List().random(), lists.EMPTY_LIST);

let result = list.random();
new tests.AssertIn(result, array);

// Test set
new tests.AssertRaises(() => list.set(-1, 0), lists.INVALID_INDEX);
new tests.AssertRaises(() => list.set(1.5, 0), lists.INVALID_INDEX);

list.set(2, 10);
list.set(3, 20);
new tests.AssertEqual(list.get(2), 10);
new tests.AssertEqual(list.get(3), 20);

// Test delete
new tests.AssertRaises(() => list.delete(-1), lists.INVALID_INDEX);
new tests.AssertRaises(() => list.delete(1.5), lists.INVALID_INDEX);
new tests.AssertRaises(() => list.delete(4), lists.OUT_OF_RANGE);

list.delete(3);
new tests.AssertIsUndefined(list.items[3]);

// Test push
list.push(100);
new tests.AssertEqual(list.get(3), 100);