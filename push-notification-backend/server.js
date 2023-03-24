const express = require('express')
const cors = require('cors')
const webpush = require('web-push')
const app = express();

const db = require('./db')


const {PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY, VAPID_SUBJECT} = process.env;
const vapidDetails = {
  publicKey: PUBLIC_VAPID_KEY,
  privateKey: PRIVATE_VAPID_KEY,
  subject: VAPID_SUBJECT
}

app.use(cors())
app.use(express.json())

app.post('/add-subscription', (req, res) => {
  const { body } = req;

  db.query(`
  INSERT INTO subscriptions
  (endpoint, subscription)
  VALUES
  ($1, $2)
  `, [body.endpoint, body])
  .then(() => {
    console.log(`subscription for endpoint ${body.endpoint} saved`)
    res.sendStatus(200)
  })
  .catch(console.error)
})

app.post('/give-me-notification', (req, res) => {
  const { body } = req;

  db.query(`
  SELECT subscription FROM subscriptions
  WHERE endpoint = $1
  `, [body.endpoint])
  .then(result => result.rows[0])
  .then(subscription => {
    const notification = JSON.stringify({
      title: "WE MADE IT",
      options: {
        body: "WE MADE IT!!!"
      }
    })

    const options = {
      TTL: 10000,
      vapidDetails
    }

    webpush.sendNotification(subscription.subscription, notification, options)
  })
})

app.post('/remove-subscription', (req, res) => {
  const { body } = req;

  db.query(`
  DELETE FROM subscriptions
  WHERE endpoint = $1
  `, [body.endpoint])
  .then(() => {
    console.log(`subscription for endpoint ${body.endpoint} removed`)
    res.sendStatus(200)
  })
  .catch(console.error)
})



const PORT = 9000;

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})