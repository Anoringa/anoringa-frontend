
# Anoringa FrontEnd
## _The Anonimus social network_


![](https://img.shields.io/github/stars/Anoringa/anoringa-frontend) ![](https://img.shields.io/github/forks/Anoringa/anoringa-frontend) ![](https://img.shields.io/github/issues/Anoringa/anoringa-frontend)[![Netlify Status](https://api.netlify.com/api/v1/badges/8f6d440f-6f42-46f3-b462-82aa502f9bc4/deploy-status)](https://app.netlify.com/sites/anoringa/deploys)![](https://img.shields.io/github/languages/code-size/Anoringa/anoringa-frontend)![](https://img.shields.io/twitter/follow/Anoringa1?label=Follow&style=social)



Anoringa is an open source anonymous posting social network, the goal is to provide people with a site to discuss current issues and news without bias from other people

[![anoringa-screencap](https://i.imgur.com/5TM6Fhu.png)
](https://anoringa.win)



<!---
Open Sauced provides structured onboarding for new contributors to open source. This structure provides a way to track your next contributions by leveraging a unique dashboard built on top of the [GitHub GraphQL API](https://docs.github.com/en/free-pro-team@latest/graphql).

[![open-sauced-screencap](/src/images/homepage.png)
](https://opensauced.pizza)

-->
### 📖 Prerequisites

- [Node.js](https://nodejs.org/en/): please refer to their [installation guide](https://nodejs.dev/learn/how-to-install-nodejs).
	- Node v14 is required
- [NPM](https://npmjs.com/): please refer to their [installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- [Anoringa backend](https://github.com/Anoringa/anoringa-backend): please refer to their [documentation](https://github.com/Anoringa/anoringa-backend), and require this technologies to work:
	- [MongoDB](https://www.mongodb.com/).
	- [ImageKit](https://www.mongodb.com/).
	- [Hcaptcha](https://www.mongodb.com/).
+ `bootstrap-vue` Vue.js v2.6 is required, v2.6.12 is recommended


### 🔧 Configuration
The project needs to be configured with your API endpoints and API keys in order for the authentication flow to work.

To do this, first copy .env.example into two new files in the same folder called .env.development and  .env.production, and replace the values within with your own API credentials:

```
VUE_APP_NAME=<YOUR APP NAME>
VUE_APP_URL=<YOUR APP URL>
VUE_APP_API=<YOUR APP BACKEND ENDPOINT>
VUE_APP_SOCKETIO=<YOUR APP BACKEND ENDPOINT>
VUE_APP_HCAPTCHA=<YOUR HCAPTCHA CLIENT ID>
VUE_APP_IMAGEKIT_PUBLICKEY=<YOUR IMAGEKIT PUBLIC KEY>
VUE_APP_IMAGEKIT_ENDPOINT=<YOUR IMAGEKIT ENDPOINT>
```

### 🖥️ Local development

```
npm install
npm serve
```

### 🖥️ Local build

```
npm install
npm build
npm start
```

### 🧪 Test

```
npm test

// to clean snapshots
npm run clean
```
<!---
### 📙 Storybook

Storybook is being leveraged to mock out visual React components. The latest version of the design system can be found at this [url](https://sauced-components.netlify.app/).

```
npm run storybook
```

![storybook example screenshot](https://user-images.githubusercontent.com/5713670/68147486-0cd14600-ff32-11e9-8cc0-fd91f4171b87.png)
-->

### 🔑 Authentication

Authentication is handled through [Hcaptcha](https://www.hcaptcha.com/) service. 

### 💾 Database

This project uses MongoDB as a database. When you run the program, the ODM [Mongoose](https://mongoosejs.com/) will create the colleactions inner the database. That collections will be named:
- posts
- users
- comments.

### 💨 Service Worker

This project at the moment doesnt have a service worker, we are working on this with Vue.JS PWA. 

## 🍕 Community

Got Questions? ask to us in [Twitter](https://twitter.com/Anoringa1).  
Find Anoringa Issues and new features on our [kanban](https://github.com/orgs/Anoringa/projects/1).

<!--
## ⚖️ LICENSE

MIT © [Anoringa](LICENSE)
-->
