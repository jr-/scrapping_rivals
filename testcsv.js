const fs = require('fs');
const { parse } = require('json2csv');
 
const fields = ['field1', 'field2', 'field3'];
const opts = { fields };

const myData = [ {field1: 'a', field2: 'b', field3: 'c'}, {field1: 'a2', field2: 'b2', field3: 'c2'}];
 
try {
  const csv = parse(myData, opts);
  console.log(csv);
  fs.writeFile('players.csv', csv, function (err) {
      if (err) throw err;
      console.log('Saved!');
  });
} catch (err) {
  console.error(err);
}

