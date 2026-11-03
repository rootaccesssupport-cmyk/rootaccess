import React, { useState } from 'react';
import {
  Smartphone,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Code2,
  Copy,
  Check,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { AppiumInteractiveLabSpec } from '../../data/appiumCurriculumData';

interface AppiumInteractiveStudioProps {
  labSpec: AppiumInteractiveLabSpec;
  dayNumber: number;
  onComplete?: () => void;
}

export const AppiumInteractiveStudio: React.FC<AppiumInteractiveStudioProps> = ({
  labSpec,
  dayNumber,
  onComplete,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [labCompleted, setLabCompleted] = useState(false);

  // Day 1 state
  const [day1Answers, setDay1Answers] = useState<Record<string, { arch: string; locator: string }>>({
    'sc-1': { arch: '', locator: '' },
    'sc-2': { arch: '', locator: '' },
    'sc-3': { arch: '', locator: '' },
    'sc-4': { arch: '', locator: '' },
  });
  const [day1Evaluated, setDay1Evaluated] = useState(false);

  // Day 2 state
  const [day2Fixed, setDay2Fixed] = useState<{ env: boolean; driver: boolean; auth: boolean }>({
    env: false,
    driver: false,
    auth: false,
  });

  // Day 3 state
  const [day3Config, setDay3Config] = useState({
    deviceName: 'Pixel_7_API_34',
    appPackage: 'com.swaglabsmobileapp',
    appActivity: '.MainActivity',
    noReset: true,
    autoGrant: true,
  });

  // Day 4 state
  const [day4SelectedEl, setDay4SelectedEl] = useState('el-2');

  // Day 5 state
  const [day5User, setDay5User] = useState('');
  const [day5Pass, setDay5Pass] = useState('');
  const [day5KeyboardOpen, setDay5KeyboardOpen] = useState(true);
  const [day5Result, setDay5Result] = useState<string | null>(null);

  // Day 6 state
  const [day6Strategies, setDay6Strategies] = useState<Record<string, string>>({
    'sync-1': '',
    'sync-2': '',
    'sync-3': '',
  });

  // Day 7 state
  const [day7Gesture, setDay7Gesture] = useState<'scroll_down' | 'swipe_left' | 'long_press'>('scroll_down');
  const [day7Duration, setDay7Duration] = useState(600);

  // Day 8 state
  const [day8Context, setDay8Context] = useState<'NATIVE_APP' | 'WEBVIEW'>('NATIVE_APP');
  const [day8Backgrounded, setDay8Backgrounded] = useState(false);

  // Day 9 state
  const [day9Order, setDay9Order] = useState<string[]>([]);
  const day9Steps = ['@BeforeSuite', '@BeforeClass', '@BeforeMethod', '@Test', '@AfterMethod', '@AfterClass'];

  // Day 10 state
  const [day10CodeStep, setDay10CodeStep] = useState(1);

  // Day 11 state
  const [day11ActiveRow, setDay11ActiveRow] = useState(0);

  // Day 12 state
  const [day12Diagnoses, setDay12Diagnoses] = useState<Record<string, string>>({
    'fail-1': '',
    'fail-2': '',
    'fail-3': '',
  });

  // Day 13 state
  const [day13Checks, setDay13Checks] = useState<{ threadLocal: boolean; surefire: boolean; githubActions: boolean }>({
    threadLocal: false,
    surefire: false,
    githubActions: false,
  });

  // Day 14 state
  const [capstoneStep, setCapstoneStep] = useState(1);
  const [capstoneLog, setCapstoneLog] = useState<string[]>([
    'Appium 2.x session ready. Waiting to run Capstone E2E flow...',
  ]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCompleteLab = () => {
    setLabCompleted(true);
    if (onComplete) onComplete();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl text-white">
      {/* Studio Header */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Day {dayNumber} Interactive Studio
              </span>
              <span className="px-2 py-0.5 text-[9px] font-extrabold bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                Interactive Simulation
              </span>
            </div>
            <h3 className="text-base font-bold text-white">{labSpec.title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{showHint ? 'Hide Hint' : 'View Hint'}</span>
          </button>

          {labCompleted ? (
            <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lab Completed</span>
            </span>
          ) : (
            <button
              onClick={handleCompleteLab}
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verify &amp; Complete Lab</span>
            </button>
          )}
        </div>
      </div>

      {/* Notice Banner */}
      <div className="bg-emerald-950/40 border-b border-emerald-900/30 px-6 py-2.5 flex items-center justify-between text-xs text-emerald-300/90">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Learn by Doing Simulation:</strong> Real-time browser emulator simulating Android UI &amp; Appium commands. Real devices run locally via Maven &amp; ADB.
          </span>
        </div>
      </div>

      {/* Hints panel */}
      {showHint && labSpec.hints.length > 0 && (
        <div className="bg-amber-950/30 border-b border-amber-900/40 px-6 py-3 text-xs text-amber-200">
          <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Hints:</span>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {labSpec.hints.map((hint, idx) => (
              <li key={idx}>{hint}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Studio Workspace Content by Day */}
      <div className="p-6">
        {/* DAY 1: App Classifier */}
        {dayNumber === 1 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Analyze the 4 workplace scenarios below. Choose the correct Architecture (Native, Hybrid, or Mobile Web) and primary Locator Strategy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'sc-1', name: 'QuickShop Retail Android APK', hint: 'Compiled Kotlin, uses RecyclerView and native widgets' },
                { id: 'sc-2', name: 'PayFlow Payment Gateway Page', hint: 'Responsive web checkout embedded inside native WebView' },
                { id: 'sc-3', name: 'FlightBooker Web Portal', hint: 'Mobile website accessed in Google Chrome' },
                { id: 'sc-4', name: 'FitnessTracker Companion', hint: 'Direct Bluetooth sensors, native Android notifications' },
              ].map((sc) => (
                <div key={sc.id} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{sc.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{sc.id}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{sc.hint}</p>

                  <div className="space-y-2 pt-2">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">Architecture:</label>
                      <select
                        aria-label={`Architecture for ${sc.name}`}
                        value={day1Answers[sc.id]?.arch || ''}
                        onChange={(e) =>
                          setDay1Answers({
                            ...day1Answers,
                            [sc.id]: { ...day1Answers[sc.id], arch: e.target.value },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="">-- Select Architecture --</option>
                        <option value="Native">Native Mobile App</option>
                        <option value="Hybrid">Hybrid Mobile App</option>
                        <option value="Mobile Web">Mobile Web App</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">Recommended Locator:</label>
                      <select
                        aria-label={`Recommended Locator for ${sc.name}`}
                        value={day1Answers[sc.id]?.locator || ''}
                        onChange={(e) =>
                          setDay1Answers({
                            ...day1Answers,
                            [sc.id]: { ...day1Answers[sc.id], locator: e.target.value },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="">-- Select Locator Strategy --</option>
                        <option value="Accessibility ID">Accessibility ID / Resource ID</option>
                        <option value="Context Switch">Context Switch to WEBVIEW (CSS / XPath)</option>
                        <option value="Selenium CSS">Standard Selenium CSS Selectors</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setDay1Evaluated(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Evaluate Strategy Alignment</span>
              </button>

              {day1Evaluated && (
                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Architecture Alignment: 100% Correct!</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* DAY 2: Environment Doctor */}
        {dayNumber === 2 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Review system diagnostics and apply remediation commands to bring your Appium environment to 100% operational status.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">System Diagnostics Check</span>
                  <span className="text-[10px] text-emerald-400 font-bold">
                    {day2Fixed.env && day2Fixed.driver && day2Fixed.auth ? '5 / 5 PASSED' : '2 / 5 ISSUES'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-slate-900 rounded-xl">
                    <span>Java JDK 17 / 21</span>
                    <span className="text-emerald-400 font-bold">PASS (Adoptium 17)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-900 rounded-xl">
                    <span>ANDROID_HOME &amp; PATH</span>
                    <span className={day2Fixed.env ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {day2Fixed.env ? 'PASS' : 'FAIL (Missing)'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-900 rounded-xl">
                    <span>Appium 2.x Server</span>
                    <span className="text-emerald-400 font-bold">PASS (v2.5.1)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-900 rounded-xl">
                    <span>UiAutomator2 Driver</span>
                    <span className={day2Fixed.driver ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {day2Fixed.driver ? 'PASS (Installed)' : 'FAIL (Not installed)'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-900 rounded-xl">
                    <span>ADB Device Authorization</span>
                    <span className={day2Fixed.auth ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                      {day2Fixed.auth ? 'PASS (Device ready)' : 'WARNING (Unauthorized)'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
                <span className="text-xs font-bold text-white">Remediation Action Workbench</span>
                <p className="text-[11px] text-slate-400">Click to execute fixes in the virtual environment:</p>

                <div className="space-y-2">
                  <button
                    onClick={() => setDay2Fixed({ ...day2Fixed, env: true })}
                    disabled={day2Fixed.env}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                      day2Fixed.env
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer'
                    }`}
                  >
                    <span>export ANDROID_HOME=$HOME/Android/sdk</span>
                    {day2Fixed.env && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>

                  <button
                    onClick={() => setDay2Fixed({ ...day2Fixed, driver: true })}
                    disabled={day2Fixed.driver}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                      day2Fixed.driver
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer'
                    }`}
                  >
                    <span>appium driver install uiautomator2</span>
                    {day2Fixed.driver && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>

                  <button
                    onClick={() => setDay2Fixed({ ...day2Fixed, auth: true })}
                    disabled={day2Fixed.auth}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                      day2Fixed.auth
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer'
                    }`}
                  >
                    <span>Accept Phone RSA Key Dialog (adb devices)</span>
                    {day2Fixed.auth && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DAY 3: Options Builder */}
        {dayNumber === 3 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Configure UiAutomator2Options parameters and inspect the compiled Java TestNG class in real-time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
                <span className="text-xs font-bold text-white">Capability Controls</span>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Device Name / AVD:</label>
                    <input
                      type="text"
                      value={day3Config.deviceName}
                      onChange={(e) => setDay3Config({ ...day3Config, deviceName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">App Package:</label>
                    <input
                      type="text"
                      value={day3Config.appPackage}
                      onChange={(e) => setDay3Config({ ...day3Config, appPackage: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">App Activity:</label>
                    <input
                      type="text"
                      value={day3Config.appActivity}
                      onChange={(e) => setDay3Config({ ...day3Config, appActivity: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-300">Preserve state (setNoReset)</span>
                    <input
                      type="checkbox"
                      checked={day3Config.noReset}
                      onChange={(e) => setDay3Config({ ...day3Config, noReset: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-300">Auto Grant Permissions</span>
                    <input
                      type="checkbox"
                      checked={day3Config.autoGrant}
                      onChange={(e) => setDay3Config({ ...day3Config, autoGrant: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-600"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3 font-mono text-[11px] text-slate-300">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Compiled Java Test Class</span>
                  <button
                    onClick={() =>
                      handleCopy(`UiAutomator2Options options = new UiAutomator2Options()
    .setPlatformName("Android")
    .setAutomationName("UiAutomator2")
    .setDeviceName("${day3Config.deviceName}")
    .setAppPackage("${day3Config.appPackage}")
    .setAppActivity("${day3Config.appActivity}")
    .setNoReset(${day3Config.noReset})
    .setAutoGrantPermissions(${day3Config.autoGrant});`)
                    }
                    className="hover:text-white cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="bg-slate-900 p-3 rounded-xl overflow-x-auto text-emerald-300">
{`UiAutomator2Options options = new UiAutomator2Options()
    .setPlatformName("Android")
    .setAutomationName("UiAutomator2")
    .setDeviceName("${day3Config.deviceName}")
    .setAppPackage("${day3Config.appPackage}")
    .setAppActivity("${day3Config.appActivity}")
    .setNoReset(${day3Config.noReset})
    .setAutoGrantPermissions(${day3Config.autoGrant});

AndroidDriver driver = new AndroidDriver(
    URI.create("http://127.0.0.1:4723").toURL(),
    options
);`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* DAY 4: Locator Inspector */}
        {dayNumber === 4 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Click elements on the phone mockup to inspect their XML attributes and select the best locator strategy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Mockup */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 flex flex-col items-center">
                <div className="w-64 bg-slate-900 border-2 border-slate-700 rounded-3xl p-3 shadow-2xl space-y-3">
                  <div className="w-16 h-1 bg-slate-700 rounded-full mx-auto" />
                  
                  {/* Mock App Header */}
                  <div
                    onClick={() => setDay4SelectedEl('el-1')}
                    className={`p-2 rounded-xl text-center cursor-pointer transition-all border ${
                      day4SelectedEl === 'el-1'
                        ? 'bg-emerald-500/20 border-emerald-500'
                        : 'bg-slate-800 border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-extrabold text-white">SWAG LABS</span>
                  </div>

                  {/* Input 1 */}
                  <div
                    onClick={() => setDay4SelectedEl('el-2')}
                    className={`p-2 rounded-xl cursor-pointer transition-all border ${
                      day4SelectedEl === 'el-2'
                        ? 'bg-emerald-500/20 border-emerald-500'
                        : 'bg-slate-800 border-slate-700'
                    }`}
                  >
                    <span className="text-[11px] text-slate-400 block">Username</span>
                    <span className="text-xs text-white">standard_user</span>
                  </div>

                  {/* Submit Button */}
                  <div
                    onClick={() => setDay4SelectedEl('el-3')}
                    className={`p-2.5 rounded-xl text-center cursor-pointer transition-all border font-bold text-xs ${
                      day4SelectedEl === 'el-3'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-emerald-600 text-white border-transparent'
                    }`}
                  >
                    LOGIN
                  </div>

                  {/* Error Toast */}
                  <div
                    onClick={() => setDay4SelectedEl('el-4')}
                    className={`p-2 rounded-xl cursor-pointer transition-all border text-[10px] ${
                      day4SelectedEl === 'el-4'
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-rose-950/60 border-rose-900/60 text-rose-300'
                    }`}
                  >
                    Username is required
                  </div>
                </div>
              </div>

              {/* Inspector Attributes Panel */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
                <span className="font-bold text-white">Appium Inspector XML Attributes</span>
                
                {day4SelectedEl === 'el-1' && (
                  <div className="space-y-1.5 font-mono text-[11px]">
                    <div><span className="text-slate-500">class:</span> android.widget.ImageView</div>
                    <div><span className="text-slate-500">content-desc:</span> App Logo</div>
                    <div><span className="text-slate-500">resource-id:</span> com.swaglabsmobileapp:id/app_logo</div>
                    <div className="pt-2 text-emerald-400 font-bold">Recommended: AppiumBy.accessibilityId("App Logo")</div>
                  </div>
                )}

                {day4SelectedEl === 'el-2' && (
                  <div className="space-y-1.5 font-mono text-[11px]">
                    <div><span className="text-slate-500">class:</span> android.widget.EditText</div>
                    <div><span className="text-slate-500">content-desc:</span> test-Username</div>
                    <div><span className="text-slate-500">resource-id:</span> com.swaglabsmobileapp:id/user_name</div>
                    <div className="pt-2 text-emerald-400 font-bold">Recommended: AppiumBy.accessibilityId("test-Username")</div>
                  </div>
                )}

                {day4SelectedEl === 'el-3' && (
                  <div className="space-y-1.5 font-mono text-[11px]">
                    <div><span className="text-slate-500">class:</span> android.widget.TextView</div>
                    <div><span className="text-slate-500">content-desc:</span> test-LOGIN</div>
                    <div><span className="text-slate-500">text:</span> LOGIN</div>
                    <div className="pt-2 text-emerald-400 font-bold">Recommended: AppiumBy.accessibilityId("test-LOGIN")</div>
                  </div>
                )}

                {day4SelectedEl === 'el-4' && (
                  <div className="space-y-1.5 font-mono text-[11px]">
                    <div><span className="text-slate-500">class:</span> android.widget.TextView</div>
                    <div><span className="text-slate-500">resource-id:</span> com.swaglabsmobileapp:id/error_message</div>
                    <div><span className="text-slate-500">text:</span> Username is required</div>
                    <div className="pt-2 text-emerald-400 font-bold">Recommended: AppiumBy.id("com.swaglabsmobileapp:id/error_message")</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* DAY 5: Form Assertion Studio */}
        {dayNumber === 5 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Type credentials, test soft keyboard dismissal, and verify TestNG Assertion behavior.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
                <span className="font-bold text-white">Mobile Input Form</span>
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Username:</label>
                    <input
                      type="text"
                      placeholder="e.g. standard_user or locked_out_user"
                      value={day5User}
                      onChange={(e) => setDay5User(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Password:</label>
                    <input
                      type="password"
                      placeholder="secret_sauce"
                      value={day5Pass}
                      onChange={(e) => setDay5Pass(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-300">Soft Keyboard State:</span>
                    <button
                      onClick={() => setDay5KeyboardOpen(!day5KeyboardOpen)}
                      className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                    >
                      {day5KeyboardOpen ? 'Visible (driver.isKeyboardShown() == true)' : 'Hidden (driver.hideKeyboard())'}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (day5KeyboardOpen) {
                        setDay5Result('ERROR: ElementClickInterceptedException! Keyboard covered the LOGIN button.');
                      } else if (day5User === 'standard_user' && day5Pass === 'secret_sauce') {
                        setDay5Result('SUCCESS: Assert.assertTrue(productsHeader.isDisplayed()) PASSED.');
                      } else if (day5User === 'locked_out_user') {
                        setDay5Result('ASSERTION PASS: Assert.assertEquals(errorText, "Sorry, this user has been locked out.")');
                      } else {
                        setDay5Result('ASSERTION PASS: Assert.assertEquals(errorText, "Username and password do not match")');
                      }
                    }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer mt-2"
                  >
                    Tap Login &amp; Evaluate Assertions
                  </button>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3 font-mono text-xs">
                <span className="font-bold text-white">TestNG Execution Console</span>
                <div className="bg-slate-900 p-3 rounded-xl min-h-[140px] text-[11px] text-slate-300">
                  {day5Result ? (
                    <div className={day5Result.startsWith('ERROR') ? 'text-rose-400' : 'text-emerald-400'}>
                      {day5Result}
                    </div>
                  ) : (
                    <div className="text-slate-500">Awaiting user input and assertion trigger...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DAY 6: Wait Decision Simulator */}
        {dayNumber === 6 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Select the appropriate ExpectedCondition for each asynchronous delay to eliminate test flakiness.
            </p>

            <div className="space-y-3">
              {[
                { id: 'sync-1', title: 'Slow Order Submission API (3200ms delay)', correct: 'invisibilityOfElementLocated' },
                { id: 'sync-2', title: 'Animated Promo Modal Close Button (1500ms transition)', correct: 'elementToBeClickable' },
                { id: 'sync-3', title: 'Pull-To-Refresh RecyclerView List Redraw', correct: 'refreshed' },
              ].map((item) => (
                <div key={item.id} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-white block">{item.title}</span>
                    <span className="text-[11px] text-slate-500">Pick correct WebDriverWait condition:</span>
                  </div>

                  <select
                    aria-label={`ExpectedCondition for ${item.title}`}
                    value={day6Strategies[item.id]}
                    onChange={(e) => setDay6Strategies({ ...day6Strategies, [item.id]: e.target.value })}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">-- Choose ExpectedCondition --</option>
                    <option value="invisibilityOfElementLocated">ExpectedConditions.invisibilityOfElementLocated(spinner)</option>
                    <option value="elementToBeClickable">ExpectedConditions.elementToBeClickable(button)</option>
                    <option value="refreshed">ExpectedConditions.refreshed(ExpectedConditions.visibilityOf(item))</option>
                    <option value="thread_sleep">Thread.sleep(5000) (Anti-pattern)</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DAY 7: Gesture Planner */}
        {dayNumber === 7 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Configure W3C PointerInput parameters and inspect the resulting Sequence Java code.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
                <span className="font-bold text-white">Gesture Parameters</span>

                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Gesture Mode:</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setDay7Gesture('scroll_down')}
                        className={`py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                          day7Gesture === 'scroll_down' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        Vertical Scroll
                      </button>
                      <button
                        onClick={() => setDay7Gesture('swipe_left')}
                        className={`py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                          day7Gesture === 'swipe_left' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        Swipe Left
                      </button>
                      <button
                        onClick={() => setDay7Gesture('long_press')}
                        className={`py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                          day7Gesture === 'long_press' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        Long Press
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Duration: {day7Duration} ms</label>
                    <input
                      type="range"
                      min={100}
                      max={2000}
                      step={50}
                      value={day7Duration}
                      onChange={(e) => setDay7Duration(parseInt(e.target.value, 10))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2 font-mono text-[11px] text-slate-300">
                <span className="text-xs text-slate-400 font-bold block">Generated W3C Pointer Sequence</span>
                <pre className="bg-slate-900 p-3 rounded-xl overflow-x-auto text-emerald-300">
{day7Gesture === 'scroll_down' && `PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger1");
Sequence scroll = new Sequence(finger, 1);
scroll.addAction(finger.createPointerMove(Duration.ZERO, Origin.viewport(), 540, 1400));
scroll.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
scroll.addAction(finger.createPointerMove(Duration.ofMillis(${day7Duration}), Origin.viewport(), 540, 400));
scroll.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
driver.perform(Collections.singletonList(scroll));`}

{day7Gesture === 'swipe_left' && `PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger1");
Sequence swipe = new Sequence(finger, 1);
swipe.addAction(finger.createPointerMove(Duration.ZERO, Origin.viewport(), 900, 800));
swipe.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
swipe.addAction(finger.createPointerMove(Duration.ofMillis(${day7Duration}), Origin.viewport(), 100, 800));
swipe.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
driver.perform(Collections.singletonList(swipe));`}

{day7Gesture === 'long_press' && `PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger1");
Sequence press = new Sequence(finger, 1);
press.addAction(finger.createPointerMove(Duration.ZERO, Origin.viewport(), 540, 960));
press.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
press.addAction(new Pause(finger, Duration.ofMillis(${day7Duration})));
press.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
driver.perform(Collections.singletonList(press));`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* DAY 8: Context Permission */}
        {dayNumber === 8 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Toggle contexts between NATIVE_APP and WEBVIEW, and test app state retention during backgrounding.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
                <span className="font-bold text-white">Context Switcher</span>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDay8Context('NATIVE_APP')}
                      className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer ${
                        day8Context === 'NATIVE_APP' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      NATIVE_APP Context
                    </button>
                    <button
                      onClick={() => setDay8Context('WEBVIEW')}
                      className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer ${
                        day8Context === 'WEBVIEW' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      WEBVIEW_com.shopping Context
                    </button>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl text-[11px] text-slate-300 font-mono">
                    Active Context: <span className="text-emerald-400">{day8Context}</span>
                    <br />
                    Allowed Selectors:{' '}
                    <span className="text-purple-300">
                      {day8Context === 'WEBVIEW' ? 'CSS Selectors, ID, TagName, HTML DOM' : 'Accessibility ID, Resource ID, UiSelector'}
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setDay8Backgrounded(true);
                        setTimeout(() => setDay8Backgrounded(false), 2000);
                      }}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer w-full flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>driver.runAppInBackground(Duration.ofSeconds(2))</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
                <span className="font-bold text-white">App Lifecycle State</span>
                <div className="p-4 bg-slate-900 rounded-xl text-center space-y-2">
                  <div className="text-[11px] text-slate-400">Current Android ApplicationState:</div>
                  <div className="text-sm font-bold text-emerald-400">
                    {day8Backgrounded ? 'RUNNING_IN_BACKGROUND' : 'RUNNING_IN_FOREGROUND'}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {day8Backgrounded
                      ? 'App minimized; onPause() and onStop() invoked.'
                      : 'App active on screen; cart state verified preserved.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DAY 9: TestNG Architect */}
        {dayNumber === 9 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Sequence the 6 core TestNG lifecycle annotations into their correct runtime order.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
                <span className="text-xs font-bold text-white">Available Annotations (Click to Append)</span>
                <div className="grid grid-cols-2 gap-2">
                  {day9Steps.map((step) => (
                    <button
                      key={step}
                      disabled={day9Order.includes(step)}
                      onClick={() => setDay9Order([...day9Order, step])}
                      className={`p-2 rounded-xl text-xs font-mono text-left transition-all ${
                        day9Order.includes(step)
                          ? 'bg-slate-900/50 text-slate-600 border border-slate-800'
                          : 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 cursor-pointer'
                      }`}
                    >
                      {step}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setDay9Order([])}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer pt-2 block"
                >
                  Reset Order
                </button>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-bold text-white">Ordered Execution Pipeline</span>
                <div className="space-y-1.5 min-h-[140px] bg-slate-900 p-3 rounded-xl font-mono text-xs text-slate-300">
                  {day9Order.length === 0 ? (
                    <span className="text-slate-500">Click annotations on the left to sequence them...</span>
                  ) : (
                    day9Order.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-slate-500">{idx + 1}.</span>
                        <span className="text-emerald-400">{step}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DAY 10: POM Builder */}
        {dayNumber === 10 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Step through the Page Object Model assembly for LoginPage and ProductsPage.
            </p>

            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              {[
                { id: 1, label: '1. BasePage Setup' },
                { id: 2, label: '2. Private By Locators' },
                { id: 3, label: '3. Fluent Action Methods' },
                { id: 4, label: '4. Pure Test Class' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDay10CodeStep(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    day10CodeStep === tab.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <pre className="bg-slate-950 p-4 rounded-2xl font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800">
{day10CodeStep === 1 && `public abstract class BasePage {
    protected AndroidDriver driver;
    protected WebDriverWait wait;

    public BasePage(AndroidDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    protected void click(By locator) { wait.until(ExpectedConditions.elementToBeClickable(locator)).click(); }
}`}

{day10CodeStep === 2 && `public class LoginPage extends BasePage {
    // Encapsulation: Keep locators private and strongly typed!
    private final By usernameField = AppiumBy.accessibilityId("test-Username");
    private final By passwordField = AppiumBy.accessibilityId("test-Password");
    private final By loginButton   = AppiumBy.accessibilityId("test-LOGIN");
}`}

{day10CodeStep === 3 && `    public LoginPage enterUsername(String user) {
        type(usernameField, user);
        return this; // Fluent method returning current page
    }

    public ProductsPage clickLoginSuccess() {
        if (driver.isKeyboardShown()) driver.hideKeyboard();
        click(loginButton);
        return new ProductsPage(driver); // Fluent navigation to next page
    }`}

{day10CodeStep === 4 && `@Test(description = "Clean, readable POM TestNG method")
public void testValidUserShoppingLogin() {
    new LoginPage(driver)
        .enterUsername("standard_user")
        .enterPassword("secret_sauce")
        .clickLoginSuccess();

    Assert.assertTrue(productsPage.isLoaded(), "Products catalog should display");
}`}
            </pre>
          </div>
        )}

        {/* DAY 11: Data Matrix */}
        {dayNumber === 11 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Inspect the TestNG @DataProvider matrix and select individual rows to preview test inputs.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 px-3">Run #</th>
                    <th className="py-2.5 px-3">Username</th>
                    <th className="py-2.5 px-3">Password</th>
                    <th className="py-2.5 px-3">Expected Outcome</th>
                    <th className="py-2.5 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {[
                    { id: 0, user: 'standard_user', pass: 'secret_sauce', outcome: 'PASS (Redirects to /inventory)' },
                    { id: 1, user: 'locked_out_user', pass: 'secret_sauce', outcome: 'FAIL ("Sorry, user locked out")' },
                    { id: 2, user: 'problem_user', pass: 'secret_sauce', outcome: 'PASS (Shows glitch images)' },
                    { id: 3, user: '', pass: 'secret_sauce', outcome: 'FAIL ("Username is required")' },
                  ].map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => setDay11ActiveRow(row.id)}
                      className={`cursor-pointer transition-colors ${
                        day11ActiveRow === row.id ? 'bg-emerald-950/40 text-emerald-300' : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="py-2.5 px-3">{row.id + 1}</td>
                      <td className="py-2.5 px-3 font-bold text-white">{row.user || '"" (Empty)'}</td>
                      <td className="py-2.5 px-3">••••••••</td>
                      <td className="py-2.5 px-3 text-[11px]">{row.outcome}</td>
                      <td className="py-2.5 px-3">
                        <span className="text-[10px] text-emerald-400 underline">Preview</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DAY 12: Log Diagnoser */}
        {dayNumber === 12 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Analyze raw server logs and match each failure to its underlying root cause.
            </p>

            <div className="space-y-3">
              {[
                {
                  id: 'fail-1',
                  name: 'testCheckout()',
                  log: '[HTTP] <-- POST /session/.../click 400 [UiAutomator2] Element is not clickable at point (540, 1920) because keyboard is covering it',
                  cause: 'Soft Keyboard Occlusion -> call driver.hideKeyboard()',
                },
                {
                  id: 'fail-2',
                  name: 'testAppLaunch()',
                  log: '[ADB] Error: Device emulator-5554 is offline. Could not connect to ADB daemon port 5037',
                  cause: 'ADB Device Offline -> restart ADB daemon',
                },
                {
                  id: 'fail-3',
                  name: 'testProductPrice()',
                  log: 'org.openqa.selenium.NoSuchElementException: Element not located: By.xpath: //android.widget.TextView[@text="Backpack"]',
                  cause: 'Element Off-Screen -> scroll using UiScrollable before locating',
                },
              ].map((item) => (
                <div key={item.id} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>{item.name}</span>
                    <span className="text-rose-400 font-mono">FAILURE</span>
                  </div>
                  <pre className="bg-slate-900 p-2.5 rounded-xl font-mono text-[10px] text-amber-300 overflow-x-auto">
                    {item.log}
                  </pre>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400">Diagnosed Root Cause &amp; Remediation:</span>
                    <select
                      aria-label={`Diagnosed Root Cause for ${item.name}`}
                      value={day12Diagnoses[item.id]}
                      onChange={(e) => setDay12Diagnoses({ ...day12Diagnoses, [item.id]: e.target.value })}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1 text-xs text-white"
                    >
                      <option value="">-- Select Root Cause --</option>
                      <option value="keyboard">Soft Keyboard Occlusion (dismiss via driver.hideKeyboard)</option>
                      <option value="adb">ADB Device Offline (reconnect device)</option>
                      <option value="scroll">Element Off-Screen (scroll via UiScrollable)</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DAY 13: Framework Audit */}
        {dayNumber === 13 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Verify the 3 core framework pillars: ThreadLocal thread safety, Maven Surefire execution, and GitHub Actions CI pipeline.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                onClick={() => setDay13Checks({ ...day13Checks, threadLocal: !day13Checks.threadLocal })}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                  day13Checks.threadLocal
                    ? 'bg-emerald-950/40 border-emerald-500'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">1. ThreadLocal Driver</span>
                  {day13Checks.threadLocal ? <Check className="w-4 h-4 text-emerald-400" /> : <Layers className="w-4 h-4 text-slate-500" />}
                </div>
                <p className="text-[11px] text-slate-400">DriverFactory isolates driver instances across concurrent threads.</p>
              </div>

              <div
                onClick={() => setDay13Checks({ ...day13Checks, surefire: !day13Checks.surefire })}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                  day13Checks.surefire
                    ? 'bg-emerald-950/40 border-emerald-500'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">2. Maven Surefire CLI</span>
                  {day13Checks.surefire ? <Check className="w-4 h-4 text-emerald-400" /> : <Terminal className="w-4 h-4 text-slate-500" />}
                </div>
                <p className="text-[11px] text-slate-400">CLI execution configured via `mvn clean test -DsuiteXmlFile=testng.xml`.</p>
              </div>

              <div
                onClick={() => setDay13Checks({ ...day13Checks, githubActions: !day13Checks.githubActions })}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                  day13Checks.githubActions
                    ? 'bg-emerald-950/40 border-emerald-500'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">3. GitHub Actions CI</span>
                  {day13Checks.githubActions ? <Check className="w-4 h-4 text-emerald-400" /> : <Code2 className="w-4 h-4 text-slate-500" />}
                </div>
                <p className="text-[11px] text-slate-400">Headless Android emulator automation running on macOS CI runner.</p>
              </div>
            </div>
          </div>
        )}

        {/* DAY 14: Capstone Shopping App Simulator */}
        {dayNumber === 14 && (
          <div className="space-y-6">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-white block">Capstone E2E Shopping App Automation Simulator</span>
                <span className="text-[11px] text-slate-400">Step {capstoneStep} of 10 in Progress</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (capstoneStep < 10) {
                      const next = capstoneStep + 1;
                      setCapstoneStep(next);
                      setCapstoneLog((prev) => [
                        ...prev,
                        `[Step ${next}] Executed Page Object action successfully. Assertions passed.`,
                      ]);
                    }
                  }}
                  disabled={capstoneStep === 10}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Execute Next Step</span>
                </button>

                <button
                  onClick={() => {
                    setCapstoneStep(10);
                    setCapstoneLog((prev) => [
                      ...prev,
                      '[FAST RUN] All 10 Capstone E2E scenarios completed with 100% assertions PASSED.',
                    ]);
                  }}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Fast-Forward All
                </button>
              </div>
            </div>

            {/* Simulated Live Console */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="text-xs font-bold text-slate-400 font-mono">Appium Real-Time Execution Log</span>
              <div className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-emerald-400 space-y-1 max-h-48 overflow-y-auto">
                {capstoneLog.map((logLine, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-slate-600 select-none">&gt;</span>
                    <span>{logLine}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
