import API from "./api";

export const trackActivity = async (itemId, action) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?._id) return;

    await API.post("/activity/track", {
      userId: user._id,
      itemId,
      action,
    });
  } catch (error) {
    console.log("Tracking failed:", error);
  }
};