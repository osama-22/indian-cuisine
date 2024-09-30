import fs from 'fs';
import csv from 'csv-parser';

const results: any[] = [];
fs.createReadStream('/Users/osamamalik/Downloads/indian_food.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    fs.writeFileSync('./data/indian_food.json', JSON.stringify(results));
  });
