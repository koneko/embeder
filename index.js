const express = require('express')
const app = express()
const port = 4000;
const path = require('path')
const {
    Webhook,
    MessageBuilder
} = require('discord-webhook-node');
let hook = null

// const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
// hook.setUsername('Discord Webhook Node Name');
// hook.send("Hello there!");

app.get('/api/send', (req, res) => {
    let title = req.query.title
    let description = req.query.description
    let color = req.query.color.replace('!!', '#')
    if (!color.includes('#')) return res.send('no color bozo')
    let webhookid = req.query.webhookid
    let webhooktoken = req.query.webhooktoken

    console.log(title, description, color, webhookid, webhooktoken)
    if (!title || !description || !color || !webhookid || !webhooktoken) {
        res.status(400).send('Missing parameters, you need to have: title, description, color (hex or decimal), webhookid and webhooktoken (first and second variables in webhook url)')
        return
    }
    hook = new Webhook(`https://discord.com/api/webhooks/${webhookid}/${webhooktoken}`);
    let message = new MessageBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
    hook.send(message)
        .then(() => console.log('Sent webhook successfully!'))
        .catch(err => console.log(err.message));
    res.send('message sent!')
})

app.use(express.static(path.join(__dirname, 'public')))
app.listen(port, () => console.log('Listening on port ' + port))