![version](https://img.shields.io/npm/v/dashamail)
![npm](https://img.shields.io/node/v/dashamail)
![npm](https://img.shields.io/npm/l/dashamail)
![npm](https://img.shields.io/npm/dm/dashamail)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/dashamail)
[![Donate](https://img.shields.io/badge/donate-QIWI-red)](https://qiwi.com/n/OVENT628)
[![Donate](https://img.shields.io/badge/donate-YooMoney-red)](https://yoomoney.ru/to/410015710489385)

# DashaMail
Software Development Kit for DashaMail

## Install
### npm
```bash
npm i --save dashamail
```
### yarn
```bash
yarn add dashamail
```

## Use
### DashaMail Transactional Send
```js
const {transactional: Transactional} = require('dashamail');

new Transactional()
    .setApiKey('API_KEY')
    .setTo('USER_EMAIl', 'USER_NAME')
    .setFrom('FROM_EMAIL', 'FROM_NAME')
    .setReplyTo('RESPONSE_TO_EMAIL', 'RESPONSE_TO_NAME')
    .setSubject('Test') // subject (title) of the letter
    .setMessage(0) // messageId from dashamail (can get it while edit template from url)
    .setReplaces({'KEY': 'VALUE', 'KEY2': 1}) // substitutions in the letter template
    //.setDomain('somedomain.zone') // the sending domain to be used for DKIM/SPF signatures. Default, first in list "Account -> My Domains"
    //.setCampaignId(0) // campaignId used for filter sended emails by some id 
    //.setDeliveryTime(+new Date() + (1000 * 60 * 5)) // send email after 5 min 
    //.setPlainText('YOUR_PLAIN_TEXT')
    //.setNoTrackClicks(true) // do not track email links clicks, default false
    //.setNoTrackOpens(true) // do not track email opens, default false
    .send() // sending request to dashamail api
    .then(
        transactionId => {/* Do something with transaction id */},
        errorString => {/* Do something with errorString */}
    );
```

### DashaMail Transactional Check
```js
const {transactional: Transactional} = require('dashamail');

new Transactional().setApiKey('API_KEY').check('TransactionalID') // put here correct id
    .then(
        response => {/* Do something with response */},
        errorString => {/* Do something with errorString */}
    );
```

### DashaMail Transactional Events List
```js
const {transactional: Transactional} = require('dashamail');
const EventType = require('dashamail/classes/eventType');
const Sort = require('dashamail/classes/sort');
const from = new Date(); from.setUTCHours(0,0,0,0);
const fromMonth = from.getMonth()+1 < 10 ? '0' + from.getMonth()+1 : from.getMonth()+1;
const to = new Date(); to.setUTCHours(23,59,59,999);
const toMonth = to.getMonth()+1 < 10 ? '0' + to.getMonth()+1 : to.getMonth()+1;

new Transactional()
    .setApiKey('API_KEY')
    .setLogEventType(EventType.ALL) // filter events by type. Default EventType.ALL
    .setLogSort(Sort.asc) // filter event time. Default Sort.desc
    // get event after date yyyy-mm-dd hh:mm:ss
    .setLogFrom(`${from.getFullYear()}-${fromMonth}-${from.getDate()} ${from.getHours()}:${from.getMinutes()}:${from.getSeconds()}`)
    // get event before date yyyy-mm-dd hh:mm:ss
    .setLogTo(`${to.getFullYear()}-${toMonth}-${to.getDate()} ${to.getHours()}:${to.getMinutes()}:${to.getSeconds()}`)
    .get_log() // sending request or row below (with params)
    //.get_log(0, 25) // with start from (default 0) & count items for response (by default 500)  
    .then(
        items => {/* Do something with items: object[] */},
        errorString => {/* Do something with errorString */}
    );
```

# Author
[![Nikita Sereda](https://github-readme-stackoverflow.vercel.app/?userID=7103430&theme=dark)](https://stackoverflow.com/users/7103430/Никита-Середа)

## Contacts:
[VK](https://vk.com/ng_new) | [Telegram](https://t.me/Lanselot66)
