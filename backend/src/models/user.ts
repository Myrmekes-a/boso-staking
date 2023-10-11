/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import mongoose from 'mongoose';
import validator from 'validator';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { CustomError } from '../utils/customError';
import logger from '../utils/logger/logger';

const userSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [40, 'Name should be under 40 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      validate: [validator.isEmail, 'Please enter email in correct format'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'password should be atleast 6 char'],
      select: false, // select false, we don't want to return
      // the encrypted password in every find
      // user must select it manually ex: await User.findOne({ email }).select('+password');
    },
    role: {
      type: String,
      default: 'user',
      // maybe add enumeration?
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestamps: true }
);

// encrypt password before save - HOOKS
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await argon2.hash(this.password);
  } catch (err: any) {
    this.password = '';
    next(new CustomError('Error in Encrypting the user password.', 422));
  }
});

// validate the password with passed on user password
userSchema.methods.isValidatedPassword = async function (
  usersendPassword: string
) {
  try {
    return await argon2.verify(this.password, usersendPassword);
  } catch (err: any) {
    logger.error({
      message: 'Error in isValidatedPassword, could not validate the password',
      meta: {
        stack: err.stack || '',
        method: 'userSchema.methods.isValidatedPassword',
      },
    });
  }
};

// create and return jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// generate forgot password token (string) // db solution
userSchema.methods.getForgotPasswordToken = function () {
  // generate a long and randomg string
  const forgotToken = crypto.randomBytes(20).toString('hex');

  // getting a hash - make sure to get a hash on backend
  this.forgotPasswordToken = crypto
    .createHash('sha256')
    .update(forgotToken)
    .digest('hex');

  // time of token
  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

  return forgotToken;
};

// generate forgot password token (string) // jwt Token solution
userSchema.methods.getForgotPasswordJwtToken = function () {
  // generate jwt token with id and email(not needed)
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_PASSWORD_RESET_EXPIRY,
    }
  );
};

export = mongoose.model('User', userSchema);
