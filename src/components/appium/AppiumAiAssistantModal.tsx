import React, { useState } from 'react';
import {
  X,
  Send,
  Copy,
  Check,
  Bot,
  Lightbulb,
  Terminal,
} from 'lucide-react';

interface AppiumAiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDay?: number;
}

interface Message {
  id: string;
  sender: 'user' | 'roo';
  text: string;
  codeSnippet?: string;
  timestamp: string;
}

const PRESET_QUERIES = [
  {
    label: 'UiAutomator2 vs DesiredCapabilities',
    query: 'Why should I use UiAutomator2Options instead of legacy DesiredCapabilities in modern Appium?',
  },
  {
    label: 'Fix Flaky Waits',
    query: 'Why is Thread.sleep() bad in Appium and how should I use WebDriverWait with AppiumBy?',
  },
  {
    label: 'Mobile Gestures (W3C Actions)',
    query: 'How do I perform a swipe or scroll using modern W3C Actions in java-client 9.x?',
  },
  {
    label: 'Android Locators Strategy',
    query: 'What is the recommended priority order for Android mobile locators (accessibilityId, id, xpath)?',
  },
  {
    label: 'Page Object Model in Mobile',
    query: 'How should I structure a Page Object Model class in Java for Appium?',
  },
  {
    label: 'TestNG Parallel Android Tests',
    query: 'How do I run Appium mobile automation tests in parallel across multiple devices or emulators?',
  },
];

