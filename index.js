require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Welcome to the Channels Chatbot for Zoom!')
})

app.get('/authorize', (req, res) => {
  res.send('Your Chatbot is now installed, open the Zoom App and type /slashcommand list in a channel or list in the Channels Chatbot!')
})

app.post('/webhook', (req, res) => {

  if (req.headers.authorization === process.env.verification_token) {
    res.status(200)
    res.send()
    getChatbotToken()
  } else {
    res.send('Unauthorized request to Channels Chatbot for Zoom.')
  }

  function getChatbotToken() {
    request({
      url: `https://api.zoom.us/oauth/token?grant_type=client_credentials`,
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(process.env.client_id + ':' + process.env.client_secret).toString('base64')
      }
    }, (error, httpResponse, body) => {
      if (error) {
        console.log('Error getting Chatbot token from Zoom.', error)
      } else {
        body = JSON.parse(body)
        if(req.body.payload.cmd) {
          if(req.body.payload.cmd.toLowerCase() === 'list') {
            postChat(body.access_token, [
              {
                type: 'select',
                text: 'Channels',
                static_source: 'channels'
              }
            ])
          } else if (req.body.payload.cmd.toLowerCase() === 'details') {
            postChat(body.access_token, [
              {
                type: 'fields',
                items: [
                  {
                    key: 'Channel JID',
                    value: req.body.payload.toJid,
                    editable: false
                  },
                  {
                    key: 'Channel Name',
                    value: req.body.payload.channelName,
                    editable: false
                  },
                  {
                    key: 'Account ID',
                    value: req.body.payload.accountId,
                    editable: false
                  }
                ]
              }
            ])
          } else {
            postChat(body.access_token, [
              {
                type: 'message',
                text: 'type `/slashcommand list` in a channel or `list` in the Channels Chatbot.'
              }
            ])
          }
        } else if(req.body.payload.selectedItems.length) {
          postChat(body.access_token, [
            {
              type: 'fields',
              items: [
                {
                  key: 'JID',
                  value: req.body.payload.selectedItems[0].value,
                  editable: false
                }
              ]
            }
          ])
        } else {
          postChat(body.access_token, [
            {
              type: 'message',
              text: 'type `/slashcommand list` in a channel or `list` in the Channels Chatbot.'
            }
          ])
        }
      }
    })
  }

  function postChat(token, message) {
    request({
      url: 'https://api.zoom.us/v2/im/chat/messages',
      method: 'POST',
      json: true,
      body: {
        robot_jid: process.env.bot_jid,
        to_jid: req.body.payload.toJid,
        account_id: req.body.payload.accountId,
        visible_to_user: req.body.payload.userId,
        content: {
          head: {
            text: 'Channels Chatbot'
          },
          body: message
        }
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }, (error, httpResponse, body) => {
      if (error) {
        console.log('Error sending chat.', error)
      } else {
        console.log(body)
      }
    })

  }
})

app.listen(port, () => console.log(`Channels Chatbot for Zoom listening on port ${port}!`))
