'use strict';

const fs = require('fs');
const Qieyun = require('qieyun');
const QieyunExamples = require('qieyun-examples-node');
const Yitizi = require('yitizi');
const readRimeDict = require('./lib/readRimeDict');

const m = readRimeDict('terra_pinyin.dict.yaml');

function 字的推導音(c) {
	const d = new Set();
	const vcs = [c, ...Yitizi.get(c)];
	for (const vc of vcs) {
		for (const item of Qieyun.query漢字(vc)) {
			const k = QieyunExamples.putonghua(item.小韻號);
			if (k === '?') continue;
			const lastChar = [...k].slice(-1)[0];
			if (![...'1234'].includes(lastChar)) {  // 清入歸入任何一聲均視為正確
				d.add(k + '1');
				d.add(k + '2');
				d.add(k + '3');
				d.add(k + '4');
			} else {
				d.add(k);
			}
		}
	}
	return [...d];
}

function 字的實際音(c) {
	return [...m.get(c) || []];
}

const s = fs.readFileSync('常用字頻序表.txt', { encoding: 'utf8' });

let acc = 0, i = 0;

for (const c of s) {
	const 推導音 = 字的推導音(c);
	const 實際音 = 字的實際音(c);
	if (推導音.length !== 0 && 實際音.length !== 0) {
		if (推導音.some((v) => 實際音.some((k) => k === v))) acc++;
		i++;
	}
}

console.log(`${i} characters counted. Accuracy: ${(100 * acc / i).toFixed(2)}%.`);
