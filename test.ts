
let list = new lists.List();
new tests.AssertTrue(lists.List.isList(list));
new tests.AssertFalse(lists.List.isList(0));

let array = [1, "2", true];
list = lists.List.fromArray(array);

for (let i = 0; i < 3; i++) {
    new tests.AssertEqual(list.get(i), array[i]);
}