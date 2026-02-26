import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

/**
 * Name of the cookie used to store user consent preferences.
 * @constant {string}
 */
const COOKIE_NAME = "matchingEmojisCookieConsent";

/**
 * @typedef {Object} CookieConsent
 * @property {boolean} necessary
 * @property {boolean} analytics
 * @property {boolean} marketing
 */

/**
 * CookiePopup Component
 *
 * Displays a GDPR-compliant cookie consent popup.
 *
 * @component
 * @param {Object} props
 * @param {CookieConsent} [props.initialConsent] - Initial consent for Storybook/testing
 * @returns {JSX.Element|null}
 */
export default function CookiePopup({ initialConsent }) {
  const [show, setShow] = useState(false);

/**
 * State for cookie consent.
 * @type {CookieConsent}
 */
const [consent, setConsent] = useState(
  initialConsent || {
    necessary: true,
    analytics: false,
    marketing: false
  }
);
  /**
   * Check for saved consent or show popup
   */
  useEffect(() => {
    if (initialConsent) {
      setShow(true);
      return;
    }

    const savedConsent = Cookies.get(COOKIE_NAME);
    if (!savedConsent) {
      setShow(true);
    } else {
      setConsent(JSON.parse(savedConsent));
    }
  }, [initialConsent]);

  const acceptAll = () => {
    const allConsent = { necessary: true, analytics: true, marketing: true };
    Cookies.set(COOKIE_NAME, JSON.stringify(allConsent), { expires: 365 });
    setConsent(allConsent);
    setShow(false);
  };

  const saveConsent = () => {
    Cookies.set(COOKIE_NAME, JSON.stringify(consent), { expires: 365 });
    setShow(false);
  };

  const toggleCategory = (category) => {
    setConsent(prev => ({ ...prev, [category]: !prev[category] }));
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#2B373B",
      color: "#fff",
      padding: "20px",
      borderRadius: "5px",
      zIndex: 9999,
      width: "320px",
      textAlign: "center"
    }}>
      <p>This website uses cookies for functionality, analytics, and marketing purposes.</p>

      <div style={{ textAlign: "left", marginTop: "10px" }}>
        <label>
          <input type="checkbox" checked disabled /> Necessary (always active)
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={consent.analytics}
            onChange={() => toggleCategory("analytics")}
          /> Analytics
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={consent.marketing}
            onChange={() => toggleCategory("marketing")}
          /> Marketing
        </label>
      </div>

      <div style={{ marginTop: "15px" }}>
        <button onClick={acceptAll} style={{ marginRight: "10px", cursor: "pointer" }}>
          Accept all
        </button>
        <button onClick={saveConsent} style={{ cursor: "pointer" }}>
          Save preferences
        </button>
      </div>

      <p style={{ marginTop: "10px", fontSize: "12px" }}>
        <a href="/privacy-policy.html" style={{ color: "#fff", textDecoration: "underline" }}>
          Privacy Policy
        </a>
      </p>
    </div>
  );
}