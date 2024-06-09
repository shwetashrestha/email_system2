import passport from 'passport';
// import { Strategy as OutlookStrategy } from 'passport-outlook';
import { pgClient } from './database';
import dotenv from 'dotenv';
const OutlookStrategy = require('passport-outlook').Strategy;


dotenv.config();

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const res = await pgClient.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, res.rows[0]);
  } catch (err) {
    done(err);
  }
});

passport.use(new OutlookStrategy({
  clientID: process.env.OUTLOOK_CLIENT_ID!,
  clientSecret: process.env.OUTLOOK_CLIENT_SECRET!,
  callbackURL: process.env.OUTLOOK_CALLBACK_URL!,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    const res = await pgClient.query(
      `INSERT INTO users (username, outlook_email, access_token, refresh_token)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (outlook_email) DO UPDATE SET access_token = $3, refresh_token = $4
       RETURNING *`,
      [profile.displayName, profile.emails[0].value, accessToken, refreshToken]
    );
    return done(null, res.rows[0]);
  } catch (err) {
    return done(err);
  }
}));
