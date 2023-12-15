import mongoose from 'mongoose';

const MONGO_URI= process.env.MONGOB_URI;

let cached = (global as any).mongoose || { conn:null,promise:null};

export const connectToDatabase = async ()=>{
    if (cached.conn) return cached.conn;

    if(!MONGO_URI) throw new Error('MONGOB_URI is missing');

    cached.promise= cached.promise || mongoose.connect(MONGO_URI,{
        dbName:'evently',
        bufferCommands:false,
    })

    cached.conn= await cached.promise;
    return cached.conn;
}