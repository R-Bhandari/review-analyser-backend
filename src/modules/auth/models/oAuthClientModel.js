import mongoose from "mongoose";

const oAuthClientSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true
    },

    clientId: {
      type: String,
      required: true,
      unique: true
    },

    clientSecret: {
      type: String,
      required: true
      // In production: store HASHED secret
    },

    ownerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
      // The user who created this OAuth app
    },

    redirectUris: {
      type: [String],
      default: []
    },

    scopes: {
      type: [String],
      default: ["basic_profile"]
      // e.g. analytics.read, billing.write, etc.
    },

    rateLimit: {
      type: Number,
      default: 1000
      // max requests per day (per client)
    },

    isActive: {
      type: Boolean,
      default: true
    },

    description: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

oAuthClientSchema.index({ clientId: 1 });

const OAuthClient = mongoose.model("OAuthClient", oAuthClientSchema);
export default OAuthClient;
