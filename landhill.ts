// 埋め立て
// 0番地から順に、埋め立ててみる。埋め立てた場所の隣接地が陸ならば、その番地をリストの最後に追加して、海にする。
// リストの先頭から同じ作業を繰り返す。
// 全てが海になったら、一筆書きできたという事。

import { timeStamp } from 'console';
import * as fs from 'fs';

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
var result = false;
var totArea = 0;
var list = [];

var a = [];
var b = [];
var tag = true;
var i: number;

for (var k = 0; k < 10; k++) {
    for (var j = 0; j < 10; j++) {
        a.push(input[k].charAt(j));
    }
}

function updateStatus(num: number): string {
    list.push(num);
    tag = false;
    return 'x';
}

for (j = 0; j < 100; j++) {
    b = Array.from(a);

    if (b[j] !== 'o') {
        b[j] = 'x';
        list.push(j);

        while (list.length !== 0) {
            i = list[0];
            list.shift();

            // b[i]が四隅のケース
            if (0 === i && tag === true) {
                if (b[1] === 'o') {
                    b[1] = updateStatus(1);
                }
                if (b[10] === 'o') {
                    b[10] = updateStatus(10);
                }
            }
            if (9 === i && tag === true) {
                if (b[8] === 'o') {
                    b[8] = updateStatus(8);
                }
                if (b[19] === 'o') {
                    b[19] = updateStatus(19);
                }
            }
            if (90 === i && tag === true) {
                if (b[80] === 'o') {
                    b[80] = updateStatus(80);
                }
                if (b[91] === 'o') {
                    b[91] = updateStatus(91);
                }
            }
            if (99 === i && tag === true) {
                if (b[98] === 'o') {
                    b[98] = updateStatus(98);
                }
                if (b[89] === 'o') {
                    b[89] = updateStatus(89);
                }
            }

            // b[i]が四隅以外の一番上の行のケース
            if (0 < i && i < 9 && tag === true) {
                if (b[i + 10] === 'o') {
                    b[i + 10] = updateStatus(i + 10);
                }
                if (b[i - 1] === 'o') {
                    b[i - 1] = updateStatus(i - 1);
                }
                if (b[i + 1] === 'o') {
                    b[i + 1] = updateStatus(i + 1);
                }
            }

            // b[i]が四隅以外の一番下の行のケース
            if (90 < i && i < 99 && tag === true) {
                if (b[i - 10] === 'o') {
                    b[i - 10] = updateStatus(i - 10);
                }
                if (b[i - 1] === 'o') {
                    b[i - 1] = updateStatus(i - 1);
                }
                if (b[i + 1] === 'o') {
                    b[i + 1] = updateStatus(i + 1);
                }
            }

            // b[i]が四隅以外の一番左の列のケース
            if (i % 10 === 0 && i !== 0 && i !== 90 && tag === true) {
                if (b[i + 10] === 'o') {
                    b[i + 10] = updateStatus(i + 10);
                }
                if (b[i - 10] === 'o') {
                    b[i - 10] = updateStatus(i - 10);
                }
                if (b[i + 1] === 'o') {
                    b[i + 1] = updateStatus(i + 1);
                }
            }

            // b[i]が四隅以外の一番右の列のケース
            if ((i - 9) % 10 === 0 && i !== 9 && i !== 99 && tag === true) {
                if (b[i + 10] === 'o') {
                    b[i + 10] = updateStatus(i + 10);
                }
                if (b[i - 10] === 'o') {
                    b[i - 10] = updateStatus(i - 10);
                }
                if (b[i - 1] === 'o') {
                    b[i - 1] = updateStatus(i - 1);
                }
            }

            // それ以外のケース
            if (tag === true) {
                if (b[i + 10] === 'o') {
                    b[i + 10] = updateStatus(i + 10);
                }
                if (b[i - 10] === 'o') {
                    b[i - 10] = updateStatus(i - 10);
                }
                if (b[i - 1] === 'o') {
                    b[i - 1] = updateStatus(i - 1);
                }
                if (b[i + 1] === 'o') {
                    b[i + 1] = updateStatus(i + 1);
                }
            }

            tag = true;
        }

        totArea = 0;
        for (k = 0; k < 100; k++) {
            if (b[k] === 'o') {
                totArea++;
            }
        }

        if (totArea === 0) {
            result = true;
            break;
        }
    }
}

if (result === true) {
    console.log('YES\n');
} else {
    console.log('NO\n');
}