import React from "react";
import CookiePopup from "./CookiePopup";

export default {
  title: "Game/CookiePopup",
  component: CookiePopup,
};

export const Default = {
  args: {
    initialConsent: {
      necessary: true,
      analytics: false,
      marketing: false,
    },
  },
};

export const AnalyticsEnabled = {
  args: {
    initialConsent: {
      necessary: true,
      analytics: true,
      marketing: false,
    },
  },
};

export const MarketingEnabled = {
  args: {
    initialConsent: {
      necessary: true,
      analytics: false,
      marketing: true,
    },
  },
};