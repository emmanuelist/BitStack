import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  postId: number;
  author: string; // STX address
  content: string;
  timestamp: Date;
  likes: number;
  comments: mongoose.Types.ObjectId[];
}

const PostSchema: Schema = new Schema({
  postId: { type: Number, required: true, unique: true },
  author: { type: String, required: true },
  content: { type: String, required: true, maxlength: 280 },
  timestamp: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

export default mongoose.model<IPost>('Post', PostSchema);