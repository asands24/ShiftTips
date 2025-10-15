// Whop checkout URL
export const WHOP_CHECKOUT_URL = 'https://whop.com/s-s-technologies/shifttips/';

// Whop product ID from environment variables
export const WHOP_PRODUCT_ID = import.meta.env.WHOP_PRODUCT_ID;

const PRO_KEY = 'shifttips_pro';
const PRESETS_KEY = 'shifttips_presets';

export interface Preset {
  id: string;
  name: string;
  staff: Array<{
    name: string;
    role: string;
    hours: number;
  }>;
  splitMethod: string;
  rounding: number;
}

export function isPro(): boolean {
  return localStorage.getItem(PRO_KEY) === 'true';
}

export function unlockPro(): void {
  localStorage.setItem(PRO_KEY, 'true');
}

export function savePreset(preset: Preset): void {
  const presets = getPresets();
  const index = presets.findIndex(p => p.id === preset.id);

  if (index >= 0) {
    presets[index] = preset;
  } else {
    presets.push(preset);
  }

  localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
}

export function getPresets(): Preset[] {
  const stored = localStorage.getItem(PRESETS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function deletePreset(id: string): void {
  const presets = getPresets().filter(p => p.id !== id);
  localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
}

export function verifyProPurchase(userIdOrLicenseKey: string): Promise<boolean> {
  const isLicenseKey = userIdOrLicenseKey.includes('-');
  const payload = isLicenseKey ? { licenseKey: userIdOrLicenseKey } : { userId: userIdOrLicenseKey };

  return fetch('/.netlify/functions/verify-whop', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        unlockPro();
        return true;
      }
      return false;
    })
    .catch(() => false);
}
