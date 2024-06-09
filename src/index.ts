import express from 'express';
// import sequelize from './database';
import { User, MailboxDetail, EmailMessage } from './models';
const app = express();
const port = 3000;

app.use(express.json());

// sequelize.sync({ force: true }).then(() => {
//      console.log('Database & tables created!');
//  });

app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`);
 });


// import client from './elasticsearch';

// const createIndices = async () => {
//     await client.indices.create({
//         index: 'email_messages',
//         body: {
//             mappings: {
//                 properties: {
//                     userId: { type: 'integer' },
//                     message: { type: 'text' }
//                 }
//             }
//         }
//     }, { ignore: [400] });

//     await client.indices.create({
//         index: 'mailbox_details',
//         body: {
//             mappings: {
//                 properties: {
//                     userId: { type: 'integer' },
//                     detail: { type: 'text' }
//                 }
//             }
//         }
//     }, { ignore: [400] });
// };

// createIndices().then(() => {
//     console.log('Elasticsearch indices created!');
// }).catch(console.log);

// import { Client as PGClient } from 'pg';
// import { Client as ESClient } from '@elastic/elasticsearch';

// // Database clients
// const pgClient = new PGClient({
//   user: 'email_system',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'shweta',
//   port: 5432,
// });

// const esClient = new ESClient({
//   node: 'http://localhost:9200',  // Adjust this to your Elasticsearch server URL
// });

// // Define types for the returned objects
// interface UserEmail {
//   id: number;
//   email_address: string;
// }

// interface Mailbox {
//   id: number;
//   user_email_id: number;
//   mailbox_name: string;
//   created_at: Date;
// }

// interface EmailMessage {
//   id: number;
//   user_email_id: number;
//   subject: string;
//   body: string;
//   received_at: Date;
// }

// // Function to add a new email address
// async function addEmailAddress(email: string): Promise<UserEmail> {
//   const res = await pgClient.query('INSERT INTO user_emails (email_address) VALUES ($1) RETURNING *', [email]);
//   await esClient.index({
//     index: 'user_emails',
//     id: res.rows[0].id,
//     document: {
//       email_address: email,
//     },
//   });
//   return res.rows[0];
// }

// // Function to add a new mailbox
// async function addMailbox(userEmailId: number, mailboxName: string): Promise<Mailbox> {
//   const res = await pgClient.query('INSERT INTO mailbox_details (user_email_id, mailbox_name) VALUES ($1, $2) RETURNING *', [userEmailId, mailboxName]);
//   await esClient.index({
//     index: 'mailbox_details',
//     id: res.rows[0].id,
//     document: {
//       user_email_id: userEmailId,
//       mailbox_name: mailboxName,
//       created_at: res.rows[0].created_at,
//     },
//   });
//   return res.rows[0];
// }

// // Function to add a new email message
// async function addEmailMessage(userEmailId: number, subject: string, body: string): Promise<EmailMessage> {
//   const res = await pgClient.query('INSERT INTO email_messages (user_email_id, subject, body) VALUES ($1, $2, $3) RETURNING *', [userEmailId, subject, body]);
//   await esClient.index({
//     index: 'email_messages',
//     id: res.rows[0].id,
//     document: {
//       user_email_id: userEmailId,
//       subject: subject,
//       body: body,
//       received_at: res.rows[0].received_at,
//     },
//   });
//   return res.rows[0];
// }

// // Example usage
// (async () => {
//   try {
//     await pgClient.connect();
//     const email = await addEmailAddress('example@example.com');
//     console.log('Added email address:', email);

//     const mailbox = await addMailbox(email.id, 'Inbox');
//     console.log('Added mailbox:', mailbox);

//     const message = await addEmailMessage(email.id, 'Hello World', 'This is a test email.');
//     console.log('Added email message:', message);
//   } catch (err) {
//     console.error('Error:', err);
//   } finally {
//     await pgClient.end();
//   }
// })();
