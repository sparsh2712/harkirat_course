/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
  var total_amount_spent_on_category_a = 0;
  var total_amount_spent_on_category_b = 0;
  var total_amount_spent_on_category_c = 0;

  transactions.forEach((name) => {
    if (name.category == 'a'){
      total_amount_spent_on_category_a += name.price;
    }
    if (name.category == 'b'){
      total_amount_spent_on_category_b += name.price;
    }
    if (name.category == 'c'){
      total_amount_spent_on_category_c += name.price;
    }
  });
  return [
    {
      "category_a": total_amount_spent_on_category_a,
      "category_b": total_amount_spent_on_category_b,
      "category_c": total_amount_spent_on_category_c,
    }
  ];
}

var transactions = [
  {
    "itemName": 'xyz',
    "category": 'a',
    "price": 10,
  },
  {
    "itemName": 'qwe',
    "category": 'b',
    "price": 100,
  },
  {
    "itemName": 'jkl',
    "category": 'c',
    "price": 102,
  },
  {
    "itemName": 'jhg',
    "category": 'a',
    "price": 178,
  },
  {
    "itemName": 'xyqz',
    "category": 'a',
    "price": 210,
  },
  {
    "itemName": 'xyhgz',
    "category": 'b',
    "price": 50,
  },
  {
    "itemName": 'xqawyz',
    "category": 'c',
    "price": 80,
  },
  {
    "itemName": 'xklyz',
    "category": 'b',
    "price": 150,
  },
  {
    "itemName": 'xyz',
    "category": 'a',
    "price": 25,
  },
  {
    "itemName": 'xyz',
    "category": 'b',
    "price": 70,
  }
]

console.log(calculateTotalSpentByCategory(transactions));

module.exports = calculateTotalSpentByCategory;