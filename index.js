const discord = require('discord.js');
const skyfish = new discord.Client();
const schedule = require('node-schedule');
const phantom = require('phantom');
const config = require('./config');

const rule = new schedule.RecurrenceRule();
rule.minute = [5,35]; // run at every xx:05 and xx:35

const j = schedule.scheduleJob(rule, function() {
    (async function() {
        const instance = await phantom.create();
        const page = await instance.createPage();
        const status = await page.open('https://www.garlandtools.org/db/#skywatcher/all');
        const content = await page.property('content');
        const re = /tension/i;
        content.match(re) !== null ? 
            skyfish.channels.get('285103530618912768').send('Tension happened maybe? <@161242010446069760> <@164489937645862914> check https://www.garlandtools.org/db/#skywatcher/all plox') :
            skyfish.channels.get('285103530618912768').send('No tension this hour.');
        const re2 = /shroud/i;
        content.match(re2) !== null ?
            skyfish.channels.get('285103530618912768').send('`sanity check, still awake, still running, still found shroud in the garland response`') :
            skyfish.channels.get('285103530618912768').send('idk if im still working or what.');
        await instance.exit();
    }());
});

skyfish.once('ready', () => {
    console.log(`Logged in as ${skyfish.user.username}`);
    skyfish.channels.get('285103530618912768').send('skyfisher log on. we get signal');
});


skyfish.login(config.token);
