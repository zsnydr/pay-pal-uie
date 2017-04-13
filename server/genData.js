const results = [];
const names = ['Zack Snyder', 'Aubrey West', 'John Doe', 'Jane Doe', 'Sarah W', 'Starbucks', 'Bush Market', 'Hogwash', 'HRD', 'Westfield Mall'];
for (let i = 0; i < 251; i++) {
  const amount = `$${Math.floor(Math.random() * 10000)}.00`;
  const recipient = names[Math.floor(Math.random() * names.length)];
  const date = `${Math.ceil(Math.random() * 11)}/${Math.ceil(Math.random() * 29)}/2017`;
  const result = { date, amount, recipient };
  results.push(result);
}

results.sort((a, b) => a.date > b.date);

module.exports = results;
