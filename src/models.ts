import { DataTypes, Model } from 'sequelize';
import sequelize from './database';

class User extends Model {
    public id!: number;
    public email!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    tableName: 'users'
});

class MailboxDetail extends Model {
    public id!: number;
    public userId!: number;
    public detail!: string;
}

MailboxDetail.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'mailbox_details'
});

class EmailMessage extends Model {
    public id!: number;
    public userId!: number;
    public message!: string;
}

EmailMessage.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'email_messages'
});

export { User, MailboxDetail, EmailMessage };
