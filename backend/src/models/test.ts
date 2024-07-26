// Import mongoose and required types
import mongoose, { Schema, Document } from 'mongoose';

// Define interface for TypeScript type checking based on frontend data
interface ITest extends Document {
  attendedOn: Date;
  score?: number;
  timePerQuestion?: number;
  totalQuestion?: number;
}

// Define schema based on frontend data
const testSchema: Schema = new Schema({
   questionBankId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuestionBank'
   },
   score: Number,
   totalTime: Number,
   avgTime: Number,
   timeSpend: [Number],
   date: {
      type: Number,
      default: Date.now()
   }
});

// Create and export Test model
export const Test = mongoose.model<ITest>('Test', testSchema);
