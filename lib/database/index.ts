import mongoose from 'mongoose';

const MONGOB_URI= process.env.MONGOB_URI;

let cached = (global as any).mongoose || { conn:null,promise:null};

export const connectToDatabase = async ()=>{
    if (cached.conn) return cached.conn;

    if(!MONGOB_URI) throw new Error('MONGOB_URI is missing');

    cached.promise= cached.promise || mongoose.connect(MONGOB_URI,{
        dbName:'evently',
        bufferCommands:false,
    })

    cached.conn= await cached.promise;
    return cached.conn;
}