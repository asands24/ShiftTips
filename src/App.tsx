import { useState, useEffect } from 'react';
import {
  isPro,
  savePreset,
  getPresets,
  deletePreset,
  verifyProPurchase,
  WHOP_CHECKOUT_URL,
  type Preset
} from './payments';

interface Staff {
  id: string;
  name: string;
  role: string;
  hours: number;
}

interface Payout extends Staff {
  amount: number;
}

const ROLES = [
  { name: 'Bartender', points: 4 },
  { name: 'Server', points: 3 },
  { name: 'Host', points: 2 },
  { name: 'Busser', points: 1 },
];

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [isProUser, setIsProUser] = useState(isPro());
  const [totalTips, setTotalTips] = useState('');
  const [staff, setStaff] = useState<Staff[]>([]);
  const [splitMethod, setSplitMethod] = useState('equal');
  const [rounding, setRounding] = useState(0.01);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [presetName, setPresetName] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');
  const [licenseError, setLicenseError] = useState('');

  useEffect(() => {
    // Check for Whop success redirect
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('user_id');

    if (userId && !isPro()) {
      setVerifying(true);
      verifyProPurchase(userId).then(success => {
        setVerifying(false);
        if (success) {
          setIsProUser(true);
          window.history.replaceState({}, '', '/');
        }
      });
    }

    if (isPro()) {
      setPresets(getPresets());
    }
  }, []);

  const addStaff = () => {
    setStaff([...staff, {
      id: Date.now().toString(),
      name: '',
      role: 'Server',
      hours: 0,
    }]);
  };

  const updateStaff = (id: string, field: keyof Staff, value: string | number) => {
    setStaff(staff.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeStaff = (id: string) => {
    setStaff(staff.filter(s => s.id !== id));
  };

  const roundAmount = (amount: number): number => {
    return Math.round(amount / rounding) * rounding;
  };

  const calculate = () => {
    const tips = parseFloat(totalTips);
    if (!tips || staff.length === 0) return;

    let results: Payout[] = [];

    if (splitMethod === 'equal') {
      const perPerson = tips / staff.length;
      results = staff.map(s => ({
        ...s,
        amount: roundAmount(perPerson),
      }));
    } else if (splitMethod === 'hours') {
      const totalHours = staff.reduce((sum, s) => sum + s.hours, 0);
      if (totalHours === 0) return;

      results = staff.map(s => ({
        ...s,
        amount: roundAmount((s.hours / totalHours) * tips),
      }));
    } else if (splitMethod === 'points') {
      const totalPoints = staff.reduce((sum, s) => {
        const role = ROLES.find(r => r.name === s.role);
        return sum + (role ? role.points * s.hours : 0);
      }, 0);

      if (totalPoints === 0) return;

      results = staff.map(s => {
        const role = ROLES.find(r => r.name === s.role);
        const points = role ? role.points * s.hours : 0;
        return {
          ...s,
          amount: roundAmount((points / totalPoints) * tips),
        };
      });
    }

    // Adjust for rounding discrepancies
    const totalPaid = results.reduce((sum, r) => sum + r.amount, 0);
    const diff = tips - totalPaid;

    if (Math.abs(diff) >= rounding && results.length > 0) {
      results[0].amount = roundAmount(results[0].amount + diff);
    }

    setPayouts(results);
  };

  const exportCSV = () => {
    if (!isProUser) return;

    const headers = ['Name', 'Role', 'Hours', 'Payout'];
    const rows = payouts.map(p => [p.name, p.role, p.hours, p.amount.toFixed(2)]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shifttips-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSavePreset = () => {
    if (!isProUser || !presetName.trim()) return;

    const preset: Preset = {
      id: Date.now().toString(),
      name: presetName.trim(),
      staff: staff.map(s => ({ name: s.name, role: s.role, hours: s.hours })),
      splitMethod,
      rounding,
    };

    savePreset(preset);
    setPresets(getPresets());
    setPresetName('');
  };

  const loadPreset = (preset: Preset) => {
    setStaff(preset.staff.map(s => ({ ...s, id: Date.now().toString() + Math.random() })));
    setSplitMethod(preset.splitMethod);
    setRounding(preset.rounding);
  };

  const handleDeletePreset = (id: string) => {
    deletePreset(id);
    setPresets(getPresets());
  };

  const print = () => {
    window.print();
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your purchase...</p>
        </div>
      </div>
    );
  }

  if (showLanding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ShiftTips
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Split tips fairly in 30 seconds
            </p>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">✨ Free Features</h2>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• Calculate tips by equal split, hours, or role points</li>
                <li>• Add unlimited staff members</li>
                <li>• Customizable rounding (1¢ or 5¢)</li>
                <li>• Printable summary</li>
              </ul>

              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-6">
                <h2 className="text-lg font-bold mb-3">🚀 Pro - $19 Lifetime</h2>
                <ul className="space-y-2 mb-4">
                  <li>• Export to CSV</li>
                  <li>• Save & load presets</li>
                  <li>• One-time payment, yours forever</li>
                </ul>
                {!isProUser && (
                  <>
                    <a
                      href={WHOP_CHECKOUT_URL}
                      className="block w-full bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition text-center mb-4"
                    >
                      Unlock Pro for $19
                    </a>
                    <div className="text-white/90 text-center mb-4">- or -</div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={licenseKey}
                        onChange={(e) => setLicenseKey(e.target.value)}
                        placeholder="Enter license key"
                        className="block w-full bg-white text-gray-900 py-3 px-6 rounded-lg focus:outline-none"
                      />
                      {licenseError && (
                        <div className="text-red-200 text-sm">{licenseError}</div>
                      )}
                      <button
                        onClick={() => {
                          setVerifying(true);
                          setLicenseError('');
                          verifyProPurchase(licenseKey)
                            .then(success => {
                              setVerifying(false);
                              if (success) {
                                setIsProUser(true);
                              } else {
                                setLicenseError('Invalid license key');
                              }
                            })
                            .catch(() => {
                              setVerifying(false);
                              setLicenseError('Error verifying license key');
                            });
                        }}
                        disabled={!licenseKey.trim() || verifying}
                        className="block w-full bg-white/20 text-white font-bold py-3 px-6 rounded-lg hover:bg-white/30 transition text-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {verifying ? 'Verifying...' : 'Activate with License Key'}
                      </button>
                    </div>
                  </>
                )}
                {isProUser && (
                  <div className="bg-white/20 py-3 px-6 rounded-lg text-center font-semibold">
                    ✓ Pro Activated
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowLanding(false)}
              className="w-full bg-indigo-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-indigo-700 transition text-lg"
            >
              Start Calculating Tips
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6 no-print">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">ShiftTips</h1>
          {isProUser && (
            <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              PRO
            </span>
          )}
        </div>

        {isProUser && presets.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6 no-print">
            <h2 className="text-lg font-semibold mb-3">Saved Presets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {presets.map(preset => (
                <div key={preset.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{preset.name}</span>
                    <button
                      onClick={() => handleDeletePreset(preset.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                  <button
                    onClick={() => loadPreset(preset)}
                    className="w-full bg-gray-100 hover:bg-gray-200 py-2 rounded text-sm"
                  >
                    Load
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Total Tips ($)</label>
              <input
                type="number"
                step="0.01"
                value={totalTips}
                onChange={(e) => setTotalTips(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-indigo-500 focus:outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Split Method</label>
              <select
                value={splitMethod}
                onChange={(e) => setSplitMethod(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-indigo-500 focus:outline-none"
              >
                <option value="equal">Equal Split</option>
                <option value="hours">Weighted by Hours</option>
                <option value="points">Role Points</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Rounding</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="0.01"
                  checked={rounding === 0.01}
                  onChange={() => setRounding(0.01)}
                  className="mr-2"
                />
                1¢
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="0.05"
                  checked={rounding === 0.05}
                  onChange={() => setRounding(0.05)}
                  className="mr-2"
                />
                5¢
              </label>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Staff</h2>
              <button
                onClick={addStaff}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-semibold no-print"
              >
                + Add Staff
              </button>
            </div>

            <div className="space-y-3">
              {staff.map((person) => (
                <div key={person.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center border-b pb-3">
                  <input
                    type="text"
                    value={person.name}
                    onChange={(e) => updateStaff(person.id, 'name', e.target.value)}
                    placeholder="Name"
                    className="md:col-span-4 border rounded-lg px-3 py-2 focus:border-indigo-500 focus:outline-none"
                  />
                  <select
                    value={person.role}
                    onChange={(e) => updateStaff(person.id, 'role', e.target.value)}
                    className="md:col-span-3 border rounded-lg px-3 py-2 focus:border-indigo-500 focus:outline-none"
                  >
                    {ROLES.map(role => (
                      <option key={role.name} value={role.name}>{role.name}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    step="0.5"
                    value={person.hours}
                    onChange={(e) => updateStaff(person.id, 'hours', parseFloat(e.target.value) || 0)}
                    placeholder="Hours"
                    className="md:col-span-3 border rounded-lg px-3 py-2 focus:border-indigo-500 focus:outline-none"
                  />
                  <button
                    onClick={() => removeStaff(person.id)}
                    className="md:col-span-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 no-print"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-green-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-green-700 transition text-lg no-print"
          >
            Calculate Payouts
          </button>
        </div>

        {payouts.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Hours</th>
                    <th className="px-4 py-3 text-right">Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((payout) => (
                    <tr key={payout.id} className="border-b">
                      <td className="px-4 py-3 font-medium">{payout.name}</td>
                      <td className="px-4 py-3">{payout.role}</td>
                      <td className="px-4 py-3">{payout.hours}</td>
                      <td className="px-4 py-3 text-right font-bold text-green-600">
                        ${payout.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-gray-50">
                    <td colSpan={3} className="px-4 py-3">Total</td>
                    <td className="px-4 py-3 text-right">
                      ${payouts.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-3 mt-6 no-print">
              <button
                onClick={print}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-semibold"
              >
                Print Summary
              </button>

              {isProUser ? (
                <>
                  <button
                    onClick={exportCSV}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold"
                  >
                    Export CSV
                  </button>

                  <div className="flex gap-2 flex-1 min-w-[250px]">
                    <input
                      type="text"
                      value={presetName}
                      onChange={(e) => setPresetName(e.target.value)}
                      placeholder="Preset name..."
                      className="flex-1 border rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none"
                    />
                    <button
                      onClick={handleSavePreset}
                      disabled={!presetName.trim()}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save Preset
                    </button>
                  </div>
                </>
              ) : (
                <a
                  href={WHOP_CHECKOUT_URL}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 font-semibold"
                >
                  Unlock Pro - CSV Export & Presets ($19)
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
