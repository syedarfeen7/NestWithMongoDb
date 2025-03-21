import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Adds createdAt & updatedAt
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: false, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop({ required: false })
  address: string;

  @Prop({ required: false })
  otp?: string;

  @Prop({ required: false })
  otpExpiresAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
