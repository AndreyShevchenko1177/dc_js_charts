var fruits = crossfilter([
    { name: 'Apple', type: 'fruit', count: 20 },
    { name: 'Orange', type: 'fruit', count: 10 },
    { name: 'Grapes', type: 'fruit', count: 50 },
    { name: 'Mango1', type: 'fruitMango', count: 40 },
    { name: 'Mango2', type: 'fruitMango', count: 40 },
    { name: 'Mango3', type: 'fruitMango', count: 40 },
    { name: 'Mango4', type: 'fruitMango', count: 40 },
]);

console.log('crossfilter', fruits);

var count = fruits.groupAll().reduceCount().value();
console.log(fruits);

var filtering = fruits.dimension(d => d.type)
console.log(filtering);

filtering.filter('fruitMango')

var grouping = filtering.group().reduceCount();
var first = grouping.top(2);

console.log('first', first);
