import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  stxAddress: string;
  username: string;
  bio: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  stxAddress: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  bio: { type: String, maxlength: 160 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);