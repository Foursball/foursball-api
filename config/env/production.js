module.exports = {

  port: 80,
  serverUrl: process.env.SERVER_URL || 'http://127.0.0.1',

  oauth: {
    github: {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    },
    google: {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    },
    twitter: {
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET
    }
  }

};