const KNOWLEDGE_BASE: Record<string, { reply: string; snippet?: string }> = {
  uiautomator2: {
    reply: `In Appium 2.x and Java client 9.x, **DesiredCapabilities is deprecated** and strongly discouraged. 

Modern Appium uses dedicated driver option classes such as **UiAutomator2Options** (for Android) and **XCUITestOptions** (for iOS). These provide:
1. **Type Safety & IDE Autocomplete**: No string typos like \`"platfromName"\` vs \`"platformName"\`.
2. **Built-in Validation**: Ensures options match the capabilities supported by the active driver.
3. **Clean Chaining**: Provides fluent setter methods like \`.setDeviceName()\`, \`.setAppPackage()\`, and \`.setAutoGrantPermissions(true)\`.`,
    snippet: `UiAutomator2Options options = new UiAutomator2Options()
    .setPlatformName("Android")
    .setAutomationName("UiAutomator2")
    .setDeviceName("emulator-5554")
    .setAppPackage("com.swaglabsmobileapp")
    .setAppActivity("com.swaglabsmobileapp.MainActivity")
    .setNoReset(true);

AndroidDriver driver = new AndroidDriver(
    new URL("http://127.0.0.1:4723"), 
    options
);`,
  },
  wait: {
    reply: `**Never use Thread.sleep() in mobile automation!** Mobile rendering speeds vary wildly based on device CPU, animation states, and thermal throttling.

### The Correct Synchronization Hierarchy:
1. **Implicit Wait**: Keep it low (3-5s) or disable it entirely to avoid masking race conditions.
2. **Explicit Wait (WebDriverWait)**: Always wait for specific states using \`ExpectedConditions\` (e.g., \`visibilityOfElementLocated\`, \`elementToBeClickable\`).
3. **FluentWait**: Use when you need custom polling intervals (e.g., 250ms) and ignoring specific transient exceptions like \`StaleElementReferenceException\`.`,
    snippet: `// Recommended WebDriverWait Setup
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Wait for visibility before querying element
WebElement searchField = wait.until(
    ExpectedConditions.visibilityOfElementLocated(
        AppiumBy.accessibilityId("search-input")
    )
);
searchField.sendKeys("Wireless Headphones");`,
  },
  gesture: {
    reply: `In Appium 2.x and Java client 9+, legacy \`TouchAction\` is completely removed! All mobile gestures must use the **W3C Actions API** with PointerInput.

A scroll or swipe consists of:
1. Moving the pointer to the starting coordinates (\`origin(viewport)\`).
2. Pressing pointer down (\`BUTTON_LEFT\`).
3. Pausing slightly (100-200ms) to allow the OS gesture recognizer to register touch contact.
4. Moving pointer smoothly to target coordinates with a duration (e.g. 500ms).
5. Releasing pointer up.`,
    snippet: `PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence swipe = new Sequence(finger, 1);

swipe.addAction(finger.createPointerMove(Duration.ZERO, PointerInput.Origin.viewport(), startX, startY));
swipe.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
swipe.addAction(new Pause(finger, Duration.ofMillis(150)));
swipe.addAction(finger.createPointerMove(Duration.ofMillis(600), PointerInput.Origin.viewport(), endX, endY));
swipe.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

driver.perform(Collections.singletonList(swipe));`,
  },
  locator: {
    reply: `Choosing the right mobile locator is critical for high test execution speed and eliminating flakiness:

1. **Accessibility ID (\`AppiumBy.accessibilityId\`)** — 🥇 **Top Recommendation**: Uses \`content-desc\` in Android and \`accessibilityIdentifier\` in iOS. Fast, unique, and cross-platform compatible.
2. **Resource ID (\`AppiumBy.id\`)** — 🥈 **High**: Uses Android \`resource-id\`. Very fast, but Android-specific.
3. **Android UIAutomator (\`AppiumBy.androidUIAutomator\`)** — 🥉 **Advanced**: Executes directly inside Android UIAutomator framework (e.g., \`new UiScrollable(...).scrollIntoView(...)\`).
4. **XPath (\`AppiumBy.xpath\`)** — ⚠️ **Use as last resort**: Parsing the deep XML mobile view hierarchy is 10-100x slower than Accessibility ID and breaks on minor layout tweaks.`,
    snippet: `// ✅ 1. Recommended: Accessibility ID
driver.findElement(AppiumBy.accessibilityId("checkout_button")).click();

// ✅ 2. Good: Resource ID
driver.findElement(AppiumBy.id("com.ecommerce.app:id/btn_buy")).click();

// ⚠️ 3. Fragile: Absolute or complex XPath
driver.findElement(AppiumBy.xpath("//android.widget.Button[@text='Buy Now']")).click();`,
  },
  pom: {
    reply: `**Page Object Model (POM)** encapsulates Android view locators and user actions within clean Java classes.

### Best Practices for Mobile POM:
1. Initialize elements dynamically using \`driver.findElement(AppiumBy...)\` or \`By\` locators rather than static references to avoid \`StaleElementReferenceException\`.
2. Encapsulate waits directly inside page action methods.
3. Return the next Page Object upon navigation to enable fluent method chaining.`,
    snippet: `public class LoginPage {
    private final AndroidDriver driver;
    private final WebDriverWait wait;

    private final By usernameField = AppiumBy.accessibilityId("test-Username");
    private final By passwordField = AppiumBy.accessibilityId("test-Password");
    private final By loginButton = AppiumBy.accessibilityId("test-LOGIN");

    public LoginPage(AndroidDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public ProductsPage login(String user, String pass) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(usernameField)).sendKeys(user);
        driver.findElement(passwordField).sendKeys(pass);
        driver.findElement(loginButton).click();
        return new ProductsPage(driver);
    }
}`,
  },
  parallel: {
    reply: `Running parallel mobile tests requires isolated device sessions to prevent port conflicts:

1. **ThreadLocal<AndroidDriver>**: Ensure each TestNG execution thread maintains its own driver instance.
2. **Unique System Ports**: In UiAutomator2, each simultaneous device must be allocated a unique \`systemPort\` (e.g., 8200, 8201) for the UiAutomator2 server daemon.
3. **UDID Mapping**: Pass \`udid\` via TestNG XML parameters to bind each test runner to an explicit device or emulator.`,
    snippet: `// TestNG XML snippet
// <test name="Pixel 6 Test">
//   <parameter name="deviceName" value="Pixel_6_API_33"/>
//   <parameter name="systemPort" value="8200"/>
//   <parameter name="udid" value="emulator-5554"/>
//   <classes><class name="tests.LoginTest"/></classes>
// </test>

// In Java BaseTest:
UiAutomator2Options options = new UiAutomator2Options()
    .setDeviceName(deviceName)
    .setUdid(udid)
    .setSystemPort(Integer.parseInt(systemPort));
tlDriver.set(new AndroidDriver(appiumServerUrl, options));`,
  },
};

