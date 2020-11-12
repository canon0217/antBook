//　たくさんの数式
import { timeStamp } from 'console';
import * as fs from 'fs';

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");

const num = +input[0];  //入力値を数字として保持
var sNum = num.toString();   //入力値を文字列として保持
var a = [];
var totalSum = 0; //総和をいれる箱
var tempNum: number; //temporary数値をいれる箱
for (var i = 0, len = sNum.length; i<len; i++) {
    // a[]に文字列を分割して代入
    a.push(sNum.charAt(i));
}
const totNumCalc = Math.pow(2, len-1);  //全計算回数

//　各桁の数、*1倍、*10倍、*100倍...されたのが何回足されるのかを考える

if(1 === len) {
    totalSum = +a[0];
} else if(2 === len) {
    totalSum += +a[1] * totNumCalc;
    totalSum += +a[0] * totNumCalc / Math.pow(2, 1);
    totalSum += +a[0] * 10 * totNumCalc / Math.pow(2, 1);
} else if (3 === len) {
    totalSum += +a[2] * totNumCalc;
    totalSum += +a[1] * totNumCalc  / Math.pow(2, 1);
    totalSum += +a[1] * 10 * totNumCalc  / Math.pow(2, 1);
    totalSum += +a[0] * totNumCalc  / Math.pow(2, 1);
    totalSum += +a[0] * 10 * totNumCalc  / Math.pow(2, 2);
    totalSum += +a[0] * 100 * totNumCalc  / Math.pow(2, 2);
} else {
    totalSum += +a[len-1] * totNumCalc;
    totalSum += +a[len-2] * totNumCalc  / Math.pow(2, 1);
    totalSum += +a[len-2] * 10 * totNumCalc  / Math.pow(2, 1);
    totalSum += +a[len-3] * totNumCalc  / Math.pow(2, 1);
    totalSum += +a[len-3] * 10 * totNumCalc  / Math.pow(2, 2);
    totalSum += +a[len-3] * 100 * totNumCalc  / Math.pow(2, 2);

    for (i=3; i<len; i++) {
        for(var j=0; j<i; j++) {
            totalSum += +a[len-1-i] * Math.pow(10, j) * totNumCalc / Math.pow(2, j+1);
        }
        totalSum += +a[len-1-i] * Math.pow(10, i) * totNumCalc / Math.pow(2, i);
    }
}

console.log(totalSum);