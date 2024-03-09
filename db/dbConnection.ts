import mongoose from "mongoose";


 const dbConnection = async () => {
    await mongoose.connect(process.env.dbUrl as string).then(() => {
        console.log(`db connected `);
    }).catch((err) => {
        console.log({ msg: "fail connect to db", err });
    })
}

export default dbConnection;