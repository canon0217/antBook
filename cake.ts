import { readFileSync } from 'fs'
import { reverse } from 'dns'
import { start } from 'repl'
import { parse } from 'path'

function main(input: string[]) {
  let [x, y, z, k] = input[0].split(' ').map(Number);
  let a = [], b = [], c = [], a_dif = [], b_dif = [], c_dif = [], sum = [];
  let num_a = 1, num_b = 1, num_c = 1, num_mul = 0;
  let yet = true;

  a = input[1].split(' ').map(Number);
  b = input[2].split(' ').map(Number);
  c = input[3].split(' ').map(Number);

  a.sort((d, e) => e - d);
  b.sort((d, e) => e - d);
  c.sort((d, e) => e - d);

  for (let i = 1; i < x; i++) {
    a_dif[i - 1] = a[0] - a[i];
  }
  for (let i = 1; i < y; i++) {
    b_dif[i - 1] = b[0] - b[i];
  }
  for (let i = 1; i < z; i++) {
    c_dif[i - 1] = c[0] - c[i];
  }

  a_dif.push(1000);
  b_dif.push(1000);
  c_dif.push(1000);

  // while (num_mul < k && num_mul < x + y + z) {
    while (num_mul < k * 3) {
    if (a_dif[num_a-1] === Math.min(a_dif[num_a-1], b_dif[num_b-1], c_dif[num_c-1]) && yet) {
      if (num_a != x) {
        num_a++;
        yet = false;
      }
    }
    if (b_dif[num_b-1] === Math.min(a_dif[num_a-1], b_dif[num_b-1], c_dif[num_c-1]) && yet) {
      if (num_b != y) {
        num_b++;
        yet = false;
      }
    }
    if (c_dif[num_c-1] === Math.min(a_dif[num_a-1], b_dif[num_b-1], c_dif[num_c-1]) && yet) {
      if (num_c != z) {
        num_c++;
        yet = false;
      }
    }
    yet = true;

    // num_mul = num_a + num_b + num_c;
    num_mul = num_a * num_b * num_c;
  }

  console.log(num_a, num_b, num_c);

  for(let i = 0; i < num_a; i++ ){
    for (let j = 0; j < num_b; j++) {
      for (let l = 0; l < num_c; l++ ){
        sum.push(a[i] + b[j] + c[l]);
      }
    }
  }

  sum.sort((d, e) => e - d);

  for (let i = 0; i < k; i++) {
    console.log(sum[0]);
    sum.shift();
  }
}

let lines: string[] = [];
const reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.on('line', function (line: string) {
  lines.push(line);
});
reader.on('close', function () {
  main(lines)
});