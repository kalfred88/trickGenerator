const host = 'localhost';
const port = 27017;
const user = 'Admin';
const password = 'TricKy88';
const database = 'TrickDB';

module.exports = {
    uri: `mongodb://${user}:${password}@${host}:${port}/${database}`,
    options: {
        connectTimeoutMS: 2000,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500
    }
}