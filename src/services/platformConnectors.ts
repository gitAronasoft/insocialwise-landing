// src/services/platformConnectors.ts
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// --------------------- FACEBOOK SAVE ---------------------
export async function saveFacebookAccountToBackend(accessToken: string) {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/facebook/save-account`, {
      accessToken
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
    });

    return res.data;
  } catch (err) {
    console.error("Facebook connect error", err);
    toast.error("Facebook connection failed.");
    return null;
  }
}

// --------------------- LINKEDIN AUTH ---------------------
export function redirectToLinkedInAuth() {
  const CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:5173/onboarding";
  const SCOPE =
    "w_member_social w_organization_social r_organization_social r_organization_admin openid email profile";

  const STATE = "linkedin";

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPE)}&state=${STATE}`;

  window.location.href = authUrl;
}

// --------------------- LINKEDIN TOKEN EXCHANGE ---------------------
export async function exchangeLinkedInCode(code: string, redirectUri: string) {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/auth/linkedin`,
      { code, redirectUri },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      }
    );

    return res.data.token;
  } catch (err) {
    console.error("LinkedIn token exchange failed", err);
    toast.error("LinkedIn login failed.");
    return null;
  }
}

// --------------------- LINKEDIN PAGE + PROFILE SAVE ---------------------
export async function saveLinkedInProfileData(profile, pages, accessToken) {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/linkedin/save-social-account`,
      {
        data: profile,
        accessToken,
        social_user_platform: "linkedin"
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      }
    );
    return res.data;
  } catch (err) {
    console.error("LinkedIn profile save failed", err);
    toast.error("Failed to save LinkedIn data.");
    return null;
  }
}
