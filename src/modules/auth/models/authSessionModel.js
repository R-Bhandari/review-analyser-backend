import mongoose from "mongoose";

const authSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    deviceId: {
      type: String,
      default: null // will connect later with Device model (K.6)
    },

    ipAddress: {
      type: String,
      required: false
    },

    userAgent: {
      type: String,
      required: false
    },

    location: {
      country: { type: String, default: null },
      city: { type: String, default: null },
      region: { type: String, default: null }
    },

    loginTime: {
      type: Date,
      default: Date.now
    },

    logoutTime: {
      type: Date,
      default: null
    },

    isActive: {
      type: Boolean,
      default: true
    },

    sessionToken: {
      type: String,
      required: true,
      unique: true
      // A random session key (NOT JWT), stored hashed in production for safety
    },

    expiresAt: {
      type: Date,
      required: true
    },

    revokedReason: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

authSessionSchema.index({ userId: 1 });
authSessionSchema.index({ sessionToken: 1 });
authSessionSchema.index({ isActive: 1 });

const AuthSession = mongoose.model("AuthSession", authSessionSchema);
export default AuthSession;
