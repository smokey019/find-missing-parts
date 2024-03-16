/**
 * Simple script to find missing parts on Allegro
 * James Bates 2024
 */

const file = Bun.file("./lists/refdes_list.txt");

const text = await file.text();

const table: string[] = text.split("\n");

let lastNumber: [string, number];
const missing: [string?] = [];

table.forEach((element) => {
  const result = element.match(/[a-z]+|\d+/gi);
  const last = lastNumber || ["", 0];

  if (!result) return;

  lastNumber = [result[0], parseInt(result[1])];

  if (parseInt(result[1]) == last[1] + 1 && result[0] == last[0]) {
    //we're good
    //console.log('skipping');
  } else if (parseInt(result[1]) > last[1] + 1 && result[0] == last[0]) {
    // we're missing some

    const start = last[1] + 1;
    const end = parseInt(result[1]) - 1;

    for (let index = start; index <= end; index++) {
      missing.push(`${result[0]}${index}`);
    }
  }
});

setTimeout(() => {
  //console.log(missing);
  const today = new Date();
  Bun.write(`./output/missing_parts_${Date.now()}.txt`, missing.join("\n"));
  console.log('Finished finding missing parts.');
  console.log(`Total Missing Parts: ${missing.length}`);
}, 1000);
