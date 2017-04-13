// generate data for 250 'transactions' (normally this data
// would come from a database or api call and would be sorted)
const results = [];
const names = ['Zack Snyder', 'Aubrey West', 'John Doe', 'Jane Doe', 'Sarah W', 'Starbucks', 'Bush Market', 'Hogwash', 'HRD', 'Westfield Mall'];
for (let i = 0; i < 250; i++) {
  const amount = `$${Math.floor(Math.random() * 10000)}.00`;
  const recipient = names[Math.floor(Math.random() * names.length)];
  const date = `${Math.ceil(Math.random() * 11)}/${Math.ceil(Math.random() * 29)}/2017`;
  const result = { date, amount, recipient };
  results.push(result);
}

module.exports = results;
