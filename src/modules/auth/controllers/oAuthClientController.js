import { nanoid } from "nanoid";
import OAuthClient from "../models/oAuthClientModel.js";

// Create OAuth client (app registration)
export const createOAuthClient = async (req, res) => {
  try {
    const clientId = `oc_${nanoid(32)}`;
    const clientSecret = `ocs_${nanoid(64)}`;

    const client = await OAuthClient.create({
      ...req.body,
      clientId,
      clientSecret
    });

    res.status(201).json({
      success: true,
      message: "OAuth client created",
      data: client
    });
  } catch (error) {
    console.error("Error creating OAuth client:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all OAuth clients for a user
export const getUserOAuthClients = async (req, res) => {
  try {
    const clients = await OAuthClient.find({
      ownerUserId: req.params.userId
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: clients });
  } catch (error) {
    console.error("Error fetching OAuth clients:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get specific OAuth client
export const getOAuthClientById = async (req, res) => {
  try {
    const client = await OAuthClient.findById(req.params.id);

    if (!client)
      return res
        .status(404)
        .json({ success: false, message: "OAuth client not found" });

    res.status(200).json({ success: true, data: client });
  } catch (error) {
    console.error("Error fetching OAuth client:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Disable OAuth client
export const disableOAuthClient = async (req, res) => {
  try {
    const client = await OAuthClient.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "OAuth client disabled",
      data: client
    });
  } catch (error) {
    console.error("Error disabling OAuth client:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete OAuth client
export const deleteOAuthClient = async (req, res) => {
  try {
    await OAuthClient.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "OAuth client deleted"
    });
  } catch (error) {
    console.error("Error deleting OAuth client:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
