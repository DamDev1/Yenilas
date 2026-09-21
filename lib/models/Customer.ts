import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  phone?: string;
  branchId?: mongoose.Types.ObjectId;
  debtBalance: number;
  customerType: 'retail' | 'distributor';
  totalPaintsDelivered: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    debtBalance: { type: Number, required: true, default: 0 },
    customerType: { type: String, enum: ['retail', 'distributor'], default: 'retail' },
    totalPaintsDelivered: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Customer: Model<ICustomer> = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);

export default Customer;
