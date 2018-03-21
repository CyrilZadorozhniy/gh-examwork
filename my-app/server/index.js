const express = require('express');
const bodyParser = require('body-parser');
const App = express();


App.use(bodyParser.json());
let users = [{ user: 'qwe', pass: 'qwe',token:'Ebx8fOqIv8NPKfe6uDL4' },];

App.post('/api/user/register', (req,res) => {
    function randomValue(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    function makeToken() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 20; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    let tokenKey = makeToken();
    let user = users.filter((item)=> {
        return (item.user === req.body.username)
    });
    if (!user[0]) {
        users.push({
            user: req.body.username,
            pass: req.body.pass,
            token: tokenKey,
            charts: {
                salesChart: {
                    lastYear: [["Websites", randomValue(800, 1000)], ["Logo", randomValue(250, 1000)], ["Social Media", randomValue(800, 1000)], ["Adwords", randomValue(800, 1000)], ["E-Commerce", randomValue(800, 1000)]],
                    lastMonth: [["Websites", randomValue(300, 800)], ["Logo", randomValue(50, 250)], ["Social Media", randomValue(300, 800)], ["Adwords", randomValue(300, 800)], ["E-Commerce", randomValue(300, 800)]],
                    lastWeek: [["Websites", randomValue(1, 300)], ["Logo", randomValue(1, 50)], ["Social Media", randomValue(1, 300)], ["Adwords", randomValue(1, 300)], ["E-Commerce", randomValue(1, 300)]]
                },
                reportsChart: {
                    lastYear: [randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000)],
                    lastMonth: [randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250)],
                    lastWeek: [randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250)]
                }
            }
        });
        console.log('registed');
        console.log('user - ', req.body.username);
        console.log('token - ', tokenKey);
        return res.json({
            token: tokenKey,
            username: req.body.username,
            check: true
        });
    } else {
        return res.json({
            check: false
        })
    }
});

App.post('/api/user/login', (req,res) => {

    let user = users.filter((item)=> {
        return (item.user === req.body.username && item.pass === req.body.pass)
    });

    if (user[0]) {
        console.log('true');
        return res.json({
            check: true,
            username: user[0].user,
            token: user[0].token
        })
    } else {
        console.log('false');
        return res.json({
            check: false
        })
    }
});
App.post('/api/user/check',(req,res) => {
    let validUser = users.filter((item)=> {
        return (item.token === req.body.token)
    });

    if (validUser[0]) {
        console.log('Token found');
        return res.json({
            check: true
        })
    } else {
        console.log('token not found');
        return res.json({
            check: false
        })
    }
});
App.listen(4000, () => {
    console.log('server is started');
});