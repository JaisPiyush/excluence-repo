import mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const NFTCollectionSchema = new Schema({
    externalURL: 'String',
    address: 'String',
    contractName: 'String'

})

export const NFTCollection = new mongoose.Model('NFTCollection', NFTCollectionSchema);