const mongoose = require('mongoose');

const connect = async () => {
    try {
        // con
        const con = await mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
        console.log(`Database Connected: ${con.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connect;