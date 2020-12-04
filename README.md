# thuai

統計方言讀音符合演化規律的字的比例。

推導規則採用 [qieyun-examples-node](https://www.npmjs.com/package/qieyun-examples-node) 0.0.2 版。 

## 準備

```sh
curl -LsSo 常用字頻序表.txt https://cdn.jsdelivr.net/gh/ayaka14732/syyon-vencie@69bc015/texts/%E5%B8%B8%E7%94%A8%E5%AD%97%E9%A0%BB%E5%BA%8F%E8%A1%A8.txt
npm install qieyun@0.7.4
npm install qieyun-examples-node@0.0.2
npm install yitizi@0.0.3
```

## Baseline: 普通話

```sh
curl -LsSO https://raw.githubusercontent.com/rime/rime-terra-pinyin/5a445e2/terra_pinyin.dict.yaml
node putonghua.js
```

6459 characters counted. Accuracy: 83.33%.

註：qieyun-examples-node 0.0.2 版將清入歸入任何一聲均視為正確。

## 粵語

```sh
curl -LsSO https://raw.githubusercontent.com/rime/rime-cantonese/3b792da/jyut6ping3.dict.yaml
node gwongzau.js
```

6468 characters counted. Accuracy: 83.95%.
