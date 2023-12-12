
// Test isList
let list = new lists.List();
new tests.AssertTrue(lists.List.isList(list));
new tests.AssertFalse(lists.List.isList(0));

// Test fromArray
let array = [1, "2", true];
list = lists.List.fromArray(array);

for (let i = 0; i < 3; i++) {
    new tests.AssertEqual(list.get(i), array[i]);
}

// Test length
list = lists.List.fromArray([1, 2, 3]);
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
//new tests.AssertIn(list.random(), array);