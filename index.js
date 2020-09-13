'use strict';
const express = require('express');
const {dialogflow} = require('actions-on-google');
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const app = dialogflow({debug:true});
const fetch = require('node-fetch');

//default intent
app.intent('Default Welcome Intent', (conv)=>{
    conv.ask('Hello world!!');
});

//tracking intent
app.intent('get train number',async (conv,{number})=>{
let trainNum = conv.body.queryResult.queryText;
const response = await fetch("https://your-first-herokus-app.herokuapp.com/status/"+trainNum+"/today");
const jsonData = await response.json();
const voiceResponse = jsonData.data;
conv.close(voiceResponse);
});

const expressApp = express().use(bodyParser.json());
expressApp.post('/webhook',app);
expressApp.listen(port);
