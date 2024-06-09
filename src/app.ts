import express from 'express';
import passport from 'passport';
import { pgClient } from './database';
import './auth';
import dotenv from 'dotenv';
const session = require('express-session');

dotenv.config();

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/outlook', passport.authenticate('windowslive', { scope: ['wl.signin', 'wl.basic', 'wl.emails'] }));

app.get('/auth/outlook/callback',
  passport.authenticate('windowslive', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.send(`Hello,shweta. Your Outlook email is shwetashrestha7@outlook.com.`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
