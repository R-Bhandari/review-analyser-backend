import SocialAccount from "../models/socialAccountModel.js";

// Link a social account
export const linkSocialAccount = async (req, res) => {
  try {
    const {
      userId,
      provider,
      providerUserId,
      email,
      accessToken,
      refreshToken,
      avatar,
      profileData
    } = req.body;

    let existing = await SocialAccount.findOne({
      provider,
      providerUserId
    });

    if (existing)
      return res.status(400).json({
        success: false,
        message: "This social account is already linked to a user"
      });

    const linked = await SocialAccount.create({
      userId,
      provider,
      providerUserId,
      email,
      accessToken,
      refreshToken,
      avatar,
      profileData
    });

    res.status(201).json({
      success: true,
      message: "Social account linked",
      data: linked
    });
  } catch (error) {
    console.error("Error linking social account:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all social accounts for a user
export const getUserSocialAccounts = async (req, res) => {
  try {
    const accounts = await SocialAccount.find({
      userId: req.params.userId
    }).sort({ linkedAt: -1 });

    res.status(200).json({ success: true, data: accounts });
  } catch (error) {
    console.error("Error fetching social accounts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get social account for provider
export const getProviderAccount = async (req, res) => {
  try {
    const { userId, provider } = req.params;

    const account = await SocialAccount.findOne({
      userId,
      provider
    });

    res.status(200).json({
      success: true,
      data: account
    });
  } catch (error) {
    console.error("Error fetching provider account:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Unlink social account
export const unlinkSocialAccount = async (req, res) => {
  try {
    await SocialAccount.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Social account unlinked"
    });
  } catch (error) {
    console.error("Error unlinking social account:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
