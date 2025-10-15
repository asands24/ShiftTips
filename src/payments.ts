// TODO: Replace with your Whop checkout URL
// Create a product on Whop and get the checkout URL
export const WHOP_CHECKOUT_URL = 'https://whop.com/YOUR_PRODUCT_LINK';

// TODO: Replace with your Whop product/plan ID
export const WHOP_PRODUCT_ID = 'prod_YOUR_PRODUCT_ID';

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

export async function verifyProPurchase(userId: string): Promise<boolean> {
  try {
    const response = await fetch('/.netlify/functions/verify-whop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();

    if (data.success) {
      unlockPro();
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error verifying purchase:', error);
    return false;
  }
}
