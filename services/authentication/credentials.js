const bcrypt = require('bcrypt');
const crypto = require('crypto');
const NewAccount = require('../../models/accounts');

function mailSha(mail) {
    const hash = crypto.createHash('sha512');
    hash.update(mail);

    //converts mail into 512/8 = 64 byte hash value
    //appreciated by the magic of cryptography :)
    return hash.digest("hex");
}

async function hashPassword(pass) {
    let salt = await bcrypt.genSalt(6);
    pass = await bcrypt.hash(pass,salt);
    return [pass,salt];
}

function encryptName(name,key) {
    const cipher = crypto.createCipheriv('aes-256-ecb',Buffer.from(key),null);
    let encrypted = cipher.update(name,'utf8','base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

function decrypt(name, key) {
    const decipher = crypto.createDecipheriv('aes-256-ecb', Buffer.from(key), null); // No IV for ECB mode
    let decrypted = decipher.update(name, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

async function createAccount(mail,pass,name) {
    mail = mailSha(mail);
    let saltPass;
    await hashPassword(pass).then(([x,y])=>{
        pass = x;
        saltPass = y;
    });
    name = encryptName(name,`${saltPass}000`);
    const account = new NewAccount({
        name,
        email:mail,
        password:pass,
        salt:saltPass,
    });
    try{
        await account.save();
    } catch(err) {
        throw new Error(`Something wrong in credentials: ${err.message}`);
    }
}

async function validateCredentials(mail,pass) {
    mail = mailSha(mail);
    try {
        const users = await NewAccount.find({email:mail});
        if(users.length === 0) {
            console.log("Does not exists");
            return null;
        }
        hashedPassword = users[0].password;
        const matched = await bcrypt.compare(pass,hashedPassword);
        if(matched) {
            //generateToken and send it back to user
        } else {
            console.log("Not matched");
            return null;
        }
        return matched;
    } catch (err) {
        console.log(err.message);
    }
    return false;
}

module.exports = {validateCredentials,createAccount};