import mongoose from "mongoose";
import NFTCollectionService from "./nftCollection.service";

export {NFTCollectionService}

export const connectMongo = async () => await mongoose.connect(process.env['MONGO_URL'] as string)

export const disconnectMongo = async () => await mongoose.disconnect()

