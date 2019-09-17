# Channels Chatbot

## Production Setup

To run the completed Chatbot on a live server, follow these steps,

1. Click the **Deploy to Heroku** Button,

   [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

2. Fill in your [**Production** Zoom Chatbot API credentials](https://marketplace.zoom.us/docs/guides/getting-started/app-types/create-chatbot-app#register).

3. Click **Deploy app**.

4. On your App Marketplace Dashboard, add your Heroku url (https://yourherokuurl.com) to your Whitelist URLs (App Credentials Page), **Production** Redirect URL for OAuth (https://yourherokuurl.com/authorize) (App Credentials Page), and **Production** Bot Endpoint URL (https://yourherokuurl.com/webhook) (Features Page).

5. On your App Marketplace Dashboard, go to the **Submit** page and click **Add to Zoom**. After you click the **Authorize** button, you should be taken to your redirect url and see this,

   `Your Chatbot is now installed, open the Zoom App and type /slashcommand list in a channel or list in the Channels Chatbot!`

6. Now that your Chatbot is installed on your Zoom account, go to a Zoom Chat channel and type,

   `/slashcommand list`

   This will display a list of Channels the user who typed the slash command has access to. Click on a channel in the list to see the JID of that channel.

   `/slashcommand details`

   This will display the Channel JID and Channel Name of the Channel the command was typed in, as well as the Account ID.

## Need Support?
The first place to look for help is on our [Developer Forum](https://devforum.zoom.us/), where Zoom Marketplace Developers can ask questions for public answers.

If you can’t find the answer in the Developer Forum or your request requires sensitive information to be relayed, please email us at developersupport@zoom.us.
