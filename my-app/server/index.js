const express = require('express');
const bodyParser = require('body-parser');
const App = express();


App.use(bodyParser.json());
let users = [{ user: 'qwe', pass: 'qwe',token:'Ebx8fOqIv8NPKfe6uDL4' },],
    projects = [{id:'fasdgs',nameProject:'New website',company:'Microsoft',price: 2300, deadline:'15 May 2016',timeLeft:'10 days left',timeSpent: 40, progress: 70, status:'Development',assignedTo:'mail1@mail.com'},
    {id:'asdvad',nameProject:'Landing page',company:'Google',price: 1250, deadline:'21 May 2016',timeLeft:'23 days left',timeSpent: 7, progress: 15, status:'Planning',assignedTo:'mail2@mail.com'},{id:'berw5w',nameProject:'New dashboard',company:'Symu.co',price: 5100 , deadline:'15 May 2016',timeLeft:'2 days left',timeSpent: 56 , progress: 90, status:'Testing',assignedTo:'mail3@mail.com'},{id:'ewsag543',nameProject:'New logo',company:'JCD.pl',price: 900 , deadline:'15 June 2015',timeLeft:'30 days left',timeSpent: 10 , progress: 40, status:'Design',assignedTo:'mail2@mail.com'},{id:'dfsacarb3',nameProject:'Landing page',company:'Symu.co',price: 1500 , deadline:'8 August 2016',timeLeft:'2 months left',timeSpent: 0 , progress: 0, status:'Quened',assignedTo:'mail3@mail.com'},{id:'asdfg34ga',nameProject:'Mobile app',company:'Facebook',price: 4300 , deadline:'5th May 2016',timeLeft:'Completed',timeSpent: 59 , progress: 100, status:'Completed',assignedTo:'mail3@mail.com'},{id:'asdfba433',nameProject:'Wordpress theme',company:'Themeforest',price: 1300 , deadline:'2th May 2016',timeLeft:'Completed',timeSpent: 30 , progress: 100, status:'Completed',assignedTo:'mail3@mail.com'},{id:'sdaf24ad',nameProject:'Mobile App',company:'Symu.co',price: 1500 , deadline:'15 May 2016',timeLeft:'30 days left',timeSpent: 30 , progress: 40, status:'Planning',assignedTo:'registed@mail.com'},{id:'fsdj6e2e',nameProject:'New dashboard',company:'Symu.co',price: 1500 , deadline:'15 May 2016',timeLeft:'2 days left',timeSpent: 30 , progress: 85, status:'Design',assignedTo:'registed@mail.com'},{id:'rdskfds75',nameProject:'Landing page',company:'Symu.co',price: 1500 , deadline:'8 August 2016',timeLeft:'30 days left',timeSpent: 15 , progress: 30, status:'Development',assignedTo:'registed@mail.com'},{id:'as865nfdg',nameProject:'New website',company:'Symu.co',price: 1500 , deadline:'5th May 2016',timeLeft:'10 days left',timeSpent: 40 , progress: 60, status:'Design',assignedTo:'registed@mail.com'},],
    workers = [{id: '0',name:'Dominic Lynton',position:'Front End Dev',mail:'mail1@mail.com',img:'http://drive.google.com/uc?export=view&id=1b9q6hxRU142VPQfqv-E_XX4ah6EG906s'},{id: '1',name:'Lyan Roach',position:'UX/UI Designer',mail:'mail2@mail.com',img:'http://drive.google.com/uc?export=view&id=1wdB1mAJ6D8hZeTQLnMfHniKFpDby_Pyq'},{id: '2',name:'Michelle Stewart',position:'Account',mail:'mail3@mail.com',img:'http://drive.google.com/uc?export=view&id=15ylQzGXIoTI6fg1mbtnq-p2hfbQGg8NH'},{id: '3',name:'Me',position:'Front End Dev',mail:'registed@mail.com',img:'http://drive.google.com/uc?export=view&id=1lAHCd5VNvO0bW5ORX2siDKZ-C54MbRui'}],
    statisticTable = [
        {id:'df7sakgd',campaing:'Lorem ipsum dolor sit amet tetur',time: '6 days', views: 358000, visitors: 58200,ctr: 25,cpc:3.02,cpv:2.51,cpm:28.35, status: true },
        {id:'sfdgr46r',campaing:'Sed do eiusmod tempor',time: '7 days', views: 1200, visitors: 800,ctr: 10,cpc:8.45,cpv:6.13,cpm:45.22, status: false },
        {id:'sl95tv34',campaing:'Consectetur adipisicing elit sed',time: '3 days', views: 69000, visitors: 7300,ctr: 19,cpc:6.22,cpv:3.90,cpm:37.80, status: true },
    ];


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
                reportsChart: {
                    lastYear: [randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000), randomValue(700, 1000)],
                    lastMonth: [randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250)],
                    lastWeek: [randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250), randomValue(1, 250)]
                },
                salesChart: {
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
App.post('/api/user/charts',(req,res) => {
    let validUser = users.filter((item)=> {
        return (item.token === req.body.token)
    });
    console.log('Charts sent');
    return res.json({
        charts: validUser[0].charts
    })
});
App.get('/projects',(req,res) => {
    return res.json({
       projects: projects
    })
});
App.get('/workers',(req,res) => {
    return res.json({
        workers: workers
    })
});
App.get('/statistic/table',(req,res) => {
    return res.json({
        statisticTable: statisticTable
    })
});
App.listen(4000, () => {
    console.log('server is started');
});