export const AppiumAiAssistantModal: React.FC<AppiumAiAssistantModalProps> = ({
  isOpen,
  onClose,
  currentDay = 1,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'roo',
      text: `Hey there! I'm **Roo**, your RootAccess Mobile Automation AI guide. 

I'm here to help you master **Appium with Java**—from UiAutomator2 driver configuration and resilient mobile locators to W3C touch gestures and enterprise TestNG frameworks.

What mobile testing challenge or concept are you working through today?`,
      timestamp: 'Just now',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (snippet: string, msgId: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedCodeId(msgId);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleSend = (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Deterministic intelligence matching
    setTimeout(() => {
      const lower = trimmed.toLowerCase();
      let match = KNOWLEDGE_BASE.uiautomator2;

      if (lower.includes('wait') || lower.includes('sleep') || lower.includes('timeout') || lower.includes('flak')) {
        match = KNOWLEDGE_BASE.wait;
      } else if (lower.includes('gesture') || lower.includes('scroll') || lower.includes('swipe') || lower.includes('drag') || lower.includes('touch')) {
        match = KNOWLEDGE_BASE.gesture;
      } else if (lower.includes('locator') || lower.includes('xpath') || lower.includes('accessibility') || lower.includes('id') || lower.includes('inspector')) {
        match = KNOWLEDGE_BASE.locator;
      } else if (lower.includes('pom') || lower.includes('page object') || lower.includes('pagefactory') || lower.includes('design')) {
        match = KNOWLEDGE_BASE.pom;
      } else if (lower.includes('parallel') || lower.includes('testng') || lower.includes('grid') || lower.includes('device') || lower.includes('multi')) {
        match = KNOWLEDGE_BASE.parallel;
      } else if (lower.includes('driver') || lower.includes('options') || lower.includes('desiredcapabilities') || lower.includes('setup') || lower.includes('server')) {
        match = KNOWLEDGE_BASE.uiautomator2;
      } else {
        // Helpful contextual fallback
        match = {
          reply: `Great question regarding **Day ${currentDay}** mobile automation!

When automating mobile applications with Appium 2.x and Java 17+:
• **Always favor Accessibility IDs (\`AppiumBy.accessibilityId\`)** over deep XPaths for high stability and fast execution.
• **Avoid \`Thread.sleep()\`** — replace it with explicit \`WebDriverWait\` targeting element states.
• **Use \`UiAutomator2Options\`** for clean, typed Android driver setup.
• **Utilize W3C Actions API** for all gestures (tap, swipe, scroll, pinch).

Let me know if you'd like a specific code snippet or troubleshooting breakdown for this!`,
          snippet: `// Modern Appium 2.x Java Standard
UiAutomator2Options options = new UiAutomator2Options()
    .setDeviceName("emulator-5554")
    .setAppPackage("com.example.app")
    .setAppActivity(".MainActivity");

AndroidDriver driver = new AndroidDriver(new URL("http://127.0.0.1:4723"), options);`,
        };
      }

      const rooMsg: Message = {
        id: `roo-${Date.now()}`,
        sender: 'roo',
        text: match.reply,
        codeSnippet: match.snippet,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, rooMsg]);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Roo AI Assistant"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-900 via-slate-900 to-indigo-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">Roo • Mobile Automation AI</h2>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full">
                  Appium &amp; Java Expert
                </span>
              </div>
              <p className="text-xs text-slate-300">
                RootAccess Official AI Assistant • Day {currentDay} Guide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                }`}
              >
                {/* Text Content */}
                <div className="whitespace-pre-line space-y-2">
                  {msg.text}
                </div>

                {/* Code Snippet Box */}
                {msg.codeSnippet && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 text-slate-100 text-xs">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Java 17+ Modern Appium Snippet</span>
                      </div>
                      <button
                        onClick={() => handleCopy(msg.codeSnippet!, msg.id)}
                        className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] transition"
                        title="Copy to clipboard"
                      >
                        {copiedCodeId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3 font-mono overflow-x-auto text-[11px] leading-relaxed text-emerald-200">
                      <code>{msg.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                <div
                  className={`mt-1.5 text-[10px] ${
                    msg.sender === 'user' ? 'text-emerald-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestions */}
        <div className="px-4 py-2.5 bg-white border-t border-slate-100">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Recommended Quick Questions:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {PRESET_QUERIES.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(preset.query)}
                className="shrink-0 px-2.5 py-1 rounded-full text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 text-slate-700 transition"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Query Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputQuery);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask Roo anything about Appium, Java, UiAutomator2, or mobile locators..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-medium text-xs sm:text-sm rounded-xl transition flex items-center gap-1.5 shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
