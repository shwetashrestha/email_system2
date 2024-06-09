-- Create table for user email addresses
CREATE TABLE user_emails (
    id SERIAL PRIMARY KEY,
    email_address VARCHAR(255) UNIQUE NOT NULL
);

-- Create table for mailbox details
CREATE TABLE mailbox_details (
    id SERIAL PRIMARY KEY,
    user_email_id INT REFERENCES user_emails(id),
    mailbox_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table for email messages
CREATE TABLE email_messages (
    id SERIAL PRIMARY KEY,
    user_email_id INT REFERENCES user_emails(id),
    subject VARCHAR(255),
    body TEXT,
    received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
//"start": "node build/index.js"