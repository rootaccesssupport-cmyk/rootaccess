/**
 * RootAccess — Appium Mobile Automation with Java
 *
 * Course Title: Appium Mobile Automation with Java
 * Subtitle: From Mobile Testing Fundamentals to Practical Android Automation
 * Brand: RootAccess
 * Tagline: Learn by Doing.
 * Duration: 14 Days (30–60 minutes daily)
 * Level: Beginner to Intermediate
 * Price: ₹499 (Launch Offer, Original ₹999)
 * Reference: Appium 2.x, Appium Java Client 9.x, Selenium 4.x, TestNG 7.x, Android SDK 34
 */

export interface AppiumDayTopic {
  title: string;
  summary: string;
  explanation: string;
  codeSnippet?: {
    language: string;
    filename?: string;
    code: string;
    explanation?: string;
  };
  realWorldScenario: string;
  commonMistakes: string[];
  keyTakeaways: string[];
}

export interface AppiumQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  hint?: string;
}

export interface AppiumInterviewQuestion {
  id: string;
  question: string;
  category:
    | 'Fundamentals'
    | 'Android Internals'
    | 'Framework Architecture'
    | 'Troubleshooting'
    | 'TestNG & POM'
    | 'Appium Inspector and Locators'
    | 'Mobile Gestures'
    | 'Waits and Synchronisation';
  idealAnswer: string;
  interviewerEvaluationPoints: string[];
  followUpQuestions?: string[];
}

export interface AppiumInteractiveLabSpec {
  id: string;
  labType:
    | 'app_classifier'
    | 'env_doctor'
    | 'options_builder'
    | 'locator_inspector'
    | 'form_assertion'
    | 'wait_decision'
    | 'gesture_planner'
    | 'context_permission'
    | 'testng_architect'
    | 'pom_builder'
    | 'data_matrix'
    | 'log_diagnoser'
    | 'framework_audit'
    | 'capstone_shopping';
  title: string;
  subtitle: string;
  instructions: string[];
  initialState: Record<string, any>;
  solutionChecklist: string[];
  hints: string[];
}

export interface AppiumIndependentChallenge {
  id: string;
  title: string;
  scenario: string;
  task: string;
  starterSnippet?: string;
  verificationCriteria: string[];
  hints: string[];
}

export interface AppiumDayData {
  dayNumber: number;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  duration: string;
  objectives: string[];
  introduction: string;
  topics: AppiumDayTopic[];
  lab: AppiumInteractiveLabSpec;
  challenge: AppiumIndependentChallenge;
  interviewQuestions: AppiumInterviewQuestion[];
  quiz: AppiumQuizQuestion[];
}

export interface AppiumCourseMetadata {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  durationDays: number;
  estimatedHours: number;
  pricing: {
    inr: number;
    originalInr: number;
    isLaunchOffer: boolean;
  };
  competencies: string[];
  learningOutcomes: string[];
  prerequisites: string[];
  toolsCovered: string[];
}

export const APPIUM_COURSE_METADATA: AppiumCourseMetadata = {
  id: 'course-appium-mobile-automation',
  slug: 'appium-mobile-automation',
  title: 'Appium Mobile Automation with Java',
  subtitle: 'From Mobile Testing Fundamentals to Practical Android Automation',
  category: 'Software Testing & QA',
  level: 'Beginner to Intermediate',
  durationDays: 14,
  estimatedHours: 18,
  pricing: {
    inr: 499,
    originalInr: 999,
    isLaunchOffer: true,
  },
  competencies: [
    'Appium Fundamentals',
    'Android Automation',
    'Java and TestNG',
    'Appium Inspector and Locators',
    'Mobile Gestures',
    'Waits and Synchronisation',
    'Page Object Model',
    'Test Data and Assertions',
    'Test Execution and Reporting',
    'Mobile Automation Frameworks',
  ],
  learningOutcomes: [
    'Understand Appium 2.x client-server architecture and W3C WebDriver communication',
    'Configure the complete Android automation toolchain: JDK 17/21, Node.js, Appium 2.x, Android Studio/SDK, and ADB',
    'Write robust Android mobile automation tests in Java using modern UiAutomator2Options and AndroidDriver',
    'Inspect mobile apps and select rock-solid locator strategies (Accessibility ID, Resource ID, UiSelector)',
    'Automate native mobile touch gestures: swipe, vertical scroll, pinch-to-zoom, and Android hardware keys',
    'Eliminate flaky mobile tests using explicit WebDriverWait and ExpectedConditions instead of Thread.sleep',
    'Automate Hybrid mobile applications by seamlessly switching contexts between NATIVE_APP and WEBVIEW',
    'Build an enterprise-grade Page Object Model (POM) test automation framework with TestNG',
    'Implement data-driven testing using TestNG @DataProvider and external configuration properties',
    'Capture automated failure screenshots, analyze raw Appium server logs, and produce clean HTML reports',
    'Complete an end-to-end Capstone Project automating an Android e-commerce shopping flow',
  ],
  prerequisites: [
    'Basic familiarity with Core Java (variables, methods, loops, OOP concepts)',
    'A computer (Windows, macOS, or Linux) with at least 8 GB RAM (16 GB recommended for emulators)',
    'Willingness to learn by doing through hands-on practice',
  ],
  toolsCovered: [
    'Appium 2.x Server',
    'Appium UiAutomator2 Driver',
    'Appium Java Client 9.x',
    'Selenium 4.x WebDriver',
    'Android SDK & ADB CLI',
    'Android Studio & AVD (Emulator)',
    'Appium Inspector',
    'TestNG 7.x',
    'Apache Maven',
    'ExtentReports',
  ],
};

export const APPIUM_DAYS_DATA: AppiumDayData[] = [
  // DAY 1
  {
    dayNumber: 1,
    slug: 'day-1',
    title: 'Mobile Automation Overview & Appium Fundamentals',
    subtitle: 'Understand Mobile App Types, Appium 2.x Architecture & the W3C Protocol',
    badge: 'Architecture & Fundamentals',
    duration: '45 mins',
    objectives: [
      'Differentiate between Native, Hybrid, and Mobile Web applications',
      'Master the Appium 2.x Client-Server architecture and W3C WebDriver protocol',
      'Understand how Appium interacts with Android OS via the UiAutomator2 driver',
      'Compare Selenium for Web vs Appium for Mobile testing',
    ],
    introduction:
      'Mobile devices represent over 60% of global internet traffic. Unlike desktop browsers with predictable viewports, mobile apps interact with battery states, screen rotations, touch sensors, and hardware buttons. Appium is the open-source industry standard for mobile automation because it adheres to the philosophy: "Testing native apps shouldn’t require including an SDK or recompiling your app." Today, you will learn the foundational architecture that makes Appium work.',
    topics: [
      {
        title: '1. The Three Mobile Application Architectures',
        summary: 'Understand the distinct internal architectures of Native, Hybrid, and Mobile Web applications.',
        explanation:
          'Before writing a single automation script, you must know what type of application you are testing:\n\n' +
          '• **Native Apps:** Written in platform-native languages (Kotlin/Java for Android, Swift/Objective-C for iOS). They compile directly to machine code (.apk or .aab on Android, .ipa on iOS) and have direct access to hardware APIs (camera, GPS, accelerometer, biometric sensors). Performance is fast, but locators use OS UI elements rather than HTML DOM.\n\n' +
          '• **Mobile Web Apps:** Standard responsive websites accessed through a mobile browser like Chrome or Safari. Automated using standard Selenium WebDriver with mobile browser capabilities.\n\n' +
          '• **Hybrid Apps:** Apps wrapped in a native container that render web content inside an embedded WebView (Chromium on Android, WebKit on iOS). Popular frameworks include Ionic, Flutter (WebView components), and React Native web bridges. Testing hybrid apps requires context switching between `NATIVE_APP` and `WEBVIEW`.',
        realWorldScenario:
          'An e-commerce shopping app has a native product catalogue and cart for high performance, but loads a WebView for its checkout/payment gateway to comply with PCI-DSS regulations. As a mobile QA engineer, you must handle both native UI widgets and web DOM elements in the same test script.',
        commonMistakes: [
          'Assuming all mobile apps have HTML source code accessible via CSS selectors.',
          'Treating a mobile website in Chrome as a native mobile application.',
          'Not knowing whether an app is Native or Hybrid before designing locator strategies.',
        ],
        keyTakeaways: [
          'Native apps use Android/iOS OS UI widgets; mobile web uses HTML DOM; hybrid apps contain both.',
          'Appium automates all three types using a unified API.',
        ],
      },
      {
        title: '2. Appium 2.x Client-Server Architecture & Driver Decoupling',
        summary: 'How Appium 2.x decouples drivers, communicates over HTTP, and bridges your Java tests to the Android device.',
        explanation:
          'Appium operates as a REST server written in Node.js. In legacy Appium 1.x, all drivers (Android, iOS, Windows, Mac) were bundled into one heavy package. Appium 2.x redesigned this with a modular, pluggable driver architecture:\n\n' +
          '1. **Client Code (Java TestNG):** Your Java test writes commands like `driver.findElement(AppiumBy.id("login_btn")).click()`.\n' +
          '2. **JSON / W3C WebDriver Protocol:** The Appium Java Client serializes your command into a standard HTTP POST request payload conforming to the W3C WebDriver specification.\n' +
          '3. **Appium 2.x Server:** Listens on port 4723 (`http://127.0.0.1:4723`), parses the HTTP request, and routes it to the active driver session.\n' +
          '4. **UiAutomator2 Driver:** Translates the WebDriver command into Android UiAutomator2 test commands.\n' +
          '5. **UiAutomator2 Server (on device):** A lightweight instrumentation server (`io.appium.uiautomator2.server`) installed on the Android device/emulator that executes the action directly on the Android Accessibility framework and returns the JSON result back up the chain.',
        codeSnippet: {
          language: 'text',
          filename: 'appium-architecture-flow.txt',
          code: `[Java Test Script (TestNG)]
       │
       │  HTTP / W3C WebDriver Protocol (JSON)
       ▼
[Appium 2.x Server (Node.js :4723)]
       │
       │  Appium Driver Bridge
       ▼
[appium-uiautomator2-driver]
       │
       │  ADB Port Forwarding (:8200 -> :6790)
       ▼
[UiAutomator2 Server APK on Android Device]
       │
       │  Android Accessibility Framework API
       ▼
[Android System UI / Application Under Test]`,
          explanation: 'Every click or scroll command travels down this 5-stage pipeline, and the execution status returns back up to your Java assertions.',
        },
        realWorldScenario:
          'When troubleshooting a test that fails to click a button, looking at the Appium Server console reveals whether the failure happened during HTTP network transport, during locator evaluation in the UiAutomator2 driver, or on the device screen itself.',
        commonMistakes: [
          'Thinking Appium is a physical library embedded into the customer app.',
          'Starting Java tests without starting the Appium server first on `http://127.0.0.1:4723`.',
          'Confusing the Appium Server with the Android Debug Bridge (ADB).',
        ],
        keyTakeaways: [
          'Appium does not modify your APK: it tests the exact same binary your users download.',
          'Appium 2.x requires installing independent drivers via `appium driver install uiautomator2`.',
        ],
      },
      {
        title: '3. Selenium WebDriver vs Appium: Key Differences',
        summary: 'Explore why mobile automation requires specialized concepts beyond standard web browser automation.',
        explanation:
          'While Appium inherits the W3C WebDriver specification from Selenium, mobile automation introduces unique physical constraints:\n\n' +
          '| Feature | Selenium WebDriver (Web) | Appium (Mobile Automation) |\n' +
          '| :--- | :--- | :--- |\n' +
          '| **Platform** | Desktop browsers (Chrome, Firefox, Safari) | Physical phones & emulators (Android & iOS) |\n' +
          '| **Driver Class** | `ChromeDriver`, `FirefoxDriver` | `AndroidDriver`, `IOSDriver` |\n' +
          '| **Locator Strategies** | CSS Selector, ID, XPath, TagName | Accessibility ID, Resource ID, UiSelector, XPath |\n' +
          '| **User Interactions** | Mouse click, hover, keyboard | Tap, double tap, long press, swipe, scroll, pinch |\n' +
          '| **Hardware Features** | None | Camera, GPS location, rotation, volume, battery, network |\n' +
          '| **Session Initialization** | Browser binary & options | APK path, package name, activity, platform version |\n' +
          '| **Speed** | Fast DOM query execution | Slower due to ADB bridge & Android view hierarchy |',
        realWorldScenario:
          'A QA engineer with Selenium experience tries to use `By.cssSelector(".btn-primary")` in Appium, only to receive an `InvalidArgumentException`. In native Android apps, CSS selectors do not exist because there is no CSS; you must use `AppiumBy.id` or `AppiumBy.accessibilityId`.',
        commonMistakes: [
          'Attempting to use `driver.findElement(By.cssSelector(...))` on a native Android screen.',
          'Expecting mobile tests to run at the same millisecond speed as headless desktop Chrome.',
          'Ignoring mobile lifecycle events like app backgrounding and incoming call interrupts.',
        ],
        keyTakeaways: [
          'Appium extends Selenium with `AndroidDriver` and `AppiumBy` to support touch and mobile OS capabilities.',
          'Native mobile views do not have CSS or HTML tags.',
        ],
      },
    ],
    lab: {
      id: 'lab-day-1',
      labType: 'app_classifier',
      title: 'Mobile Architecture Classifier & Strategy Planner',
      subtitle: 'Analyze 4 workplace application scenarios, classify their mobile architecture, and determine required driver configurations.',
      instructions: [
        'Review each real-world application profile (Native, Hybrid, or Mobile Web).',
        'Select the correct Architecture classification for each scenario.',
        'Choose the recommended primary locator strategy based on the application type.',
        'Verify your automation strategy to confirm 100% architectural alignment.',
      ],
      initialState: {
        scenarios: [
          {
            id: 'sc-1',
            name: 'QuickShop Retail Android APK',
            description: 'Compiled using Kotlin. Uses native RecyclerView lists, Material Design buttons, and device fingerprint authentication.',
            selectedArchitecture: '',
            selectedLocatorStrategy: '',
          },
          {
            id: 'sc-2',
            name: 'PayFlow Payment Gateway Page',
            description: 'A responsive React web checkout portal loaded inside an in-app WebView within a banking app.',
            selectedArchitecture: '',
            selectedLocatorStrategy: '',
          },
          {
            id: 'sc-3',
            name: 'FlightBooker Web Portal',
            description: 'A responsive travel booking site opened directly inside the Google Chrome browser on an Android device.',
            selectedArchitecture: '',
            selectedLocatorStrategy: '',
          },
          {
            id: 'sc-4',
            name: 'FitnessTracker Companion',
            description: 'Packaged native APK interacting with Bluetooth heart sensors, device GPS, and native Android notification channels.',
            selectedArchitecture: '',
            selectedLocatorStrategy: '',
          },
        ],
      },
      solutionChecklist: [
        'Classify QuickShop Retail as Native App with Accessibility ID / Resource ID',
        'Classify PayFlow Payment Gateway as Hybrid App with Context Switching (WEBVIEW)',
        'Classify FlightBooker Web as Mobile Web with Selenium / Chrome Options',
        'Classify FitnessTracker as Native App with UiAutomator2 and Native Locators',
      ],
      hints: [
        'Native Android apps do not have CSS selectors; prioritize Accessibility ID or Android Resource ID.',
        'Hybrid apps require switching contexts from NATIVE_APP to WEBVIEW to interact with HTML elements.',
        'Testing a website inside mobile Chrome uses Chromedriver managed through Appium.',
      ],
    },
    challenge: {
      id: 'challenge-day-1',
      title: 'Appium Architectural Flow Mapping',
      scenario:
        'A team lead asks you why mobile tests are failing with connection refused errors when running on a new Jenkins build agent.',
      task:
        'Write out the exact step-by-step communication path for a click action in Appium 2.x, identifying the default ports and roles of the Appium Server, ADB, and UiAutomator2 server.',
      verificationCriteria: [
        'Mentions Appium Server running on port 4723',
        'Explains that client sends W3C WebDriver HTTP JSON requests',
        'Identifies UiAutomator2 Server running on the device receiving forwarded ADB commands',
        'Explains that Accessibility service clicks the target UI element on screen',
      ],
      hints: [
        'Think about the 5 nodes in the Appium architecture diagram.',
        'Appium 2.x server runs on localhost:4723 by default.',
      ],
    },
    interviewQuestions: [
      {
        id: 'iq-1-1',
        category: 'Fundamentals',
        question: 'What is Appium and what is its core design philosophy?',
        idealAnswer:
          'Appium is an open-source, cross-platform test automation framework for native, hybrid, and mobile web applications on Android and iOS. Its core philosophy consists of 4 principles: 1) You should not have to recompile your app or modify its code to automate it; 2) You should not be locked into a specific language or framework (Appium uses W3C WebDriver so you can write in Java, Python, JS, etc.); 3) A mobile automation framework should not reinvent the wheel when a standard API (WebDriver) exists; 4) The framework must be open source.',
        interviewerEvaluationPoints: [
          'Mentions that no app recompilation or third-party SDK injection is needed',
          'Highlights cross-platform capabilities (Android and iOS)',
          'Mentions W3C WebDriver standard compliance',
        ],
        followUpQuestions: [
          'How does Appium differ between version 1.x and version 2.x?',
          'What is the role of the UiAutomator2 driver in Android automation?',
        ],
      },
      {
        id: 'iq-1-2',
        category: 'Fundamentals',
        question: 'Explain the difference between Native, Hybrid, and Mobile Web applications from an automation perspective.',
        idealAnswer:
          'Native apps are built with platform-specific languages (Java/Kotlin on Android) and compile into binary APKs. They interact directly with the Android Accessibility framework, requiring mobile locator strategies like Accessibility ID, Resource ID, or UiSelector. Mobile Web apps are standard web applications accessed through mobile browsers (like Chrome), automated via standard HTML DOM locators. Hybrid apps embed a web browser view (WebView) inside a native APK shell; to automate them, tests must identify the web view and switch contexts between NATIVE_APP and WEBVIEW.',
        interviewerEvaluationPoints: [
          'Accurately defines the technological difference between native widgets and HTML DOM',
          'Explains context switching required for hybrid apps',
          'Distinguishes mobile browser testing from native APK testing',
        ],
        followUpQuestions: [
          'How do you switch between Native and WebView contexts in Appium Java?',
        ],
      },
      {
        id: 'iq-1-3',
        category: 'Fundamentals',
        question: 'What major architectural improvements were introduced in Appium 2.0 compared to Appium 1.x?',
        idealAnswer:
          'In Appium 1.x, the server was a monolithic package bundling drivers for Android, iOS, Windows, and Mac. Appium 2.0 decoupled the server engine from the drivers and plugins. In Appium 2.0: 1) Drivers are installed independently via CLI (`appium driver install uiautomator2`), reducing installation size; 2) The plugin ecosystem allows adding features like image recognition, device management, and wait extensions; 3) The default base path changed from `/wd/hub` to `/` conforming strictly to the modern W3C WebDriver standard; 4) DesiredCapabilities were replaced with type-safe options classes like `UiAutomator2Options`.',
        interviewerEvaluationPoints: [
          'Mentions driver decoupling and independent driver lifecycle',
          'Notes removal of default `/wd/hub` base path',
          'Mentions replacement of DesiredCapabilities with Options classes',
        ],
      },
      {
        id: 'iq-1-4',
        category: 'Android Internals',
        question: 'What is the UiAutomator2 server and how does Appium install and communicate with it on an Android device?',
        idealAnswer:
          'The UiAutomator2 server consists of two lightweight Android instrumentation APKs (`io.appium.uiautomator2.server` and `io.appium.uiautomator2.server.test`). When an Appium session initializes, the Appium server checks if these APKs are installed on the device; if not, it automatically installs them via ADB. It then starts an instrumentation session. ADB forwards port 6790 on the device to a local port on the host machine. The Appium server forwards translated test commands to this on-device server, which invokes Android’s internal `UiAutomator` accessibility APIs to interact with on-screen elements.',
        interviewerEvaluationPoints: [
          'Identifies the two UiAutomator2 APKs installed on the device',
          'Explains ADB port forwarding mechanism',
          'Understands the role of the Android Accessibility layer',
        ],
      },
      {
        id: 'iq-1-5',
        category: 'Fundamentals',
        question: 'Why cannot CSS selectors be used to find elements in a native Android application?',
        idealAnswer:
          'CSS (Cascading Style Sheets) selectors are designed specifically to parse and query the HTML Document Object Model (DOM) rendered by web browser layout engines (Blink, WebKit, Gecko). Native Android applications do not use HTML or CSS; their user interface is constructed from Java/Kotlin view objects (`android.view.View`, `android.widget.TextView`, `android.widget.Button`) defined in XML layout files and rendered directly by the Android OS graphics subsystem. Because there is no HTML or CSS styling tree, CSS selectors do not exist natively. Instead, Android provides Resource IDs, Accessibility labels (content-desc), and UiSelector queries.',
        interviewerEvaluationPoints: [
          'Explains that native apps have no HTML DOM or CSS engine',
          'Explains Android View hierarchy',
          'Names the valid alternative native locator strategies',
        ],
      },
    ],
    quiz: [
      {
        id: 'q-1-1',
        question: 'Which protocol does Appium 2.x use to communicate between client test scripts and the Appium Server?',
        options: [
          'W3C WebDriver Protocol over HTTP/JSON',
          'Raw Binary TCP Socket Stream',
          'WebRTC Media Protocol',
          'SOAP XML Web Services',
        ],
        correctAnswerIndex: 0,
        explanation:
          'Appium 2.x communicates strictly via the W3C WebDriver specification over HTTP using standard JSON payloads, ensuring consistency with modern Selenium 4.',
      },
      {
        id: 'q-1-2',
        question: 'What is the primary difference in Appium 2.x compared to Appium 1.x regarding drivers?',
        options: [
          'Appium 2.x bundles all drivers inside one huge installer by default',
          'Drivers in Appium 2.x are decoupled and installed independently as needed using the CLI',
          'Appium 2.x removed support for Android testing',
          'Appium 2.x requires all mobile apps to be recompiled with an SDK',
        ],
        correctAnswerIndex: 1,
        explanation:
          'In Appium 2.x, drivers (like uiautomator2 and xcuitest) are completely decoupled and must be installed independently via `appium driver install <driver-name>`.',
      },
      {
        id: 'q-1-3',
        question: 'What type of mobile application uses an embedded native browser container (WebView) to display web pages inside an APK?',
        options: [
          'Native App',
          'Hybrid App',
          'Mobile Web App',
          'Progressive Desktop App',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Hybrid apps wrap web content inside a native container using WebView, allowing developers to write web code while packaging it as an installable mobile app.',
      },
      {
        id: 'q-1-4',
        question: 'Which component on the Android device directly interacts with the Android Accessibility framework to perform taps and scrolls?',
        options: [
          'The Appium Client Jar file on your laptop',
          'The UiAutomator2 Server APK running on the Android device',
          'The Google Play Store application',
          'The local Maven repository',
        ],
        correctAnswerIndex: 1,
        explanation:
          'The UiAutomator2 Server APK is installed and runs as an instrumentation service directly on the Android device, executing commands through Android Accessibility APIs.',
      },
      {
        id: 'q-1-5',
        question: 'In Appium 2.x, what is the default server base path if none is specified?',
        options: [
          '/wd/hub',
          '/ (the server root)',
          '/appium/v1',
          '/selenium/session',
        ],
        correctAnswerIndex: 1,
        explanation:
          'In Appium 1.x the default path was `/wd/hub`. In Appium 2.x, the base path is by default `/` (the server root), aligning with the official W3C WebDriver standard.',
      },
    ],
  },

  // DAY 2
  {
    dayNumber: 2,
    slug: 'day-2',
    title: 'Environment Setup & Toolchain Configuration',
    subtitle: 'Configure Java JDK, Node.js, Appium 2.x, Android SDK & ADB',
    badge: 'Environment & Tooling',
    duration: '50 mins',
    objectives: [
      'Install and configure Java Development Kit (JDK 17 or 21) and set JAVA_HOME',
      'Install Node.js, Appium 2.x Server, and the UiAutomator2 driver via npm',
      'Set up Android Studio, Android SDK platform-tools, and configure ANDROID_HOME',
      'Master essential ADB (Android Debug Bridge) terminal commands for device management',
      'Configure an Android Virtual Device (AVD / Emulator) and enable USB debugging on real hardware',
    ],
    introduction:
      'A rock-solid mobile automation environment is the foundation of reliable test engineering. Unlike web testing where you simply install a browser, mobile testing requires coordinating Java, the Android SDK, device drivers, and the Appium server. Today you will walk through the exact toolchain setup and master the diagnostic commands used by senior mobile automation engineers.',
    topics: [
      {
        title: '1. Java JDK & Android Environment Variables',
        summary: 'Properly configure JAVA_HOME, ANDROID_HOME, and PATH variables.',
        explanation:
          'Appium and the Android SDK command-line tools rely on system environment variables to locate compilers and binaries:\n\n' +
          '1. **`JAVA_HOME`:** Must point to the root directory of your JDK installation (JDK 17 or 21 LTS is recommended). For example:\n' +
          '   • macOS/Linux: `/Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home`\n' +
          '   • Windows: `C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.8.7-hotspot`\n\n' +
          '2. **`ANDROID_HOME`:** Points to the Android SDK root folder containing platforms and build tools:\n' +
          '   • macOS: `/Users/<username>/Library/Android/sdk`\n' +
          '   • Windows: `C:\\Users\\<username>\\AppData\\Local\\Android\\Sdk`\n\n' +
          '3. **`PATH` Additions:** You must add the following SDK subdirectories to your system PATH so command line utilities work globally:\n' +
          '   • `$ANDROID_HOME/platform-tools` (contains `adb`)\n' +
          '   • `$ANDROID_HOME/cmdline-tools/latest/bin` (contains `sdkmanager` and `avdmanager`)\n' +
          '   • `$ANDROID_HOME/emulator` (contains `emulator` CLI)\n' +
          '   • `$JAVA_HOME/bin`',
        codeSnippet: {
          language: 'bash',
          filename: '~/.zshrc or ~/.bashrc',
          code: `# Java Configuration
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH=$JAVA_HOME/bin:$PATH

# Android SDK Configuration
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin

# Verify installation in terminal
java -version
adb version`,
          explanation: 'Adding these exports to your shell profile ensures ADB and Java are always available to IDEs and build systems.',
        },
        realWorldScenario:
          'A CI/CD pipeline fails with "Neither ANDROID_HOME nor ANDROID_SDK_ROOT was found". Adding these export statements to the runner environment resolved the issue immediately.',
        commonMistakes: [
          'Setting JAVA_HOME to the JRE instead of the JDK.',
          'Pointing ANDROID_HOME to the Android Studio application directory instead of the SDK data directory.',
          'Forgetting to restart the terminal or run `source ~/.zshrc` after editing shell configuration files.',
        ],
        keyTakeaways: [
          'JAVA_HOME and ANDROID_HOME are mandatory for Appium to control emulators and run ADB commands.',
          'Always verify in terminal: `echo $JAVA_HOME` and `adb version`.',
        ],
      },
      {
        title: '2. Installing Appium 2.x & the UiAutomator2 Driver',
        summary: 'Install Appium 2.x via Node.js npm and register the Android driver.',
        explanation:
          'Appium 2.x installation is clean and modular via Node.js (Node 18+ LTS recommended):\n\n' +
          '```bash\n' +
          '# 1. Install Appium 2.x globally\n' +
          'npm install -g appium\n\n' +
          '# 2. Check Appium version (should be 2.x.x)\n' +
          'appium -v\n\n' +
          '# 3. Install the official Android UiAutomator2 driver\n' +
          'appium driver install uiautomator2\n\n' +
          '# 4. Verify installed drivers\n' +
          'appium driver list --installed\n\n' +
          '# 5. Start the Appium server\n' +
          'appium\n' +
          '```\n\n' +
          'When Appium starts, you should see:\n' +
          '`[Appium] Welcome to Appium v2.x.x`\n' +
          '`[Appium] Attempting to load driver uiautomator2...`\n' +
          '`[Appium] Appium REST http interface listener started on http://0.0.0.0:4723`',
        realWorldScenario:
          'An engineer installs Appium with `npm install -g appium` but forgets to run `appium driver install uiautomator2`. When their Java test executes, Appium returns: `Could not find a driver for automationName: UiAutomator2`.',
        commonMistakes: [
          'Forgetting to install the `uiautomator2` driver after installing Appium 2.x.',
          'Running multiple Appium servers concurrently on the same port (4723), resulting in `EADDRINUSE`.',
        ],
        keyTakeaways: [
          'Appium 2.x server is useless without at least one driver installed.',
          'Start Appium simply with `appium` in terminal before executing tests.',
        ],
      },
      {
        title: '3. Essential ADB (Android Debug Bridge) Commands',
        summary: 'Learn the core ADB commands every mobile QA uses every single day.',
        explanation:
          'ADB is the command-line bridge between your computer and the Android device/emulator. Here are the 8 indispensable commands:\n\n' +
          '• `adb devices`: Lists all connected physical devices and running emulators with their unique device UDID.\n' +
          '• `adb install -r app-debug.apk`: Installs or updates an APK on the connected device (`-r` retains app data).\n' +
          '• `adb uninstall com.example.shop`: Removes an application by its package name.\n' +
          '• `adb shell dumpsys window | grep -E "mCurrentFocus"`: Reveals the currently displayed package and activity name on screen (crucial for configuring capabilities).\n' +
          '• `adb logcat -v time > device.log`: Streams real-time device logs for debugging crashes.\n' +
          '• `adb shell screencap -p /sdcard/screen.png`: Takes a screenshot directly on the device.\n' +
          '• `adb kill-server && adb start-server`: Restarts the ADB daemon if devices become unresponsive.',
        codeSnippet: {
          language: 'bash',
          filename: 'adb-daily-commands.sh',
          code: `# 1. Check if device is detected
$ adb devices
List of devices attached
emulator-5554    device

# 2. Extract current app package and activity
$ adb shell "dumpsys activity activities | grep -E \'mResumedActivity\'"
mResumedActivity: ActivityRecord{... com.swaglabsmobileapp/.MainActivity}

# Package Name:  com.swaglabsmobileapp
# Main Activity: .MainActivity`,
          explanation: 'Running dumpsys while your target app is open instantly gives you the exact package and activity names required for your Appium capabilities.',
        },
        realWorldScenario:
          'The developers hand you an APK file without documentation. Instead of waiting, you run `adb install`, launch the app manually, run `adb shell dumpsys`, and immediately retrieve the package and launcher activity to start automating.',
        commonMistakes: [
          'Confusing the APK filename (e.g. `shop-v2.1.apk`) with the application package name (`com.company.shop`).',
          'Not accepting the "Allow USB Debugging" RSA fingerprint prompt on a physical phone, causing `adb devices` to show `unauthorized`.',
        ],
        keyTakeaways: [
          'ADB is your primary diagnostic tool for inspecting and manipulating Android devices.',
          'Always verify `adb devices` shows `device` (not `offline` or `unauthorized`) before running tests.',
        ],
      },
    ],
    lab: {
      id: 'lab-day-2',
      labType: 'env_doctor',
      title: 'Appium Environment Doctor & Diagnostics Workbench',
      subtitle: 'Simulate a comprehensive system diagnostic check across Java, Android SDK, Appium 2.x, and ADB.',
      instructions: [
        'Run the diagnostic scan to inspect your environment configuration.',
        'Identify 3 misconfigurations: missing environment variable, missing driver, and unauthorized ADB device.',
        'Apply the correct remediation commands to bring the diagnostic score to 100% PASS.',
        'Verify that all 5 critical components are verified and ready for test execution.',
      ],
      initialState: {
        checks: [
          { name: 'Java JDK 17/21 Installation', status: 'pass', details: 'OpenJDK 17.0.8 detected at /Library/Java/Home' },
          { name: 'JAVA_HOME Environment Variable', status: 'pass', details: 'JAVA_HOME is set and points to valid JDK' },
          { name: 'ANDROID_HOME Environment Variable', status: 'fail', details: 'ANDROID_HOME is empty or not in PATH' },
          { name: 'Appium 2.x Server Binary', status: 'pass', details: 'Appium v2.5.1 detected globally' },
          { name: 'UiAutomator2 Driver Installed', status: 'fail', details: 'No drivers found. Run: appium driver install uiautomator2' },
          { name: 'ADB Device Connection State', status: 'warning', details: 'Device R5CR104ABCD is detected but marked "unauthorized"' },
        ],
      },
      solutionChecklist: [
        'Set ANDROID_HOME and add platform-tools to system PATH',
        'Run `appium driver install uiautomator2` to register the Android driver',
        'Accept USB debugging authorization prompt on the Android physical device',
        'Verify `adb devices` reports status "device"',
      ],
      hints: [
        'When a device shows "unauthorized", check the physical phone screen for the RSA key prompt.',
        'Appium 2.x requires explicitly running `appium driver install uiautomator2`.',
      ],
    },
    challenge: {
      id: 'challenge-day-2',
      title: 'Extract App Package and Activity via Terminal',
      scenario:
        'You are given an Android APK file named `SauceLabsApp.apk`. You must install it onto a connected emulator and find its launching activity without opening Android Studio.',
      task:
        'Write out the exact sequence of 3 terminal commands: 1) install the APK, 2) launch it or query the package name, and 3) retrieve the current focused activity.',
      starterSnippet: '# Step 1: Install the APK\n# Step 2: Query active package\n# Step 3: Extract activity',
      verificationCriteria: [
        'Uses `adb install -r <apk>`',
        'Uses `adb shell dumpsys` or `aapt dump badging` to extract package and activity',
        'Identifies format: `package/activity`',
      ],
      hints: [
        'Use `adb install -r SauceLabsApp.apk` first.',
        'Run `adb shell dumpsys window | grep -E "mCurrentFocus"` while the app is active.',
      ],
    },
    interviewQuestions: [
      {
        id: 'iq-2-1',
        category: 'Android Internals',
        question: 'What is the difference between an Android App Package name and an App Activity name?',
        idealAnswer:
          'An **App Package** (e.g. `com.swaglabsmobileapp`) is the globally unique identifier for an Android application on the device and Google Play Store. It acts as the namespace for the application process. An **App Activity** (e.g. `com.swaglabsmobileapp.MainActivity` or `.LoginActivity`) represents a single focused screen or window with which the user interacts. A single application package contains multiple activities (Login, ProductListing, Checkout). In Appium, `appPackage` specifies which app to launch, and `appActivity` specifies which screen to open initially.',
        interviewerEvaluationPoints: [
          'Clearly defines package as unique app identifier',
          'Defines activity as a user interface screen component',
          'Explains how both are used in Appium capabilities',
        ],
        followUpQuestions: [
          'How do you find the package and activity of an app already installed on your device?',
          'What happens if you provide an incorrect appActivity in Appium capabilities?',
        ],
      },
      {
        id: 'iq-2-2',
        category: 'Android Internals',
        question: 'What are the critical environment variables required for Android automation, and what does each point to?',
        idealAnswer:
          'Two primary environment variables are mandatory: 1) `JAVA_HOME`: Points to the root directory of the Java Development Kit (JDK 17 or 21), required by both Appium and Android SDK build tools to compile and execute Java code. 2) `ANDROID_HOME` (or `ANDROID_SDK_ROOT`): Points to the root directory where the Android SDK is installed. In addition, its subdirectories (`platform-tools` for ADB, `cmdline-tools` for SDK management, and `emulator`) must be appended to the system `PATH` so tools like `adb` can be executed from any terminal.',
        interviewerEvaluationPoints: [
          'Names JAVA_HOME and ANDROID_HOME',
          'Identifies the platform-tools folder containing ADB',
          'Mentions adding them to PATH',
        ],
      },
      {
        id: 'iq-2-3',
        category: 'Troubleshooting',
        question: 'When running `adb devices`, your physical Android phone displays "unauthorized". How do you resolve this?',
        idealAnswer:
          'The "unauthorized" status indicates that the host computer has not been granted permission by the Android device to establish an ADB debugging session via RSA key exchange. To resolve this: 1) Unlock the phone screen; 2) Check for the pop-up dialog asking "Allow USB debugging?"; 3) Check the box "Always allow from this computer" and tap "Allow"; 4) If the prompt does not appear, disconnect and reconnect the USB cable, or revoke previous authorizations in Developer Options and restart the ADB server via `adb kill-server && adb start-server`.',
        interviewerEvaluationPoints: [
          'Identifies RSA key authorization prompt on device screen',
          'Explains steps to accept or reset debugging permissions',
          'Mentions `adb kill-server` troubleshooting',
        ],
      },
      {
        id: 'iq-2-4',
        category: 'Fundamentals',
        question: 'What is the purpose of Appium Doctor (`@appium/doctor`) and what does it verify?',
        idealAnswer:
          'Appium Doctor is an official diagnostic command-line utility (installed via `npm install -g @appium/doctor`) that automatically scans your operating system to verify that all prerequisites for mobile automation are properly configured. It checks for: valid `JAVA_HOME`, `ANDROID_HOME`, presence of ADB and emulator binaries in PATH, required platform tools, Android build tools, and node version. It flags missing configurations with clear remediation recommendations before you run tests.',
        interviewerEvaluationPoints: [
          'Explains Appium Doctor as a prerequisite validation tool',
          'Lists key checks (JAVA_HOME, ANDROID_HOME, ADB)',
          'Explains how it prevents environment-related test failures',
        ],
      },
      {
        id: 'iq-2-5',
        category: 'Android Internals',
        question: 'Explain what happens when you run `adb install -r app.apk`. What does the `-r` flag do?',
        idealAnswer:
          'The `adb install` command pushes the specified APK file to the device’s data partition (`/data/local/tmp`) and invokes the Android Package Manager (`pm`) to parse the manifest, verify signatures, and install the application. The `-r` flag stands for "reinstall" or "replace existing application". It allows overwriting an already-installed application without uninstalling it first, crucially preserving the application’s cached internal data, shared preferences, and SQLite database.',
        interviewerEvaluationPoints: [
          'Explains that `-r` replaces an existing app',
          'Highlights that app data, cache, and user state are preserved',
          'Mentions package manager validation',
        ],
      },
    ],
    quiz: [
      {
        id: 'q-2-1',
        question: 'Which environment variable must point to the Android SDK installation directory?',
        options: [
          'ANDROID_HOME',
          'APP_PATH',
          'JAVA_SDK_DIR',
          'APPIUM_ROOT',
        ],
        correctAnswerIndex: 0,
        explanation:
          '`ANDROID_HOME` (or `ANDROID_SDK_ROOT`) is the standard variable that points to the Android SDK directory where platform-tools and build-tools are stored.',
      },
      {
        id: 'q-2-2',
        question: 'Which CLI command is used in Appium 2.x to install the official Android UiAutomator2 driver?',
        options: [
          'npm install uiautomator2-android',
          'appium driver install uiautomator2',
          'adb driver add uiautomator2',
          'appium-get android-driver',
        ],
        correctAnswerIndex: 1,
        explanation:
          'In Appium 2.x, drivers are managed using the `appium driver` CLI commands: `appium driver install uiautomator2`.',
      },
      {
        id: 'q-2-3',
        question: 'Which ADB command lists all connected physical devices and running emulators along with their state?',
        options: [
          'adb list-all',
          'adb devices',
          'adb get-state',
          'adb show-emulators',
        ],
        correctAnswerIndex: 1,
        explanation:
          '`adb devices` queries the ADB daemon and lists all detected hardware serial numbers and emulator ports with their authorization status.',
      },
      {
        id: 'q-2-4',
        question: 'Which subfolder of ANDROID_HOME contains the `adb` executable and must be added to your PATH?',
        options: [
          'platform-tools',
          'sources',
          'licenses',
          'skins',
        ],
        correctAnswerIndex: 0,
        explanation:
          '`platform-tools` inside ANDROID_HOME contains the `adb`, `fastboot`, and `sqlite3` command-line binaries.',
      },
      {
        id: 'q-2-5',
        question: 'What is the default port on which the Appium 2.x server listens for incoming HTTP test requests?',
        options: [
          '8080',
          '4723',
          '9222',
          '4444',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Port 4723 is the standard default port for the Appium server REST interface (`http://127.0.0.1:4723`).',
      },
    ],
  },

  // DAY 3
  {
    dayNumber: 3,
    slug: 'day-3',
    title: 'First Appium Test with Java & UiAutomator2Options',
    subtitle: 'Maven Dependencies, UiAutomator2Options, AndroidDriver & Session Lifecycle',
    badge: 'Java Test Authoring',
    duration: '50 mins',
    objectives: [
      'Create a standard Maven automation project with Java Client 9.x and TestNG',
      'Replace deprecated DesiredCapabilities with modern UiAutomator2Options',
      'Configure essential capabilities: platformName, automationName, deviceName, appPackage, appActivity',
      'Instantiate the AndroidDriver session and manage the lifecycle with @BeforeMethod and @AfterMethod',
      'Execute a first automated test and verify session teardown with driver.quit()',
    ],
    introduction:
      'Now that your environment is verified, it is time to write real automated Java code! In modern Appium 2.x, the old `DesiredCapabilities` class has been completely replaced by type-safe options classes. Today you will learn how to configure Maven, configure `UiAutomator2Options`, instantiate `AndroidDriver`, and execute your very first automated Android session with clean TestNG lifecycle management.',
    topics: [
      {
        title: '1. Maven Project Configuration (pom.xml)',
        summary: 'Set up pom.xml with Appium Java Client 9.x, Selenium 4.x, and TestNG.',
        explanation:
          'To automate mobile apps in Java, your Maven project requires two core dependencies: the Appium Java Client (which includes Selenium WebDriver) and the TestNG test runner framework:\n\n' +
          '• **`io.appium:java-client` (Version 9.x):** Provides `AndroidDriver`, `AppiumBy`, and mobile gesture classes.\n' +
          '• **`org.testng:testng` (Version 7.9+):** Provides test assertions, execution order, and suite management.',
        codeSnippet: {
          language: 'xml',
          filename: 'pom.xml',
          code: `<dependencies>
    <!-- Appium Java Client 9.x (includes Selenium 4.x) -->
    <dependency>
        <groupId>io.appium</groupId>
        <artifactId>java-client</artifactId>
        <version>9.2.2</version>
    </dependency>

    <!-- TestNG Framework -->
    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>7.9.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>`,
          explanation: 'Java Client 9.x natively pulls in the compatible Selenium 4.x dependencies. Do not mix older 7.x Java client versions with Appium 2.x.',
        },
        realWorldScenario:
          'A QA team upgrading to Appium 2.x had compilation errors because their pom.xml still referenced `java-client:7.6.0`. Upgrading to `9.2.2` resolved all deprecated method warnings.',
        commonMistakes: [
          'Importing conflicting older Selenium 3.x jars alongside Appium Java Client 9.x.',
          'Using JUnit 4 annotations instead of TestNG annotations.',
        ],
        keyTakeaways: [
          'Appium Java Client 9.x is built for Appium 2.x and Selenium 4.x.',
          'Always use compatible TestNG versions for test lifecycle management.',
        ],
      },
      {
        title: '2. UiAutomator2Options vs DesiredCapabilities',
        summary: 'Why DesiredCapabilities is deprecated and how to use type-safe UiAutomator2Options.',
        explanation:
          'In legacy Appium 1.x, developers used untyped string key-value pairs via `DesiredCapabilities` (e.g. `caps.setCapability("platformName", "Android")`). This was error-prone because typos like `"PlatfromName"` were only caught at runtime.\n\n' +
          'In Appium 2.x, the official standard is **`UiAutomator2Options`**, a strongly-typed Java class with dedicated setter methods:\n\n' +
          '• `setPlatformName("Android")`\n' +
          '• `setAutomationName("UiAutomator2")`\n' +
          '• `setDeviceName("Pixel_7_API_34")`\n' +
          '• `setApp("/path/to/app.apk")` (for installing a fresh APK)\n' +
          '• `setAppPackage("com.swaglabsmobileapp")` (for opening an already installed app)\n' +
          '• `setAppActivity(".MainActivity")`\n' +
          '• `setNoReset(true)` (preserves login session and cached data between tests)',
        codeSnippet: {
          language: 'java',
          filename: 'OptionsSetup.java',
          code: `import io.appium.java_client.android.options.UiAutomator2Options;
import java.time.Duration;

UiAutomator2Options options = new UiAutomator2Options();
options.setPlatformName("Android");
options.setAutomationName("UiAutomator2");
options.setDeviceName("emulator-5554");
options.setAppPackage("com.swaglabsmobileapp");
options.setAppActivity(".MainActivity");
options.setNoReset(true);
options.setNewCommandTimeout(Duration.ofSeconds(60));`,
          explanation: 'UiAutomator2Options provides compile-time safety and IDE autocompletion for all Android automation capabilities.',
        },
        realWorldScenario:
          'By configuring `options.setNoReset(true)`, your test skips entering credentials and two-factor SMS authentication on every single test method, cutting suite runtime in half.',
        commonMistakes: [
          'Using `DesiredCapabilities` in new Appium 2.x projects.',
          'Passing an invalid URL format when connecting to the Appium server.',
          'Forgetting `setAutomationName("UiAutomator2")`, causing Appium to attempt legacy automators.',
        ],
        keyTakeaways: [
          'Always use `UiAutomator2Options` in Appium 2.x Java projects.',
          '`setNoReset(true)` avoids reinstalling and clearing user state between tests.',
        ],
      },
      {
        title: '3. AndroidDriver Session Lifecycle & Clean Teardown',
        summary: 'Instantiating AndroidDriver, handling URISyntaxException, and proper cleanup.',
        explanation:
          'In Java Client 9.x, `new URL("http://127.0.0.1:4723")` constructor is deprecated in favor of `URI.create("http://127.0.0.1:4723").toURL()`. Here is the full canonical TestNG test class structure:',
        codeSnippet: {
          language: 'java',
          filename: 'FirstAppiumTest.java',
          code: `package com.rootaccess.appium;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.net.URI;
import java.time.Duration;

public class FirstAppiumTest {
    private AndroidDriver driver;

    @BeforeMethod
    public void setUp() throws Exception {
        UiAutomator2Options options = new UiAutomator2Options()
            .setPlatformName("Android")
            .setAutomationName("UiAutomator2")
            .setDeviceName("emulator-5554")
            .setAppPackage("com.swaglabsmobileapp")
            .setAppActivity(".MainActivity");

        // Appium 2.x server endpoint
        driver = new AndroidDriver(
            URI.create("http://127.0.0.1:4723").toURL(),
            options
        );
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }

    @Test
    public void testAppLaunch() {
        // Verify session initialized successfully
        Assert.assertNotNull(driver.getSessionId(), "Appium session should be active");
        System.out.println("Session ID: " + driver.getSessionId());
    }

    @AfterMethod(alwaysRun = true)
    public void tearDown() {
        if (driver != null) {
            driver.quit(); // Closes session and frees port
        }
    }
}`,
          explanation: 'Using `@BeforeMethod` and `@AfterMethod(alwaysRun = true)` ensures each test gets an isolated session and resources are freed even on assertion failures.',
        },
        realWorldScenario:
          'If a test fails and `driver.quit()` is not called inside a `finally` or `alwaysRun = true` block, the Appium session remains orphaned on the device, locking port 8200 and causing the next test run to hang.',
        commonMistakes: [
          'Using `driver.close()` instead of `driver.quit()` (`close()` is for browser tabs, `quit()` terminates the mobile session).',
          'Not wrapping session teardown in an `alwaysRun = true` annotation.',
        ],
        keyTakeaways: [
          '`driver.quit()` is mandatory to release the device session and port forwarders.',
          'Use `URI.create(...).toURL()` in modern Java 17+ to avoid deprecated URL constructors.',
        ],
      },
    ],
    lab: {
      id: 'lab-day-3',
      labType: 'options_builder',
      title: 'UiAutomator2Options & Driver Configurator Studio',
      subtitle: 'Build a production-grade UiAutomator2Options configuration and generate the complete Java test class.',
      instructions: [
        'Select your target Android device type (Emulator vs Physical Hardware).',
        'Configure the Application identifier (choose APK path vs package/activity).',
        'Toggle Session flags: `noReset`, `fullReset`, and `autoGrantPermissions`.',
        'Generate and inspect the resulting Java test class and verify all capabilities compile.',
      ],
      initialState: {
        platformName: 'Android',
        automationName: 'UiAutomator2',
        deviceName: 'Pixel_7_API_34',
        appPackage: 'com.swaglabsmobileapp',
        appActivity: '.MainActivity',
        noReset: true,
        fullReset: false,
        autoGrantPermissions: true,
        appiumServerUrl: 'http://127.0.0.1:4723',
      },
      solutionChecklist: [
        'Set platformName to Android and automationName to UiAutomator2',
        'Specify valid package and activity names',
        'Enable autoGrantPermissions to bypass OS permission popups',
        'Generate canonical Java AndroidDriver instantiation code',
      ],
      hints: [
        '`autoGrantPermissions(true)` prevents Android from blocking your test with camera/storage permission dialogs.',
        'Never set both `noReset: true` and `fullReset: true` at the same time as they contradict each other.',
      ],
    },
    challenge: {
      id: 'challenge-day-3',
      title: 'Refactor Deprecated DesiredCapabilities to UiAutomator2Options',
      scenario:
        'A legacy codebase contains an old Java class using `DesiredCapabilities caps = new DesiredCapabilities(); caps.setCapability("platformName", "Android");` which is causing deprecation warnings in Java 17.',
      task:
        'Rewrite the capability block using `UiAutomator2Options` with method chaining, including `setNewCommandTimeout(Duration.ofSeconds(90))`.',
      verificationCriteria: [
        'Uses `UiAutomator2Options options = new UiAutomator2Options()`',
        'Uses strongly typed setters (`setPlatformName`, `setAutomationName`, `setDeviceName`)',
        'Uses `Duration.ofSeconds(90)` for timeout configuration',
      ],
      hints: [
        'Remember that `UiAutomator2Options` supports method chaining: `new UiAutomator2Options().setPlatformName(...).setAutomationName(...)`.',
      ],
    },
    interviewQuestions: [
      {
        id: 'iq-3-1',
        category: 'TestNG & POM',
        question: 'Why is `DesiredCapabilities` deprecated in Appium 2.x and what is the recommended alternative in Java?',
        idealAnswer:
          'In Appium 1.x, `DesiredCapabilities` relied on generic string keys and `Object` values (a dictionary). This led to frequent runtime bugs due to typos in capability names or passing incorrect data types. In Appium 2.x, capabilities are strictly validated against W3C WebDriver schemas. The Appium Java Client 9.x deprecated `DesiredCapabilities` in favor of strongly-typed options classes, specifically `UiAutomator2Options` for Android and `XCUITestOptions` for iOS. These classes offer dedicated type-safe setter methods (e.g. `setAppPackage(String)`, `setNoReset(boolean)`), compile-time error checking, and IDE autocomplete.',
        interviewerEvaluationPoints: [
          'Explains untyped string dictionary limitations of DesiredCapabilities',
          'Mentions W3C WebDriver specification compliance',
          'Names `UiAutomator2Options` as the strongly-typed alternative in Java Client 9.x',
        ],
        followUpQuestions: [
          'What happens if you pass an unrecognized capability string to an Appium 2.x server?',
        ],
      },
      {
        id: 'iq-3-2',
        category: 'Android Internals',
        question: 'What is the difference between `noReset`, `fullReset`, and default reset behavior in Appium capabilities?',
        idealAnswer:
          'These flags control app installation and cache state between test sessions: 1) **Default (`noReset: false, fullReset: false`)**: Appium stops the app, clears the app cache and data (`adb shell pm clear`), and does not uninstall the APK. 2) **`noReset: true`**: Appium does not clear app data or cache. The app stays logged in and state is preserved across runs, which is ideal for fast test iteration. 3) **`fullReset: true`**: Appium uninstalls the entire app from the device at the end of the session, and installs it freshly from the provided APK at the start. It provides the cleanest slate but is the slowest.',
        interviewerEvaluationPoints: [
          'Clearly describes the 3 reset modes',
          'Explains impact on app data/cache vs APK uninstallation',
          'Articulates trade-off between test speed and isolation',
        ],
      },
      {
        id: 'iq-3-3',
        category: 'Framework Architecture',
        question: 'What is the difference between `driver.close()` and `driver.quit()` in Appium mobile automation?',
        idealAnswer:
          'In Selenium for desktop browsers, `driver.close()` closes the currently active browser window or tab, while `driver.quit()` terminates the entire browser process and ends the WebDriver session. In Appium mobile testing, `driver.close()` is generally unsupported or closes an open webview window in a hybrid app. **`driver.quit()`** is the critical method for mobile automation: it signals the Appium server to terminate the active session, uninstall/stop the UiAutomator2 instrumentation server, release the device ADB port forwarders (like port 8200), and free the device for subsequent tests.',
        interviewerEvaluationPoints: [
          'Explains why `driver.close()` is inappropriate for native mobile apps',
          'Explains `driver.quit()` session termination and port freeing',
          'Highlights importance of calling `driver.quit()` in `@AfterMethod`',
        ],
      },
      {
        id: 'iq-3-4',
        category: 'Troubleshooting',
        question: 'How do you handle Android system runtime permission popups (e.g. "Allow app to access photos/location") automatically in Appium?',
        idealAnswer:
          'There are two main strategies: 1) **Capability-based (Recommended):** Set `options.setAutoGrantPermissions(true)`. When the app is installed via ADB, Appium uses `pm grant` commands to automatically grant all requested dangerous runtime permissions before launching, preventing any dialogs from appearing during test execution. 2) **Dynamic handling:** In tests specifically validating permission denial flows, keep `autoGrantPermissions` false, locate the native Android permission dialog buttons via `AppiumBy.id("com.android.permissioncontroller:id/permission_allow_button")`, and explicitly click Allow or Deny.',
        interviewerEvaluationPoints: [
          'Names `autoGrantPermissions(true)` capability',
          'Explains when dynamic dialog interaction is needed',
          'Identifies Android system permission package (`com.android.permissioncontroller`)',
        ],
      },
      {
        id: 'iq-3-5',
        category: 'Fundamentals',
        question: 'Why is `new URL("http://127.0.0.1:4723")` marked as deprecated in Java 20+, and how should you write it in modern Appium code?',
        idealAnswer:
          'Starting in Java 20, the `URL(String)` constructor was deprecated because it does not properly escape characters or validate URI syntax according to RFC 2396, which can lead to security vulnerabilities. In modern Java 17/21 and Appium code, the official standard is to create a `URI` first and convert it to a `URL`: `URI.create("http://127.0.0.1:4723").toURL()`. This guarantees strict URI parsing before URL instantiation.',
        interviewerEvaluationPoints: [
          'Explains deprecation of `URL(String)` constructor in modern Java',
          'Demonstrates correct usage: `URI.create(...).toURL()`',
          'Shows awareness of modern Java standards',
        ],
      },
    ],
    quiz: [
      {
        id: 'q-3-1',
        question: 'Which class in Appium Java Client 9.x is the recommended, type-safe replacement for DesiredCapabilities on Android?',
        options: [
          'AndroidCapabilitiesMap',
          'UiAutomator2Options',
          'ChromeMobileOptions',
          'AppiumConfigurator',
        ],
        correctAnswerIndex: 1,
        explanation:
          '`UiAutomator2Options` is the official, strongly-typed configuration class for Android automation in Appium 2.x and Java Client 9.x.',
      },
      {
        id: 'q-3-2',
        question: 'What does setting `options.setNoReset(true)` do in an Appium Android test?',
        options: [
          'Uninstalls the app and wipes the phone clean before every test',
          'Prevents Appium from stopping the app or wiping its cached data/login state between runs',
          'Forces the Android device to reboot',
          'Disables all assertions in TestNG',
        ],
        correctAnswerIndex: 1,
        explanation:
          '`setNoReset(true)` prevents Appium from resetting the application state or clearing user data between tests, keeping user logins intact.',
      },
      {
        id: 'q-3-3',
        question: 'Which method must always be called in your test teardown (@AfterMethod) to terminate the Appium session and free the device?',
        options: [
          'driver.stop()',
          'driver.quit()',
          'driver.exit()',
          'driver.kill()',
        ],
        correctAnswerIndex: 1,
        explanation:
          '`driver.quit()` terminates the active W3C session on the Appium server, closes port forwarders, and releases device resources.',
      },
      {
        id: 'q-3-4',
        question: 'Which capability automatically grants all runtime Android permissions (Camera, Location, Storage) upon app installation?',
        options: [
          'setBypassPermissions(true)',
          'setAutoGrantPermissions(true)',
          'setDisableSecurity(true)',
          'setAllowEverything(true)',
        ],
        correctAnswerIndex: 1,
        explanation:
          '`options.setAutoGrantPermissions(true)` instructs Appium to grant all runtime permissions via ADB during installation.',
      },
      {
        id: 'q-3-5',
        question: 'In modern Java 17/21, what is the recommended way to instantiate the Appium server URL without deprecation warnings?',
        options: [
          'new URL("http://127.0.0.1:4723")',
          'URI.create("http://127.0.0.1:4723").toURL()',
          'AppiumURL.build(4723)',
          'HttpConnection.open("127.0.0.1:4723")',
        ],
        correctAnswerIndex: 1,
        explanation:
          '`URI.create("http://127.0.0.1:4723").toURL()` conforms to modern Java standards and avoids deprecated URL constructors.',
      },
    ],
  },

  // DAY 4
  {
    dayNumber: 4,
    slug: 'day-4',
    title: 'Mobile Element Locators & Appium Inspector',
    subtitle: 'Appium Inspector, Accessibility ID, Resource ID, UiSelector & XPath Pitfalls',
    badge: 'Locator Engineering',
    duration: '55 mins',
    objectives: [
      'Set up and configure Appium Inspector to inspect Android app view hierarchies',
      'Master the 4 core mobile locator strategies: Accessibility ID, Resource ID, UiSelector, and XPath',
      'Understand why Accessibility ID is the gold standard for mobile automation',
      'Write native Android UiSelector queries using `AppiumBy.androidUIAutomator`',
      'Analyze the performance and fragility pitfalls of deep XPath on mobile devices',
    ],
    introduction:
      'In web automation, you inspect HTML elements with Chrome DevTools. In mobile automation, there is no HTML! Instead, Android renders a hierarchical XML view tree of native components. Appium Inspector is your visual microscope to inspect this view tree. Today, you will learn how to inspect mobile elements and write rock-solid, resilient locators using `AppiumBy`.',
    topics: [
      {
        title: '1. Appium Inspector Setup & XML View Tree',
        summary: 'How Appium Inspector attaches to sessions and generates XML page sources.',
        explanation:
          'Appium Inspector is an open-source desktop GUI tool (or browser app) that connects to your running Appium Server:\n\n' +
          '1. Set **Remote Host**: `127.0.0.1`, **Remote Port**: `4723`, **Remote Path**: `/`.\n' +
          '2. Enter your `UiAutomator2Options` JSON capabilities.\n' +
          '3. Click **Start Session**: Appium launches the app on your device, takes a screenshot, and dumps the XML page source.\n' +
          '4. Clicking any on-screen button displays its attributes in the Inspector panel:\n' +
          '   • `content-desc` (Maps to Accessibility ID)\n' +
          '   • `resource-id` (Android Resource ID)\n' +
          '   • `class` (e.g. `android.widget.TextView`, `android.widget.Button`)\n' +
          '   • `text` (Visible button label or heading)\n' +
          '   • `clickable`, `enabled`, `displayed`, `bounds` (screen pixel coordinates)',
        realWorldScenario:
          'When an element does not have a unique resource ID, opening Appium Inspector allows you to inspect parent and sibling views to construct a unique UiSelector query or request that developers add a `content-desc` attribute.',
        commonMistakes: [
          'Entering `/wd/hub` as the remote path in Appium Inspector when running Appium 2.x (which uses `/`).',
          'Attempting to inspect an app while another test is actively driving the device.',
        ],
        keyTakeaways: [
          'Appium Inspector translates native Android UI widgets into an inspectable XML hierarchy.',
          'Always look for `content-desc` first, as it is the fastest and most stable locator.',
        ],
      },
      {
        title: '2. The 4 Mobile Locator Strategies in Appium Java',
        summary: 'Master AppiumBy: Accessibility ID, Resource ID, Android UIAutomator, and XPath.',
        explanation:
          'In Java Client 9.x, all mobile locators are accessed via the **`AppiumBy`** class (which extends Selenium’s `By`):\n\n' +
          '1. **Accessibility ID (`AppiumBy.accessibilityId("login_button")`):**\n' +
          '   • Maps to Android’s `content-desc` attribute.\n' +
          '   • **Speed & Stability:** 10/10. Cross-platform (works on iOS `accessibilityIdentifier` too).\n' +
          '   • *Always the #1 recommended locator strategy.*\n\n' +
          '2. **Resource ID (`AppiumBy.id("com.example.app:id/username_input")`):**\n' +
          '   • Maps to the Android developer’s `@id/username_input` defined in XML layouts.\n' +
          '   • **Speed & Stability:** 9/10. Unique within the screen in well-architected apps.\n\n' +
          '3. **Android UIAutomator (`AppiumBy.androidUIAutomator("...")`):**\n' +
          '   • Executes native Android `UiSelector` code directly inside the device process!\n' +
          '   • Powerful matching: `text("Login")`, `textContains("Checkout")`, `descriptionMatches(".*Cart.*")`.\n' +
          '   • **Speed & Stability:** 8/10. Highly versatile for finding elements by exact or partial text.\n\n' +
          '4. **XPath (`AppiumBy.xpath(\"//android.widget.Button[@text=\'Submit\']\")`):**\n' +
          '   • Evaluated by serializing the entire native view hierarchy into XML in memory, then running an XPath query.\n' +
          '   • **Speed & Stability:** 3/10. Slower on mobile; brittle if absolute paths (`/hierarchy/android.widget.FrameLayout...`) are used.',
        codeSnippet: {
          language: 'java',
          filename: 'LocatorsDemo.java',
          code: `import io.appium.java_client.AppiumBy;
import org.openqa.selenium.WebElement;

// 1. Accessibility ID (content-desc) - Best Practice
WebElement cartIcon = driver.findElement(AppiumBy.accessibilityId("test-Cart"));

// 2. Resource ID
WebElement usernameField = driver.findElement(AppiumBy.id("com.swaglabsmobileapp:id/user_name"));

// 3. Android UIAutomator (UiSelector)
WebElement loginBtn = driver.findElement(
    AppiumBy.androidUIAutomator("new UiSelector().text(\\"LOGIN\\").className(\\"android.widget.TextView\\")")
);

// 4. Relative XPath (use sparingly when no IDs exist)
WebElement itemTitle = driver.findElement(
    AppiumBy.xpath("//android.widget.TextView[@text='Sauce Labs Backpack']")
);`,
          explanation: 'Prioritize Accessibility ID and Resource ID over XPath to achieve sub-second element lookup speeds and test stability.',
        },
        realWorldScenario:
          'A suite of 200 mobile tests took 45 minutes to run because tests used deep XPath like `//android.widget.FrameLayout[1]/android.widget.LinearLayout[2]/...`. Refactoring to Accessibility IDs reduced test suite duration to 12 minutes.',
        commonMistakes: [
          'Copying absolute full XPath paths from Appium Inspector.',
          'Using Selenium `By.id` without the full package prefix when searching by Resource ID.',
          'Not escaping double quotes in `AppiumBy.androidUIAutomator` strings.',
        ],
        keyTakeaways: [
          'Hierarchy of preference: Accessibility ID > Resource ID > UiSelector > Relative XPath.',
          'Never use full absolute XPaths in mobile automation.',
        ],
      },
      {
        title: '3. Why XPath is Slow on Mobile & How to Optimize It',
        summary: 'Understand the performance cost of XPath on mobile and write optimized relative expressions.',
        explanation:
          'On desktop browsers, the browser’s C++ layout engine evaluates XPath in milliseconds. On Android, the device does not run an XPath engine natively. When you issue an XPath command:\n\n' +
          '1. The Appium UiAutomator2 server must traverse the entire Android Accessibility node tree.\n' +
          '2. It serializes the entire screen hierarchy into a massive XML string.\n' +
          '3. It parses that XML in memory using a Java XPath evaluator.\n' +
          '4. It matches the node and converts the index back to an Android AccessibilityNodeInfo handle.\n\n' +
          'On screens with deep nested layouts (like complex e-commerce product grids), a single XPath query can take 2 to 5 seconds! If you must use XPath, follow these optimization rules:\n' +
          '• Never write `//*` (scans every single node on screen).\n' +
          '• Always specify the tag name: `//android.widget.EditText[@text=\'Search\']`.\n' +
          '• Anchor searches relative to a unique parent container with an ID.',
        realWorldScenario:
          'When testing an infinite scroll feed, `driver.findElements(By.xpath("//*"))` caused the device to run out of memory (OOM). Switching to `AppiumBy.androidUIAutomator("new UiSelector().className(\"android.widget.TextView\")")` executed in 80 milliseconds.',
        commonMistakes: [
          'Using wildcards `//*` instead of specific Android widget class names.',
          'Indexing elements by position `[1]`, `[2]` which breaks when layout order shifts.',
        ],
        keyTakeaways: [
          'XPath requires full XML serialization on the device, incurring high performance overhead.',
          'Use specific class tags (`//android.widget.Button`) and unique attributes when XPath is unavoidable.',
        ],
      },
    ],
    lab: {
      id: 'lab-day-4',
      labType: 'locator_inspector',
      title: 'Mobile Element Hierarchy & Locator Selection Lab',
      subtitle: 'Inspect an interactive Android smartphone UI, analyze its XML view tree, and craft optimal AppiumBy selectors.',
      instructions: [
        'Click on different UI elements on the Android phone screen (Header, Username Input, Password Input, Login Button, Error Toast).',
        'Examine each element’s XML attributes: `content-desc`, `resource-id`, `class`, and `text`.',
        'Select the fastest and most robust locator strategy for each target element.',
        'Test your crafted selector against the mock DOM to verify 100% element resolution.',
      ],
      initialState: {
        activeElement: 'login_button',
        elements: [
          {
            id: 'el-1',
            name: 'Login Header Logo',
            widgetClass: 'android.widget.ImageView',
            contentDesc: 'App Logo',
            resourceId: 'com.swaglabsmobileapp:id/app_logo',
            text: '',
            bestLocator: 'AppiumBy.accessibilityId("App Logo")',
          },
          {
            id: 'el-2',
            name: 'Username Text Field',
            widgetClass: 'android.widget.EditText',
            contentDesc: 'test-Username',
            resourceId: 'com.swaglabsmobileapp:id/user_name_input',
            text: 'Username',
            bestLocator: 'AppiumBy.accessibilityId("test-Username")',
          },
          {
            id: 'el-3',
            name: 'Login Submit Button',
            widgetClass: 'android.widget.TextView',
            contentDesc: 'test-LOGIN',
            resourceId: 'com.swaglabsmobileapp:id/login_button',
            text: 'LOGIN',
            bestLocator: 'AppiumBy.accessibilityId("test-LOGIN")',
          },
          {
            id: 'el-4',
            name: 'Dynamic Error Toast Message',
            widgetClass: 'android.widget.TextView',
            contentDesc: '',
            resourceId: 'com.swaglabsmobileapp:id/error_message',
            text: 'Username and password do not match',
            bestLocator: 'AppiumBy.id("com.swaglabsmobileapp:id/error_message")',
          },
        ],
      },
      solutionChecklist: [
        'Map Login Header to Accessibility ID ("App Logo")',
        'Map Username Field to Accessibility ID ("test-Username")',
        'Map Login Button to Accessibility ID ("test-LOGIN")',
        'Map Error Toast to Resource ID ("com.swaglabsmobileapp:id/error_message")',
      ],
      hints: [
        'Whenever `content-desc` is populated, use `AppiumBy.accessibilityId()`.',
        'When `content-desc` is absent, use `AppiumBy.id()` with the resource-id.',
      ],
    },
    challenge: {
      id: 'challenge-day-4',
      title: 'Construct a Resilient UiSelector Query for Dynamic Text',
      scenario:
        'A shopping app has a dynamic cart counter badge showing "Cart (3 items)". The number of items changes dynamically.',
      task:
        'Write an `AppiumBy.androidUIAutomator` query that finds this element using `UiSelector` with a partial text match (`textStartsWith` or `textContains`).',
      verificationCriteria: [
        'Uses `AppiumBy.androidUIAutomator`',
        'Instantiates `new UiSelector()`',
        'Calls `.textStartsWith("Cart")` or `.textContains("Cart")`',
      ],
      hints: [
        'Syntax: `AppiumBy.androidUIAutomator("new UiSelector().textStartsWith(\\"Cart\\")")`.',
      ],
    },
    interviewQuestions: [
      {
        id: 'iq-4-1',
        category: 'Appium Inspector and Locators',
        question: 'Why is `Accessibility ID` considered the single best locator strategy in mobile test automation?',
        idealAnswer:
          'Accessibility ID is the premier locator strategy for three reasons: 1) **Performance:** It maps directly to Android’s native `content-desc` attribute and iOS’s `accessibilityIdentifier`. The mobile OS indexes accessibility attributes in memory for screen readers, making element lookup near-instantaneous without parsing XML trees. 2) **Cross-Platform Reusability:** If the mobile dev team assigns the same identifier to both Android and iOS apps, the exact same test script and Page Object locator can automate both platforms without conditional branching. 3) **Accessibility Compliance:** It encourages development teams to make applications accessible to visually impaired users.',
        interviewerEvaluationPoints: [
          'Explains mapping to content-desc (Android) and accessibilityIdentifier (iOS)',
          'Highlights cross-platform script reuse',
          'Mentions performance advantages over XPath',
        ],
        followUpQuestions: [
          'What strategy do you use if developers have not set Accessibility IDs?',
          'How does Appium resolve Resource IDs on Android?',
        ],
      },
      {
        id: 'iq-4-2',
        category: 'Appium Inspector and Locators',
        question: 'What is `AppiumBy.androidUIAutomator` and how does it work under the hood?',
        idealAnswer:
          '`AppiumBy.androidUIAutomator` is a specialized locator strategy that allows passing raw Java statements of the Android `UiSelector` class directly to the Android device. When the Appium server receives this command, it evaluates the string directly inside the `io.appium.uiautomator2.server` process running on the device using Java reflection. This allows advanced native querying such as: `new UiSelector().textContains("Order")`, `new UiSelector().checked(true)`, or chaining child lookups: `new UiSelector().resourceId("item_list").childSelector(new UiSelector().text("Backpack"))`. Because it runs natively inside the device process, it is much faster than XPath.',
        interviewerEvaluationPoints: [
          'Explains execution inside the on-device UiAutomator2 server process',
          'Provides examples of UiSelector methods (text, checked, childSelector)',
          'Contrasts speed with XPath',
        ],
      },
      {
        id: 'iq-4-3',
        category: 'Troubleshooting',
        question: 'Why should absolute XPath expressions (e.g. `/hierarchy/android.widget.FrameLayout[1]/...`) never be used in mobile automation?',
        idealAnswer:
          'Absolute XPath expressions are extremely brittle and fail at the slightest UI change. A minor update—such as adding a banner, changing a theme wrapper, or wrapping a view inside a new layout container—shifts the index hierarchy and breaks all tests instantly. Furthermore, absolute XPath forces Appium to serialize and traverse the entire UI tree from the device root down to the leaf node, resulting in multi-second lookup delays. Instead, automation engineers should request unique IDs or write concise relative selectors targeting stable anchor elements.',
        interviewerEvaluationPoints: [
          'Explains brittleness when layout hierarchies change',
          'Highlights the high performance penalty of full-tree serialization',
          'Advocates for unique IDs or relative anchoring',
        ],
      },
      {
        id: 'iq-4-4',
        category: 'Appium Inspector and Locators',
        question: 'How do you locate an element on Android that has the same Resource ID as several other elements on the screen (e.g. items in a RecyclerView)?',
        idealAnswer:
          'There are several robust techniques: 1) **FindElements collection:** Use `driver.findElements(AppiumBy.id("item_title"))` to retrieve a `List<WebElement>` and access items by index (`.get(0)`, `.get(1)`); 2) **Scoped searching:** Locate the parent card or row container first, then call `cardElement.findElement(AppiumBy.id("item_title"))`; 3) **UiSelector chaining:** Use `AppiumBy.androidUIAutomator("new UiSelector().resourceId(\"item_title\").text(\"Sauce Labs Backpack\")")`; 4) **Relative XPath with text predicate:** `//android.widget.TextView[@resource-id=\'item_title\' and @text=\'Sauce Labs Backpack\']`.',
        interviewerEvaluationPoints: [
          'Names `driver.findElements` collection handling',
          'Explains parent-child relative scoping',
          'Shows multi-attribute filtering using UiSelector or relative XPath',
        ],
      },
      {
        id: 'iq-4-5',
        category: 'Appium Inspector and Locators',
        question: 'What is the role of `bounds` in Appium Inspector and can it be used as a locator?',
        idealAnswer:
          'The `bounds` attribute displays the exact pixel coordinates of an element’s bounding rectangle on screen (e.g. `[0,184][1080,364]`, representing `[left,top][right,bottom]`). While you *can* tap coordinates using Touch Actions (`new Point(540, 274)`), using coordinates as a primary locator is an anti-pattern. Different Android devices have vastly different screen resolutions, aspect ratios, and pixel densities (DPI). A coordinate-based tap that works on a 1080p phone will completely miss the button on a 1440p tablet. Coordinates should only be used as a last resort for custom canvas views.',
        interviewerEvaluationPoints: [
          'Explains that bounds represent pixel coordinates',
          'Explains why coordinate-based testing fails across different screen sizes and DPIs',
          'Warns against using pixel taps as a standard locator strategy',
        ],
      },
    ],
    quiz: [
      {
        id: 'q-4-1',
        question: 'Which mobile attribute in an Android application maps directly to `AppiumBy.accessibilityId`?',
        options: [
          'android:contentDescription (`content-desc`)',
          'android:tag',
          'android:hint',
          'android:visibility',
        ],
        correctAnswerIndex: 0,
        explanation:
          'On Android, `AppiumBy.accessibilityId` maps to the `content-desc` (content description) attribute, which is used by accessibility tools like TalkBack.',
      },
      {
        id: 'q-4-2',
        question: 'What is the primary performance drawback of using XPath to find native mobile elements on Android?',
        options: [
          'XPath crashes the Android operating system kernel',
          'The device must serialize the entire native UI hierarchy into XML in memory before evaluating the query',
          'XPath is only supported on iOS, not Android',
          'Appium charges an extra fee for XPath queries',
        ],
        correctAnswerIndex: 1,
        explanation:
          'On mobile devices, XPath requires serializing the entire Android view tree into an XML document in memory, which is significantly slower than direct Accessibility ID lookups.',
      },
      {
        id: 'q-4-3',
        question: 'Which method on `AppiumBy` allows executing native Android `UiSelector` queries directly in the device process?',
        options: [
          'AppiumBy.nativeAndroid()',
          'AppiumBy.androidUIAutomator()',
          'AppiumBy.uiSelectorEngine()',
          'AppiumBy.deviceQuery()',
        ],
        correctAnswerIndex: 1,
        explanation:
          '`AppiumBy.androidUIAutomator("new UiSelector()...")` sends commands directly to the on-device UiAutomator2 server.',
      },
      {
        id: 'q-4-4',
        question: 'Why is an absolute XPath like `/hierarchy/android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/...` considered an anti-pattern?',
        options: [
          'It is too fast for Appium to handle',
          'It is extremely brittle and breaks whenever any parent layout or screen structure changes',
          'It requires root access on the Android device',
          'It can only be written in Kotlin, not Java',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Absolute XPaths hardcode every single parent tag and index; any minor UI update or banner addition breaks the entire locator.',
      },
      {
        id: 'q-4-5',
        question: 'When an element on Android lacks an Accessibility ID, what is the next best recommended locator strategy?',
        options: [
          'Hardcoded screen pixel tap coordinates',
          'Android Resource ID (`AppiumBy.id`)',
          'Deep absolute XPath',
          'Device reboot',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Resource ID (`AppiumBy.id("package:id/view_id")`) is fast, stable, and unique within well-designed Android layouts.',
      },
    ],
  },
  // DAY 5
  {
    dayNumber: 5,
    slug: 'day-5',
    title: 'Element Interactions, Form Entry & TestNG Assertions',
    subtitle: 'Mobile Actions: click, sendKeys, clear, hideKeyboard & Robust Assertions',
    badge: 'Mobile Interactions',
    duration: '50 mins',
    objectives: [
      'Master essential mobile element methods: click, sendKeys, clear, and getText',
      'Handle virtual mobile soft keyboards properly with driver.hideKeyboard()',
      'Query element states: isDisplayed(), isEnabled(), and isSelected()',
      'Implement strict validation assertions using TestNG Assert (assertEquals, assertTrue, assertFalse)',
      'Automate a complete mobile user registration and login form flow',
    ],
    introduction:
      'Locating elements is only the first half of automation; the real value comes from interacting with them and asserting that the mobile application behaves correctly. Mobile form entry introduces unique challenges: virtual soft keyboards that cover submit buttons, asynchronous input validation spinners, and device orientation shifts. Today you will master mobile interactions and strict TestNG validation.',
    topics: [
      {
        title: '1. Basic Mobile Actions: click(), sendKeys(), clear(), and getText()',
        summary: 'How to type text, clear inputs, click buttons, and extract on-screen labels.',
        explanation:
          'In Appium, mobile elements implement the standard WebElement interface with mobile-specific optimizations:\n\n' +
          '• element.sendKeys("standard_user"): Sends keystrokes to an active text input field. On Android, Appium can use the Unicode keyboard or ADB input service to type characters cleanly.\n\n' +
          '• element.clear(): Clears existing text from an input field. On mobile, some custom inputs do not clear with standard clear(); in those cases, selecting all text or sending Backspace keys via KeyEvent is used.\n\n' +
          '• element.click(): Emulates a single touch tap on the center of the element’s bounding rectangle.\n\n' +
          '• element.getText(): Retrieves the visible text of the widget (from Android’s android:text attribute).',
        codeSnippet: {
          language: 'java',
          filename: 'MobileFormActions.java',
          code: `WebElement usernameField = driver.findElement(AppiumBy.accessibilityId("test-Username"));\nusernameField.clear();\nusernameField.sendKeys("standard_user");\n\nWebElement passwordField = driver.findElement(AppiumBy.accessibilityId("test-Password"));\npasswordField.sendKeys("secret_sauce");\n\n// Hide soft keyboard if it covers the login button\nif (driver.isKeyboardShown()) {\n    driver.hideKeyboard();\n}\n\nWebElement loginBtn = driver.findElement(AppiumBy.accessibilityId("test-LOGIN"));\nloginBtn.click();`,
          explanation: 'Always check if the soft keyboard is visible and dismiss it before clicking buttons at the bottom of the screen.',
        },
        realWorldScenario:
          'On lower-resolution Android phones, entering text causes the soft keyboard to expand, completely occluding the "Continue to Payment" button. If the test attempts to click the button without hiding the keyboard, UiAutomator2 throws a WebDriverException: Element is not clickable at point error.',
        commonMistakes: [
          'Attempting to click a button hidden underneath the open soft keyboard.',
          'Using sendKeys without clearing preexisting placeholder text first.',
          'Assuming getText() works on image icons (use getAttribute("content-desc") instead).',
        ],
        keyTakeaways: [
          'Use driver.isKeyboardShown() and driver.hideKeyboard() to keep UI controls visible.',
          'For image or icon elements without text, extract getAttribute("content-desc").',
        ],
      },
      {
        title: '2. Element State Inspection: isDisplayed(), isEnabled(), and isSelected()',
        summary: 'Verifying widget visibility, interactivity, and toggle states.',
        explanation:
          'Before interacting with or asserting on an element, inspect its state:\n\n' +
          '• element.isDisplayed(): Returns true if the element is currently visible on the active screen viewport.\n' +
          '• element.isEnabled(): Returns true if the element is active and interactive (e.g. submit button enabled after form validation passes).\n' +
          '• element.isSelected(): Returns true if a CheckBox, RadioButton, or Switch widget is toggled ON.\n\n' +
          '• element.getAttribute(String attributeName): Fetches specific native Android attributes such as "checked", "clickable", "focusable", or "bounds".',
        realWorldScenario:
          'A checkout screen has a Terms & Conditions checkbox. The "Place Order" button remains grayed out (isEnabled() == false) until the user checks the box. Automating this requires asserting the button is disabled initially, clicking the checkbox, and asserting the button becomes enabled.',
        commonMistakes: [
          'Asserting isDisplayed() without waiting for animations to finish.',
          'Confusing isSelected() with isEnabled().',
        ],
        keyTakeaways: [
          'Always verify state transitions (e.g. disabled -> enabled) to test business logic.',
          'Attributes like checked and clickable can be queried via getAttribute().',
        ],
      },
      {
        title: '3. TestNG Assertions: Hard vs Soft Assertions on Mobile',
        summary: 'Writing decisive test validations with TestNG Assert and SoftAssert.',
        explanation:
          'Assertions define whether a test passes or fails:\n\n' +
          '• Hard Assertions (Assert.assertEquals, Assert.assertTrue): Immediately halts test execution upon failure. Perfect for critical path preconditions (e.g., if Login fails, there is no point trying to add items to cart).\n\n' +
          '• Soft Assertions (SoftAssert): Records failure messages and continues executing the remainder of the test method. All failures are aggregated and reported when softAssert.assertAll() is called at the end. Ideal for verifying multiple items on a profile or product details page.',
        codeSnippet: {
          language: 'java',
          filename: 'AssertionExamples.java',
          code: `import org.testng.Assert;\nimport org.testng.asserts.SoftAssert;\n\n// Hard Assertion - Critical gatekeeper\nAssert.assertTrue(productsTitle.isDisplayed(), "Products page should display after valid login");\nAssert.assertEquals(productsTitle.getText(), "PRODUCTS", "Header title must match exactly");\n\n// Soft Assertion - Multi-field UI verification\nSoftAssert softAssert = new SoftAssert();\nsoftAssert.assertEquals(cartBadge.getText(), "1", "Cart badge count mismatch");\nsoftAssert.assertTrue(checkoutBtn.isEnabled(), "Checkout button should be enabled");\nsoftAssert.assertEquals(productPrice.getText(), "$29.99", "Price tag mismatch");\nsoftAssert.assertAll(); // Flushes all assertion checks`,
          explanation: 'Use hard assertions for navigation milestones; use SoftAssert when validating multiple independent fields on a single screen.',
        },
        realWorldScenario:
          'Testing an Order Summary screen with 6 fields (Subtotal, Tax, Shipping, Total, Address, Delivery Date). If you use hard assertions, a bug in Tax halts the test, hiding that Shipping and Total are also broken. With SoftAssert, you capture all 3 defects in a single test run.',
        commonMistakes: [
          'Forgetting to call softAssert.assertAll(), causing broken tests to falsely pass!',
          'Writing assertions without descriptive failure message parameters.',
        ],
        keyTakeaways: [
          'Always supply meaningful failure message strings in assertions.',
          'Remember to invoke assertAll() whenever using SoftAssert.',
        ],
      },
    ],
    lab: {
      id: 'lab-day-5',
      labType: 'form_assertion',
      title: 'Android Login & Form Validation Studio',
      subtitle: 'Simulate mobile text input, keyboard dismissal, and TestNG assertion checks on an Android form.',
      instructions: [
        'Enter valid and invalid credentials into the simulated mobile input fields.',
        'Toggle the keyboard visibility state and trigger driver.hideKeyboard().',
        'Inspect element state transitions (isDisplayed, isEnabled).',
        'Run the TestNG assertion suite and observe pass/fail reporting.',
      ],
      initialState: {
        username: '',
        password: '',
        isKeyboardOpen: true,
        loginButtonEnabled: false,
        errorToastMessage: '',
      },
      solutionChecklist: [
        'Populate username and password fields',
        'Dismiss soft keyboard prior to tapping login',
        'Validate error banner appears for locked_out_user',
        'Validate products page header displays for standard_user',
      ],
      hints: [
        'Check driver.isKeyboardShown() before invoking hideKeyboard().',
        'TestNG assertions require: Assert.assertEquals(actual, expected, message).',
      ],
    },
    challenge: {
      id: 'challenge-day-5',
      title: 'Automate Error Message Validation for Locked Out User',
      scenario:
        'When logging in with username "locked_out_user" and password "secret_sauce", the app displays a red error banner saying "Sorry, this user has been locked out."',
      task:
        'Write the complete Java TestNG test method that inputs these credentials, clicks Login, waits for the error banner, and asserts its exact text.',
      starterSnippet: '@Test\npublic void testLockedOutUser() {\n    // TODO: Implement test\n}',
      verificationCriteria: [
        'Inputs username "locked_out_user" and password "secret_sauce"',
        'Hides keyboard before clicking login',
        'Locates error container and extracts text',
        'Asserts text matches "Sorry, this user has been locked out."',
      ],
      hints: [
        'Use Assert.assertTrue(errorText.contains("locked out")) or exact Assert.assertEquals.',
      ],
    },
    interviewQuestions: [
      {
        id: 'iq-5-1',
        category: 'Fundamentals',
        question: 'Why does driver.hideKeyboard() sometimes throw an exception, and how do you handle it safely in Appium Java?',
        idealAnswer:
          'On Android, if driver.hideKeyboard() is called when the virtual soft keyboard is NOT currently displayed on screen, the underlying UiAutomator2 driver throws a WebDriverException: Soft keyboard not present. To handle this safely, you should either: 1) Check if (driver.isKeyboardShown()) { driver.hideKeyboard(); } before calling it; or 2) Wrap the call in a try-catch block catching WebDriverException. In some custom Android keyboards, sending the Android Back key (driver.pressKey(new KeyEvent(AndroidKey.BACK))) is a reliable alternative.',
        interviewerEvaluationPoints: [
          'Explains the exception when keyboard is already closed',
          'Demonstrates conditional check with isKeyboardShown()',
          'Mentions Android Back key fallback',
        ],
      },
      {
        id: 'iq-5-2',
        category: 'TestNG & POM',
        question: 'Explain the difference between Hard Assertions and Soft Assertions in TestNG and when to use each in mobile testing.',
        idealAnswer:
          'Hard Assertions (Assert.assertEquals, Assert.assertTrue) immediately terminate the execution of the current test method upon failure, marking it as FAILED and skipping any remaining steps. They should be used for critical prerequisites where subsequent steps are meaningless if the check fails (e.g. verifying successful login before attempting to place an order). Soft Assertions (SoftAssert) record failures without interrupting execution, allowing the test to verify multiple independent UI elements (e.g. verifying 10 different labels, icons, and prices on a product page). Calling softAssert.assertAll() at the end aggregates and throws all recorded failures.',
        interviewerEvaluationPoints: [
          'Contrasts immediate failure vs delayed reporting',
          'Identifies assertAll() requirement for SoftAssert',
          'Provides clear use cases for both types',
        ],
      },
      {
        id: 'iq-5-3',
        category: 'Android Internals',
        question: 'How do you retrieve the value of a text field when element.getText() returns an empty string on Android?',
        idealAnswer:
          'In Android, text inputs often store placeholder hints or dynamic text inside different XML attributes. If element.getText() returns empty, you should inspect other native attributes using element.getAttribute("attributeName"): 1) element.getAttribute("text"): explicitly queries the text property; 2) element.getAttribute("content-desc"): checks the accessibility description; 3) element.getAttribute("hint"): checks the Android layout hint (placeholder text). For custom views, querying the element’s child android.widget.TextView node often resolves the text.',
        interviewerEvaluationPoints: [
          'Identifies getAttribute("text") and getAttribute("content-desc") alternatives',
          'Explains placeholder hints vs entered text',
          'Mentions inspecting child view nodes',
        ],
      },
      {
        id: 'iq-5-4',
        category: 'Fundamentals',
        question: 'What is the difference between isEnabled() and isDisplayed() on a mobile element?',
        idealAnswer:
          'isDisplayed() verifies whether the element is currently visible on the screen viewport and rendered with non-zero dimensions. An element can be 100% visible on screen while still being disabled. isEnabled() checks whether the element is interactable (its Android enabled attribute is true). For instance, a "Submit" button on a credit card payment screen is visible to the user (isDisplayed() == true), but grayed out and non-clickable (isEnabled() == false) until all card numbers and CVV codes are validly entered.',
        interviewerEvaluationPoints: [
          'Clearly distinguishes visual presence from functional interactivity',
          'Provides real-world example (disabled submit button)',
          'Understands Android enabled attribute mapping',
        ],
      },
      {
        id: 'iq-5-5',
        category: 'Troubleshooting',
        question: 'When entering text into an input field on Android, why does element.clear() sometimes fail to remove existing text, and how do you resolve it?',
        idealAnswer:
          'On some custom Android text views (e.g. currency fields or formatted phone inputs with input masks), the default element.clear() sends an empty string or clear intent that the app’s TextWatcher listener intercepts and overrides with formatted defaults (like $0.00). To resolve this: 1) Click the field to focus it; 2) Move cursor to end and repeatedly send Backspace: driver.pressKey(new KeyEvent(AndroidKey.DEL)); 3) Or select all and cut: select text using key combinations or send KeyCodes.KEYCODE_FORWARD_DEL; 4) Or set value directly via ADB: driver.executeScript("mobile: shell", Map.of("command", "input", "args", List.of("keyevent", "67"))).',
        interviewerEvaluationPoints: [
          'Understands Android TextWatcher and custom input masks',
          'Proposes Backspace / KeyCodes workaround',
          'Shows practical problem-solving experience',
        ],
      },
    ],
    quiz: [
      {
        id: 'q-5-1',
        question: 'Which Appium driver method checks if the virtual soft keyboard is currently open on the Android screen?',
        options: [
          'driver.isKeyboardShown()',
          'driver.hasSoftInput()',
          'driver.getKeyboardState()',
          'driver.keyboardActive()',
        ],
        correctAnswerIndex: 0,
        explanation:
          'driver.isKeyboardShown() returns a boolean indicating whether the soft keyboard is currently visible on the device.',
      },
      {
        id: 'q-5-2',
        question: 'What happens if you use TestNG SoftAssert but forget to call softAssert.assertAll() at the end of the test?',
        options: [
          'The test automatically fails with an IllegalStateException',
          'The test passes even if assertion conditions failed, hiding bugs',
          'The Android device powers off',
          'TestNG re-executes the test 5 times',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Without softAssert.assertAll(), failures are never evaluated or thrown, causing tests with assertion errors to falsely report as passed!',
      },
      {
        id: 'q-5-3',
        question: 'Which method returns whether an Android CheckBox or RadioButton is currently checked/toggled on?',
        options: [
          'element.isChecked()',
          'element.isSelected()',
          'element.isToggled()',
          'element.getActive()',
        ],
        correctAnswerIndex: 1,
        explanation:
          'element.isSelected() is the standard WebDriver method that queries whether a checkbox, radio button, or switch is selected.',
      },
      {
        id: 'q-5-4',
        question: 'Why should you dismiss the soft keyboard before attempting to click a button located near the bottom of an Android screen?',
        options: [
          'Android soft keyboards consume too much Wi-Fi bandwidth',
          'The expanded keyboard may physically occlude the button, causing element click intercept errors',
          'Appium does not allow any buttons to be clicked on Android',
          'The keyboard changes the APK package name',
        ],
        correctAnswerIndex: 1,
        explanation:
          'The soft keyboard overlays the lower portion of the screen; if the target button is underneath it, UiAutomator2 cannot click it.',
      },
      {
        id: 'q-5-5',
        question: 'Which TestNG assertion stops test execution immediately when the expected and actual values do not match?',
        options: [
          'SoftAssert.assertEquals()',
          'Assert.assertEquals() (Hard Assertion)',
          'Thread.yield()',
          'System.out.println()',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Hard assertions (Assert.assertEquals) throw an AssertionError immediately upon mismatch, halting the test method.',
      },
    ],
  },

  // DAY 6
  {
    dayNumber: 6,
    slug: 'day-6',
    title: 'Waits & Synchronisation Strategies',
    subtitle: 'Eliminate Flakiness with WebDriverWait, ExpectedConditions & StaleElement Handling',
    badge: 'Flakiness Elimination',
    duration: '55 mins',
    objectives: [
      'Understand why mobile network latency and view animations cause test flakiness',
      'Critique and eliminate Thread.sleep() in production mobile test suites',
      'Compare Implicit Wait vs Explicit Wait (WebDriverWait + ExpectedConditions)',
      'Master essential mobile expected conditions: visibilityOf, elementToBeClickable, invisibilityOf',
      'Diagnose and resolve StaleElementReferenceException and TimeoutException',
    ],
    introduction:
      'Flakiness is the number one enemy of mobile automation. A test that passes in local debugging but fails randomly in CI/CD erodes trust across the entire engineering team. Mobile apps are fundamentally asynchronous: network calls to backend microservices, screen transition animations, and background syncing mean elements do not appear instantaneously. Today you will master explicit synchronisation to build rock-solid, flakiness-proof tests.',
    topics: [
      {
        title: '1. Why Thread.sleep() Destroys Mobile Test Suites',
        summary: 'The technical reasons why hardcoded sleep leads to slow, brittle tests.',
        explanation:
          'Beginner automation scripts are often littered with Thread.sleep(5000). This is a severe anti-pattern:\n\n' +
          '1. Unnecessary Delay: If an element loads in 300ms, Thread.sleep(5000) wastes 4.7 seconds doing nothing. Multiplied across 500 tests, a 15-minute test suite balloons to over 2 hours.\n\n' +
          '2. Still Brittle: If a slow CI emulator or network lag takes 5001ms, the test still fails with NoSuchElementException!\n\n' +
          '3. Zero Polling Intelligence: Thread.sleep freezes the Java execution thread; it does not poll the mobile device or inspect whether the loading spinner has dismissed.',
        realWorldScenario:
          'A QA team had 120 mobile tests taking 1 hour and 15 minutes to run, with a 25% failure rate in Jenkins. Replacing all hardcoded sleeps with targeted WebDriverWait conditions reduced total run time to 18 minutes and dropped test failure rates to below 1%.',
        commonMistakes: [
          'Using Thread.sleep() to wait for network requests or screen transitions to finish.',
          'Increasing sleep durations whenever a test fails in CI instead of using proper waits.',
        ],
        keyTakeaways: [
          'Never use Thread.sleep in production test automation code.',
          'Explicit waits poll the device at 500ms intervals and proceed immediately when ready.',
        ],
      },
      {
        title: '2. Implicit Wait vs Explicit Wait (WebDriverWait)',
        summary: 'Understanding the mechanics and lifecycle of implicit vs explicit waits.',
        explanation:
          '• Implicit Wait (driver.manage().timeouts().implicitlyWait(...)):\n' +
          '  Configured once globally at the driver level. Tells Appium to poll the device view tree for up to N seconds whenever findElement is called before throwing NoSuchElementException.\n' +
          '  Limitation: Only waits for element presence in the view hierarchy, NOT whether the element is visible, clickable, or stable.\n\n' +
          '• Explicit Wait (WebDriverWait + ExpectedConditions):\n' +
          '  Applied conditionally to specific elements with targeted evaluation criteria:\n' +
          '  - visibilityOfElementLocated(By): waits until rendered and visible.\n' +
          '  - elementToBeClickable(By): waits until visible AND enabled for touch.\n' +
          '  - invisibilityOfElementLocated(By): waits until loading progress dialog dismisses.\n\n' +
          'Warning: Never mix high implicit waits with explicit waits, as W3C specifications state the combination produces unpredictable cumulative timeout multipliers.',
        codeSnippet: {
          language: 'java',
          filename: 'WaitStrategies.java',
          code: `import org.openqa.selenium.support.ui.WebDriverWait;\nimport org.openqa.selenium.support.ui.ExpectedConditions;\nimport java.time.Duration;\n\n// Instantiate explicit wait with 15-second timeout\nWebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));\n\n// 1. Wait for loading spinner to disappear\nwait.until(ExpectedConditions.invisibilityOfElementLocated(\n    AppiumBy.id("com.swaglabsmobileapp:id/loading_spinner")\n));\n\n// 2. Wait for target button to be clickable before tapping\nWebElement checkoutBtn = wait.until(\n    ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("test-CHECKOUT"))\n);\ncheckoutBtn.click();`,
          explanation: 'Explicit waits dynamically adapt: if an element appears in 100ms, execution resumes in 100ms without wasting time.',
        },
        realWorldScenario:
          'When placing an order, a modal spinner ("Processing payment...") displays for 2–4 seconds. Attempting to click "View Invoice" immediately fails because the modal intercepts the click. Waiting for ExpectedConditions.invisibilityOfElementLocated(spinner) makes the test 100% reliable.',
        commonMistakes: [
          'Setting a 30-second implicit wait and wondering why failing negative tests take 30 seconds to fail.',
          'Mixing implicit and explicit waits indiscriminately.',
        ],
        keyTakeaways: [
          'Use Explicit Wait (WebDriverWait) for dynamic elements, loaders, and state changes.',
          'Keep implicit wait minimal (0 to 5 seconds max).',
        ],
      },
      {
        title: '3. Handling StaleElementReferenceException on Mobile',
        summary: 'Why StaleElement happens on mobile and how to architect resilient retries.',
        explanation:
          'A StaleElementReferenceException occurs when an element was located, but before you interacted with it, the Android view hierarchy was destroyed or redrawn (e.g., due to screen rotation, list refresh, fragment transaction, or layout animation).\n\n' +
          'The stored WebElement ID in memory no longer points to a valid Android AccessibilityNodeInfo handle on the device.\n\n' +
          'How to prevent & resolve it:\n' +
          '1. Do not store WebElements in class fields: Store By locators, and call driver.findElement() at the exact moment of interaction.\n' +
          '2. Use WebDriverWait with ExpectedConditions.refreshed:\n' +
          '   wait.until(ExpectedConditions.refreshed(ExpectedConditions.elementToBeClickable(locator)));\n' +
          '3. Retry pattern: Implement an explicit retry helper method that re-queries the element if stale.',
        realWorldScenario:
          'An e-commerce product feed pulls down to refresh. A test locates the top product, the refresh completes, and clicking the previously located element throws StaleElementReferenceException. Re-locating the element after refresh finishes eliminates the crash.',
        commonMistakes: [
          'Reusing a WebElement instance across multiple screen navigations.',
          'Catching Exception generally instead of handling stale references specifically.',
        ],
        keyTakeaways: [
          'Stale elements happen when views redraw; re-locate the element immediately prior to action.',
          'Store By locators in Page Objects, not WebElement references.',
        ],
      },
    ],
    lab: {
      id: 'lab-day-6',
      labType: 'wait_decision',
      title: 'Mobile Dynamic Loading & Synchronisation Simulator',
      subtitle: 'Diagnose 3 flaky test scenarios with variable network delays and select optimal WebDriverWait conditions.',
      instructions: [
        'Observe the simulated mobile app with asynchronous API loading delays (500ms to 4000ms).',
        'Compare the behavior under Thread.sleep(2000) vs WebDriverWait.',
        'Select the appropriate ExpectedCondition for each scenario: button click, loading spinner disappearance, and stale view refresh.',
        'Run the benchmark simulation to verify 0% flakiness and optimal execution speed.',
      ],
      initialState: {
        scenarios: [
          {
            id: 'sync-1',
            name: 'Slow Order Submission API',
            delayMs: 3200,
            chosenStrategy: '',
            status: 'pending',
          },
          {
            id: 'sync-2',
            name: 'Animated Promo Banner Modal',
            delayMs: 1500,
            chosenStrategy: '',
            status: 'pending',
          },
          {
            id: 'sync-3',
            name: 'Pull-To-Refresh RecyclerView Redraw',
            delayMs: 2000,
            chosenStrategy: '',
            status: 'pending',
          },
        ],
      },
      solutionChecklist: [
        'Apply invisibilityOfElementLocated to dismiss the order submission spinner',
        'Apply elementToBeClickable for the animated promo banner close button',
        'Apply ExpectedConditions.refreshed for the redrawn RecyclerView item',
        'Verify test passes under both fast (500ms) and slow (4000ms) network conditions',
      ],
      hints: [
        'When waiting for a spinner to go away, use invisibilityOfElementLocated.',
        'When an element is redrawn after a refresh, use ExpectedConditions.refreshed.',
      ],
    },
    challenge: {
      id: 'challenge-day-6',
      title: 'Build a Reusable SafeClick Utility with Explicit Wait',
      scenario:
        'Your automation team is tired of random click failures due to animated transitions and temporary spinners across 15 different page classes.',
      task:
        'Write a reusable Java method public static void safeClick(AndroidDriver driver, By locator, int timeoutSeconds) that waits for visibility, waits for clickability, and retries once if a StaleElementReferenceException occurs.',
      verificationCriteria: [
        'Uses WebDriverWait with timeoutSeconds',
        'Waits for ExpectedConditions.elementToBeClickable(locator)',
        'Catches StaleElementReferenceException and retries re-locating the element',
      ],
      hints: [
        'Use a try-catch block inside a loop of 2 attempts, or use ExpectedConditions.refreshed.',
      ],
    },
    interviewQuestions: [
      {
        id: 'iq-6-1',
        category: 'Waits and Synchronisation',
        question: 'Why does mixing Implicit Wait and Explicit Wait cause unpredictable timeouts in Appium / Selenium?',
        idealAnswer:
          'According to the official W3C WebDriver specification, the behavior of mixing implicit and explicit waits is undefined and produces unpredictable results. An implicit wait is evaluated by the remote driver on the device during every findElement invocation. An explicit wait runs client-side polling loops in Java. When both are active, a single element lookup can trigger nested timeout loops, multiplying wait times unexpectedly (e.g. an explicit wait condition designed for 10 seconds may wait for 10s × 10s = 100 seconds before failing). The industry best practice is to set implicit wait to zero (or a very low 2–3 seconds) and rely exclusively on explicit WebDriverWait.',
        interviewerEvaluationPoints: [
          'Cites W3C specification regarding undefined mixed-wait behavior',
          'Explains client-side vs remote device polling interactions',
          'Recommends setting implicit wait to zero in favor of explicit waits',
        ],
      },
      {
        id: 'iq-6-2',
        category: 'Waits and Synchronisation',
        question: 'What is a StaleElementReferenceException, why does it occur on mobile devices, and how do you resolve it?',
        idealAnswer:
          'A StaleElementReferenceException occurs when an element that was previously identified in the DOM or Android view hierarchy is no longer attached to the current view. On mobile devices, this happens frequently during: 1) Fragment transitions and screen navigation; 2) RecyclerView list redraws or pull-to-refresh; 3) Orientation changes (portrait to landscape); 4) Dynamic content updates. To resolve it: avoid caching WebElement references in member variables; instead, store By locators and locate the element dynamically immediately prior to interaction. Additionally, use wait.until(ExpectedConditions.refreshed(ExpectedConditions.elementToBeClickable(locator))).',
        interviewerEvaluationPoints: [
          'Explains detachment from active Android view tree',
          'Identifies mobile triggers (RecyclerView redraw, fragments, screen rotation)',
          'Explains locator-based design pattern vs caching WebElements',
        ],
      },
      {
        id: 'iq-6-3',
        category: 'Waits and Synchronisation',
        question: 'What is the default polling interval of WebDriverWait in Java, and can you customize it?',
        idealAnswer:
          'In Selenium 4 and Appium Java Client, the default polling interval of WebDriverWait is 500 milliseconds (half a second). During this interval, it queries the device/driver and catches NotFoundException until the condition evaluates to true or the timeout expires. You can customize the polling interval using the overloaded constructor: new WebDriverWait(driver, Duration.ofSeconds(15), Duration.ofMillis(250)). You can also configure ignored exceptions using .ignoring(StaleElementReferenceException.class).',
        interviewerEvaluationPoints: [
          'Identifies 500ms default polling interval',
          'Demonstrates constructor with custom Duration polling',
          'Mentions .ignoring(...) configuration',
        ],
      },
      {
        id: 'iq-6-4',
        category: 'Waits and Synchronisation',
        question: 'How do you wait for a loading animation or progress bar to completely disappear before proceeding with a test?',
        idealAnswer:
          'You use ExpectedConditions.invisibilityOfElementLocated(By locator) or ExpectedConditions.invisibilityOf(WebElement element). This condition polls until either: 1) The element is no longer attached to the view tree; or 2) Its isDisplayed() property evaluates to false. For example:\nnew WebDriverWait(driver, Duration.ofSeconds(10)).until(ExpectedConditions.invisibilityOfElementLocated(AppiumBy.id("com.app:id/loading_indicator")));\nThis ensures the screen has stabilized before subsequent taps or assertions are attempted.',
        interviewerEvaluationPoints: [
          'Names ExpectedConditions.invisibilityOfElementLocated',
          'Explains that it handles both element detachment and visibility=false',
          'Highlights importance of waiting for loading screens to clear',
        ],
      },
      {
        id: 'iq-6-5',
        category: 'Troubleshooting',
        question: 'What is the difference between NoSuchElementException and TimeoutException in Appium?',
        idealAnswer:
          'NoSuchElementException is thrown when driver.findElement(By) fails to find any matching element in the view hierarchy within the configured implicit wait duration. TimeoutException is thrown by WebDriverWait when an explicit expected condition (such as visibilityOfElementLocated or elementToBeClickable) is not satisfied within the specified maximum timeout duration. In debugging, NoSuchElementException means the selector was wrong or the element never existed; TimeoutException means the element may exist, but failed to reach the required state (e.g. stayed disabled or never became visible).',
        interviewerEvaluationPoints: [
          'Distinguishes driver find failure vs explicit wait condition failure',
          'Explains how each error points to different root causes',
          'Demonstrates practical debugging acumen',
        ],
      },
    ],
    quiz: [
      {
        id: 'q-6-1',
        question: 'Why is Thread.sleep() strongly discouraged in production mobile automation test suites?',
        options: [
          'It is illegal according to Oracle Java licensing terms',
          'It freezes the thread unconditionally without polling, causing slow and flaky test runs',
          'It can only be executed on real devices, not emulators',
          'It changes the screen resolution of the phone',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Thread.sleep() pauses execution regardless of whether the element is ready, wasting seconds on fast steps and still failing on slow steps.',
      },
      {
        id: 'q-6-2',
        question: 'Which ExpectedCondition should you use to ensure a button is both visible on screen AND enabled for user interaction?',
        options: [
          'ExpectedConditions.presenceOfElementLocated',
          'ExpectedConditions.elementToBeClickable',
          'ExpectedConditions.titleIs',
          'ExpectedConditions.alertIsPresent',
        ],
        correctAnswerIndex: 1,
        explanation:
          'elementToBeClickable verifies that the target element is visible and that its enabled property is true.',
      },
      {
        id: 'q-6-3',
        question: 'What is the default polling interval of WebDriverWait in Java when checking conditions?',
        options: [
          '50 milliseconds',
          '500 milliseconds (0.5s)',
          '5 seconds',
          '60 seconds',
        ],
        correctAnswerIndex: 1,
        explanation:
          'WebDriverWait polls the target condition every 500 milliseconds by default.',
      },
      {
        id: 'q-6-4',
        question: 'Which exception is thrown when an element was located, but the Android screen redrew and destroyed the original reference?',
        options: [
          'StaleElementReferenceException',
          'IndexOutOfBoundsException',
          'NullPointerException',
          'StackOverflowError',
        ],
        correctAnswerIndex: 0,
        explanation:
          'StaleElementReferenceException occurs when a previously referenced view has been detached or redrawn in the view hierarchy.',
      },
      {
        id: 'q-6-5',
        question: 'Which ExpectedCondition is ideal for waiting until a "Please wait... Processing" spinner dialog dismisses?',
        options: [
          'ExpectedConditions.invisibilityOfElementLocated',
          'ExpectedConditions.elementToBeSelected',
          'ExpectedConditions.textToBePresentInElementValue',
          'ExpectedConditions.frameToBeAvailableAndSwitchToIt',
        ],
        correctAnswerIndex: 0,
        explanation:
          'invisibilityOfElementLocated waits until the element is either removed from the DOM/view tree or hidden from view.',
      },
    ],
  },

  // DAY 7
  {
    dayNumber: 7,
    slug: 'day-7',
    title: 'Mobile Gestures & Touch Actions',
    subtitle: 'W3C Actions API, Swipe, Scroll, Long Press & Android Hardware Keys',
    badge: 'Touch Gestures',
    duration: '60 mins',
    objectives: [
      'Understand the deprecation of legacy TouchAction in favor of the W3C Actions API',
      'Implement swipe, drag-and-drop, and long-press using PointerInput and Sequence',
      'Leverage Appium 2.x mobile script extensions (mobile: scrollGesture, mobile: swipeGesture)',
      'Scroll natively to elements using Android UiScrollable',
      'Simulate Android device keys: Back button, Home, and Enter using KeyEvent',
    ],
    introduction:
      'Mobile devices are tactile. Users pinch to zoom into product photos, swipe horizontally across featured carousels, pull down to refresh feeds, and scroll through infinite product listings. In legacy Appium, developers used the TouchAction class; in modern Appium 2.x and Java Client 9.x, TouchAction has been completely removed in compliance with the W3C Actions standard. Today you will learn how to automate touch gestures and hardware device keys cleanly.',
    topics: [
      {
        title: '1. The Modern W3C Actions API (PointerInput & Sequence)',
        summary: 'How W3C Actions emulate finger touch events through coordinated pointer sequences.',
        explanation:
          'In W3C WebDriver, touch interactions are modeled as a sequence of discrete physical events executed by a virtual pointer device:\n\n' +
          '1. PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");\n' +
          '2. Sequence sequence = new Sequence(finger, 1);\n' +
          '3. sequence.addAction(finger.createPointerMove(Duration.ZERO, Origin.viewport(), startX, startY)); (Move finger above glass)\n' +
          '4. sequence.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg())); (Press finger onto glass)\n' +
          '5. sequence.addAction(finger.createPointerMove(Duration.ofMillis(600), Origin.viewport(), endX, endY)); (Drag finger across screen)\n' +
          '6. sequence.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg())); (Lift finger off glass)\n' +
          '7. driver.perform(Collections.singletonList(sequence)); (Execute gesture on device)',
        codeSnippet: {
          language: 'java',
          filename: 'W3CGestureUtil.java',
          code: `import org.openqa.selenium.interactions.PointerInput;\nimport org.openqa.selenium.interactions.Sequence;\nimport java.time.Duration;\nimport java.util.Collections;\n\npublic static void swipe(AndroidDriver driver, int startX, int startY, int endX, int endY, int durationMs) {\n    PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger1");\n    Sequence swipe = new Sequence(finger, 1);\n\n    swipe.addAction(finger.createPointerMove(Duration.ZERO, PointerInput.Origin.viewport(), startX, startY));\n    swipe.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));\n    swipe.addAction(finger.createPointerMove(Duration.ofMillis(durationMs), PointerInput.Origin.viewport(), endX, endY));\n    swipe.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));\n\n    driver.perform(Collections.singletonList(swipe));\n}`,
          explanation: 'This reusable helper method executes any swipe or scroll gesture across any Android or iOS device using standard W3C primitives.',
        },
        realWorldScenario:
          'Swiping to delete an item from a shopping cart: you press on the item, drag horizontally to the left by 300 pixels, and lift your finger to reveal the red Delete button.',
        commonMistakes: [
          'Still trying to import io.appium.java_client.TouchAction (removed in Java Client 9.x).',
          'Setting Duration to ZERO during the pointer move, turning a swipe into an instant teleport that Android ignores.',
        ],
        keyTakeaways: [
          'TouchAction is removed; use W3C Actions (PointerInput and Sequence).',
          'Always supply a realistic drag duration (e.g. 500ms to 800ms) for smooth Android scrolling.',
        ],
      },
      {
        title: '2. Appium 2.x Mobile Extensions (mobile: scrollGesture & swipeGesture)',
        summary: 'Direct UiAutomator2 script shortcuts for high-speed scrolling and swiping.',
        explanation:
          'While W3C Actions work everywhere, Appium 2.x provides convenient high-level shortcuts via driver.executeScript():\n\n' +
          '• mobile: scrollGesture: Scrolls in a direction ("down", "up", "left", "right") within an element bounding box or full screen percentage.\n\n' +
          '• mobile: swipeGesture: Emulates a quick fling/swipe gesture.\n\n' +
          '• mobile: dragGesture: Drags an element from one coordinate to another.\n\n' +
          '• Android UiScrollable (The fastest scroll-to-text locator):\n' +
          '  driver.findElement(AppiumBy.androidUIAutomator(\n' +
          '    "new UiScrollable(new UiSelector().scrollable(true))" +\n' +
          '    ".scrollIntoView(new UiSelector().text(\"Terms of Service\"))"\n' +
          '  ));',
        codeSnippet: {
          language: 'java',
          filename: 'MobileExtensions.java',
          code: `import com.google.common.collect.ImmutableMap;\n\n// 1. Appium 2.x Scroll Gesture\ndriver.executeScript("mobile: scrollGesture", ImmutableMap.of(\n    "left", 100, "top", 100, "width", 800, "height", 1200,\n    "direction", "down",\n    "percent", 0.75\n));\n\n// 2. UiScrollable - Automatically scrolls until target text is visible!\nWebElement termsLink = driver.findElement(AppiumBy.androidUIAutomator(\n    "new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text(\"TERMS OF SERVICE\"))"\n));\ntermsLink.click();`,
          explanation: 'UiScrollable natively scrolls down until the specified element is on screen, then returns the WebElement in a single command!',
        },
        realWorldScenario:
          'On a 50-item product list, finding "Sauce Labs Fleece Jacket" requires scrolling 3 viewports down. Using UiScrollable scrolls automatically and stops precisely when the jacket is visible.',
        commonMistakes: [
          'Specifying a non-scrollable container with UiScrollable.',
          'Passing invalid direction strings (must be lowercase: "down", "up", "left", "right").',
        ],
        keyTakeaways: [
          'UiScrollable scrollIntoView is the most reliable way to find off-screen items on Android.',
          'mobile: scrollGesture is a built-in Appium 2.x script for viewport scrolling.',
        ],
      },
      {
        title: '3. Android Hardware Keys (Back, Home, Volume, Enter)',
        summary: 'Controlling physical device buttons with driver.pressKey() and AndroidKey.',
        explanation:
          'Android devices feature dedicated navigation keys that native apps rely on:\n\n' +
          '• Android Back Button: driver.pressKey(new KeyEvent(AndroidKey.BACK));\n' +
          '  Used to close navigation drawers, dismiss bottom sheets, or return to previous screens.\n\n' +
          '• Home Button: driver.pressKey(new KeyEvent(AndroidKey.HOME));\n' +
          '  Minimizes all apps and returns to the Android launcher home screen.\n\n' +
          '• Enter / Search Key: driver.pressKey(new KeyEvent(AndroidKey.ENTER));\n' +
          '  Submits a search query in an active search input.\n\n' +
          '• Screen Rotation: driver.rotate(ScreenOrientation.LANDSCAPE);',
        realWorldScenario:
          'A user taps a hamburger menu which slides a modal over the screen without a close button. The expected UX is that pressing the physical Android Back button dismisses the drawer. driver.pressKey(new KeyEvent(AndroidKey.BACK)) validates this flow.',
        commonMistakes: [
          'Attempting to find an on-screen "Back" button when the app relies on the system back key.',
          'Forgetting that pressing Back on the root activity may exit the app completely.',
        ],
        keyTakeaways: [
          'Use driver.pressKey(new KeyEvent(AndroidKey.BACK)) for Android system back navigation.',
          'AndroidKey enum contains all hardware keys (HOME, VOLUME_UP, CAMERA, ENTER).',
        ],
      },
    ],
    lab: {
      id: 'lab-day-7',
      labType: 'gesture_planner',
      title: 'Touch & Gesture Sequence Visualizer',
      subtitle: 'Visually configure W3C touch gestures, calculate coordinate vectors, and generate production Java code.',
      instructions: [
        'Select a gesture type: Vertical Scroll, Horizontal Swipe, or Long Press.',
        'Adjust the start and end coordinates on the simulated smartphone screen.',
        'Configure the gesture duration in milliseconds (e.g. 600ms).',
        'Review and copy the generated W3C Actions and UiScrollable Java code.',
      ],
      initialState: {
        gestureType: 'vertical_scroll',
        startX: 540,
        startY: 1400,
        endX: 540,
        endY: 400,
        durationMs: 600,
        scrollTargetText: 'Sauce Labs Onesie',
      },
      solutionChecklist: [
        'Configure vertical swipe from bottom (startY: 1400) to top (endY: 400)',
        'Configure horizontal swipe to remove cart item (startX: 900 to endX: 100)',
        'Generate W3C Sequence with PointerInput.Kind.TOUCH',
        'Generate native UiScrollable scrollIntoView snippet',
      ],
      hints: [
        'To scroll down, swipe your finger UP (from high Y to low Y coordinate).',
        'To swipe an item left to delete, move from high X (900) to low X (100).',
      ],
    },
    challenge: {
      id: 'challenge-day-7',
      title: 'Automate Scroll to Footer & Verify Copyright',
      scenario:
        'A mobile shopping catalogue has 20 items. At the very bottom of the page is a copyright footer: "© 2024 Sauce Labs. All Rights Reserved.".',
      task:
        'Write a Java method that uses UiScrollable to scroll directly to the copyright notice and asserts that it is displayed.',
      verificationCriteria: [
        'Uses AppiumBy.androidUIAutomator',
        'Uses UiScrollable with scrollIntoView',
        'Asserts footer is displayed and contains "Sauce Labs"',
      ],
      hints: [
        'new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("Sauce Labs"))',
      ],
    },
    interviewQuestions: [
      {
        id: 'iq-7-1',
        category: 'Mobile Gestures',
        question: 'Why was the TouchAction class removed in Appium Java Client 9.x and what is the current W3C replacement?',
        idealAnswer:
          'In legacy Appium versions, TouchAction was a proprietary Appium API. When the W3C WebDriver specification was finalized, it defined a standardized Actions API for pointer, key, and wheel inputs across all browsers and mobile devices. To eliminate redundant proprietary code and adhere strictly to the W3C standard, TouchAction was deprecated in Java Client 8.x and completely removed in Java Client 9.x. The modern replacement is the W3C Actions API using PointerInput, Sequence, and driver.perform(), or the Appium 2.x executeScript("mobile: scrollGesture") extensions.',
        interviewerEvaluationPoints: [
          'Explains W3C standard compliance reason for removal',
          'Names PointerInput and Sequence as modern Java classes',
          'Mentions executeScript mobile extensions',
        ],
      },
      {
        id: 'iq-7-2',
        category: 'Mobile Gestures',
        question: 'How does Android UiScrollable scrollIntoView work and why is it superior to manual coordinate swipes?',
        idealAnswer:
          'UiScrollable is a native Android UiAutomator class that operates directly inside the Android OS process. When you invoke scrollIntoView(UiSelector), the device itself manages the physics of scrolling, inspects the view tree after each fling, and continues scrolling until the target element appears in the viewport (or maximum scroll attempts are reached). It is vastly superior to hardcoded coordinate swipes because: 1) It automatically adapts to any screen resolution and aspect ratio; 2) It stops immediately once the element is visible; 3) It requires only a single line of Java code.',
        interviewerEvaluationPoints: [
          'Explains execution inside the on-device Android process',
          'Contrasts with fragile hardcoded pixel swipes',
          'Highlights resolution independence and automatic stopping',
        ],
      },
      {
        id: 'iq-7-3',
        category: 'Mobile Gestures',
        question: 'To scroll down a mobile page to see content below the fold, in which direction must the finger drag coordinates move?',
        idealAnswer:
          'To scroll DOWN (revealing lower content), the finger must touch the lower part of the screen and drag UPWARD. That means the starting Y coordinate must be larger than the ending Y coordinate (e.g. from Y=1400 down near the navigation bar to Y=400 near the top header). The X coordinate remains constant (e.g. X=540 on a 1080p screen) to avoid triggering accidental horizontal page swipes.',
        interviewerEvaluationPoints: [
          'Correctly identifies high Y to low Y coordinate movement',
          'Explains why X coordinate is kept centered and fixed',
          'Demonstrates understanding of touch mechanics',
        ],
      },
      {
        id: 'iq-7-4',
        category: 'Android Internals',
        question: 'How do you simulate pressing the Android Back button and Home button in Appium Java Client 9.x?',
        idealAnswer:
          'In Java Client 9.x, Android hardware key events are triggered using driver.pressKey() with a KeyEvent object:\n// Press Back key\ndriver.pressKey(new KeyEvent(AndroidKey.BACK));\n// Press Home key\ndriver.pressKey(new KeyEvent(AndroidKey.HOME));\n// Submit / Enter key\ndriver.pressKey(new KeyEvent(AndroidKey.ENTER));\nThis triggers native Android system key events identical to physical hardware button presses.',
        interviewerEvaluationPoints: [
          'Uses `driver.pressKey(new KeyEvent(AndroidKey.BACK))` syntax',
          'Names the AndroidKey enum',
          'Distinguishes back key from in-app UI back buttons',
        ],
      },
      {
        id: 'iq-7-5',
        category: 'Mobile Gestures',
        question: 'How do you perform a Long Press (Touch & Hold) gesture using W3C Actions in Appium?',
        idealAnswer:
          'A long press is executed by inserting a pause between the pointerDown and pointerUp actions in a W3C Sequence:\n1) PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger1");\n2) Sequence longPress = new Sequence(finger, 1);\n3) longPress.addAction(finger.createPointerMove(Duration.ZERO, Origin.viewport(), x, y));\n4) longPress.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));\n5) longPress.addAction(new Pause(finger, Duration.ofSeconds(2))); // Hold for 2 seconds\n6) longPress.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));\n7) driver.perform(Collections.singletonList(longPress));\nAlternatively, you can call driver.executeScript("mobile: longClickGesture", ImmutableMap.of("elementId", ((RemoteWebElement) element).getId(), "duration", 2000)).',
        interviewerEvaluationPoints: [
          'Explains pause between pointerDown and pointerUp',
          'Demonstrates W3C Sequence construction with Pause action',
          'Mentions `mobile: longClickGesture` alternative',
        ],
      },
    ],
    quiz: [
      {
        id: 'q-7-1',
        question: 'Which API replaced the legacy TouchAction class in Appium Java Client 9.x?',
        options: [
          'W3C Actions API (PointerInput & Sequence)',
          'FlashAction Engine',
          'MouseOver Simulator',
          'AndroidGestureLegacy',
        ],
        correctAnswerIndex: 0,
        explanation:
          'The W3C Actions API (using PointerInput, Sequence, and driver.perform) is the official standard replacing TouchAction.',
      },
      {
        id: 'q-7-2',
        question: 'To scroll down a vertical list, what should the relation between startY and endY be?',
        options: [
          'startY < endY (swiping downward)',
          'startY > endY (swiping upward from bottom to top)',
          'startY == endY (no vertical movement)',
          'Y coordinates do not matter for scrolling',
        ],
        correctAnswerIndex: 1,
        explanation:
          'To move content upward and reveal items below, the finger presses at a high Y coordinate and drags toward a lower Y coordinate.',
      },
      {
        id: 'q-7-3',
        question: 'Which UiAutomator class automatically scrolls through a container until an element with the target text is displayed?',
        options: [
          'UiScrollable',
          'UiNavigator',
          'UiTouchFling',
          'UiPagingController',
        ],
        correctAnswerIndex: 0,
        explanation:
          '`new UiScrollable(...).scrollIntoView(...)` scrolls through the container until the specified selector is visible.',
      },
      {
        id: 'q-7-4',
        question: 'How do you send an Android system BACK key event in Java Client 9.x?',
        options: [
          'driver.navigate().back() or driver.pressKey(new KeyEvent(AndroidKey.BACK))',
          'driver.sendKeys(Keys.ESCAPE)',
          'driver.close()',
          'adb.sendBack()',
        ],
        correctAnswerIndex: 0,
        explanation:
          '`driver.pressKey(new KeyEvent(AndroidKey.BACK))` triggers the native Android back hardware key press.',
      },
      {
        id: 'q-7-5',
        question: 'Why should the pointer move action in a swipe sequence have a duration like 600ms instead of 0ms?',
        options: [
          'A duration of 0ms causes the touch event to be treated as an instantaneous jump/tap rather than a continuous drag',
          'Appium requires all swipes to be at least 10 seconds long',
          'Duration controls screen brightness',
          'Android ignores all gestures with durations over 100ms',
        ],
        correctAnswerIndex: 0,
        explanation:
          'A non-zero duration allows the Android touch subsystem to register a velocity vector and perform a smooth drag/scroll.',
      },
    ],
  },

  // DAY 8
  {
    dayNumber: 8,
    slug: 'day-8',
    title: 'Android Contexts & Application States',
    subtitle: 'Automate Hybrid Apps with WebView Context Switching & Manage App Lifecycles',
    badge: 'Hybrid & Lifecycle',
    duration: '50 mins',
    objectives: [
      'Differentiate between NATIVE_APP and WEBVIEW contexts in hybrid mobile applications',
      'Inspect and switch between contexts using driver.getContextHandles() and driver.context()',
      'Manage Android application lifecycles: backgrounding, activation, and termination',
      'Query application states using driver.queryAppState()',
      'Automate dynamic system runtime permission dialogs',
    ],
    introduction:
      'Many production applications (such as banking apps, e-commerce checkouts, and customer support chats) are hybrid: native headers and tabs wrap an embedded web browser view. If your test attempts to locate an HTML element while Appium is in native context, the search fails. Today you will learn how to inspect and switch contexts, control background app lifecycles, and handle system alerts.',
    topics: [
      {
        title: '1. Hybrid Mobile Apps & Context Switching',
        summary: 'How to switch between NATIVE_APP and WEBVIEW contexts seamlessly.',
        explanation:
          'When testing a hybrid application, Appium maintains multiple execution contexts:\n\n' +
          '• NATIVE_APP: Default context where Appium communicates with Android Accessibility view widgets.\n' +
          '• WEBVIEW_<package>: Context created when an Android WebView (Chromium) is active.\n\n' +
          'To interact with web elements inside the WebView:\n' +
          '1. Retrieve available contexts: Set<String> contexts = driver.getContextHandles();\n' +
          '2. Switch to webview: driver.context("WEBVIEW_com.swaglabsmobileapp");\n' +
          '3. Now you can use standard Selenium Web locators: By.cssSelector("#checkout-btn"), By.name("email")!\n' +
          '4. Switch back to native: driver.context("NATIVE_APP");',
        codeSnippet: {
          language: 'java',
          filename: 'ContextSwitchingDemo.java',
          code: `// Print all active contexts\nSet<String> contextNames = driver.getContextHandles();\nfor (String context : contextNames) {\n    System.out.println("Available Context: " + context);\n}\n\n// Switch to WebView context\nfor (String context : contextNames) {\n    if (context.contains("WEBVIEW")) {\n        driver.context(context);\n        break;\n    }\n}\n\n// Now interact with HTML DOM elements via CSS selector\nWebElement webInput = driver.findElement(By.cssSelector("input#credit_card_number"));\nwebInput.sendKeys("4111222233334444");\n\n// Switch back to Native App context for device navigation\ndriver.context("NATIVE_APP");`,
          explanation: 'Context switching enables full Selenium CSS and JavaScript execution inside embedded mobile WebViews.',
        },
        realWorldScenario:
          'An e-commerce app has native product browsing, but checkout loads a Shopify or Stripe webview. Without switching to the WEBVIEW context, the credit card inputs cannot be found by UiAutomator2.',
        commonMistakes: [
          'Trying to use CSS selectors while still in the NATIVE_APP context.',
          'Forgetting to switch back to NATIVE_APP after completing webview interactions.',
          'App WebView does not have setWebContentsDebuggingEnabled(true) enabled in Android debug builds.',
        ],
        keyTakeaways: [
          'Use driver.getContextHandles() to discover active WebViews.',
          'Switch to WEBVIEW to access HTML DOM; switch back to NATIVE_APP for native widgets.',
        ],
      },
      {
        title: '2. Application Lifecycle & Background State Management',
        summary: 'Testing how the app responds when sent to the background or interrupted.',
        explanation:
          'Real mobile users constantly switch apps, take phone calls, or verify OTPs in other apps. Appium allows testing these exact lifecycle scenarios:\n\n' +
          '• Background the app: driver.runAppInBackground(Duration.ofSeconds(5));\n' +
          '  Sends the app to the background for 5 seconds, then brings it back to the foreground!\n\n' +
          '• Query app state: ApplicationState state = driver.queryAppState("com.swaglabsmobileapp");\n' +
          '  Returns enum: NOT_INSTALLED, NOT_RUNNING, RUNNING_IN_BACKGROUND, or RUNNING_IN_FOREGROUND.\n\n' +
          '• Terminate and Activate: driver.terminateApp("com.app"); driver.activateApp("com.app");',
        codeSnippet: {
          language: 'java',
          filename: 'AppLifecycleDemo.java',
          code: `import io.appium.java_client.appmanagement.ApplicationState;\n\n// 1. Verify app is in foreground\nAssert.assertEquals(\n    driver.queryAppState("com.swaglabsmobileapp"),\n    ApplicationState.RUNNING_IN_FOREGROUND\n);\n\n// 2. Simulate user switching to an OTP SMS app for 5 seconds\ndriver.runAppInBackground(Duration.ofSeconds(5));\n\n// 3. Verify user session was NOT lost after resuming\nWebElement cartIcon = driver.findElement(AppiumBy.accessibilityId("test-Cart"));\nAssert.assertTrue(cartIcon.isDisplayed(), "Cart state should be preserved after resuming from background");`,
          explanation: 'Testing app backgrounding ensures user form inputs and cart contents are not wiped when switching apps.',
        },
        realWorldScenario:
          'A banking app should lock the screen and require biometric re-authentication if backgrounded for more than 30 seconds. driver.runAppInBackground() verifies this critical security requirement.',
        commonMistakes: [
          'Assuming apps retain state when backgrounded without explicitly testing it.',
          'Passing negative durations to runAppInBackground.',
        ],
        keyTakeaways: [
          'driver.runAppInBackground() tests app suspension and resume resilience.',
          'driver.queryAppState() verifies whether an app crashed or is still running.',
        ],
      },
      {
        title: '3. Handling System Alerts & Runtime Permissions Dynamically',
        summary: 'Interacting with native Android OS permission alerts when autoGrant is disabled.',
        explanation:
          'While options.setAutoGrantPermissions(true) is great for smoke tests, negative test scenarios often require testing permission rejection flows:\n\n' +
          'When an alert pops up, inspect its system resource ID:\n' +
          '• Allow Button: AppiumBy.id("com.android.permissioncontroller:id/permission_allow_button")\n' +
          '• Deny Button: AppiumBy.id("com.android.permissioncontroller:id/permission_deny_button")\n' +
          '• Precise Location: AppiumBy.id("com.android.permissioncontroller:id/permission_location_accuracy_fine")',
        realWorldScenario:
          'Testing a delivery app: if the user clicks \"Don\'t Allow\" on location permissions, the app must display a manual address entry bar instead of crashing with a NullPointerException.',
        commonMistakes: [
          'Using standard Selenium driver.switchTo().alert() for Android permission dialogs (on Android, permission dialogs are native OS activities, not JavaScript alerts).',
        ],
        keyTakeaways: [
          'Android permission dialogs are native view elements located via com.android.permissioncontroller:id.',
          'Do not use driver.switchTo().alert() for Android system permission popups.',
        ],
      },
    ],
    lab: {
      id: 'lab-day-8',
      labType: 'context_permission',
      title: 'Hybrid Context Switcher & App Lifecycle Studio',
      subtitle: 'Simulate switching between NATIVE_APP and WEBVIEW contexts and test backgrounding state transitions.',
      instructions: [
        'Inspect the active contexts of a simulated hybrid shopping application.',
        'Switch context from NATIVE_APP to WEBVIEW_com.shopping.checkout.',
        'Interact with web inputs using CSS selectors, then switch back to NATIVE_APP.',
        'Trigger a 5-second background state and verify that session data persists upon resume.',
      ],
      initialState: {
        activeContext: 'NATIVE_APP',
        availableContexts: ['NATIVE_APP', 'WEBVIEW_com.shopping.checkout'],
        appState: 'RUNNING_IN_FOREGROUND',
        cartItemCount: 2,
      },
      solutionChecklist: [
        'Query getContextHandles() and find WEBVIEW context',
        'Switch to WEBVIEW context and fill in payment inputs',
        'Switch back to NATIVE_APP context',
        'Simulate runAppInBackground(Duration.ofSeconds(5)) and assert cartItemCount is still 2',
      ],
      hints: [
        'Always verify context names by iterating over driver.getContextHandles().',
        'Remember that NATIVE_APP is the default context identifier.',
      ],
    },
    challenge: {
      id: 'challenge-day-8',
      title: 'Automate Hybrid Payment Web Checkout & Verify Return to Native',
      scenario:
        'A user taps "Checkout" in a native app, which opens a WebView payment page. After entering a promo code inside the WebView, the user taps "Done" which returns to the native confirmation screen.',
      task:
        'Write the Java TestNG test method that switches to the WebView, enters the promo code via CSS selector, clicks Apply, switches back to NATIVE_APP, and verifies the native order total.',
      verificationCriteria: [
        'Switches to WEBVIEW context',
        'Uses By.cssSelector inside the web view',
        'Switches back to NATIVE_APP',
        'Asserts native confirmation element is displayed',
      ],
      hints: [
        'driver.context("WEBVIEW_...") -> do actions -> driver.context("NATIVE_APP").',
      ],
    },
    interviewQuestions: [
      {
        id: 'iq-8-1',
        category: 'Android Internals',
        question: 'How do you automate a Hybrid mobile application in Appium and what is required for WebViews to be inspectable?',
        idealAnswer:
          'To automate a Hybrid app in Appium: 1) Query active contexts using driver.getContextHandles(); 2) Switch context using driver.context("WEBVIEW_<package>"); 3) Interact with the embedded HTML DOM using standard Selenium locators (CSS, ID, XPath); 4) Switch back to the native app context via driver.context("NATIVE_APP"). For Android WebViews to be inspectable and accessible via ChromeDriver, the Android developers must enable WebView debugging in the application source code: WebView.setWebContentsDebuggingEnabled(true) in the Application or Activity onCreate method. Without this flag, getContextHandles() will only return NATIVE_APP on non-rooted devices.',
        interviewerEvaluationPoints: [
          'Explains context switching steps (getContextHandles -> context)',
          'Identifies WebView.setWebContentsDebuggingEnabled(true) requirement',
          'Mentions switching back to NATIVE_APP',
        ],
      },
      {
        id: 'iq-8-2',
        category: 'Android Internals',
        question: 'What is the purpose of driver.runAppInBackground(Duration duration) and what real-world scenarios does it test?',
        idealAnswer:
          'driver.runAppInBackground(Duration duration) sends the application under test to the Android background (triggering onPause and onStop lifecycle callbacks), waits for the specified duration, and then automatically brings the application back to the foreground (triggering onRestart, onStart, and onResume). This tests crucial real-world user scenarios: 1) Verifying that in-memory state (shopping cart items, filled forms) is preserved and not cleared by Android OS memory reclamation; 2) Testing security session timeouts (e.g. banking apps locking after 1 minute in background); 3) Simulating user interruptions like checking an SMS or switching to an authenticator app.',
        interviewerEvaluationPoints: [
          'Explains Android activity lifecycle callbacks (onPause, onResume)',
          'Identifies state preservation and security timeout testing',
          'Highlights real-world user interruption simulation',
        ],
      },
      {
        id: 'iq-8-3',
        category: 'Android Internals',
        question: 'What are the possible values returned by driver.queryAppState(String bundleId) and what does each indicate?',
        idealAnswer:
          'driver.queryAppState returns an ApplicationState enum with 5 possible values: 1) NOT_INSTALLED: The app with the specified package ID is not installed on the device; 2) NOT_RUNNING: The app is installed but has no active process in memory; 3) RUNNING_IN_BACKGROUND_SUSPENDED: The app is suspended in the background; 4) RUNNING_IN_BACKGROUND: The app is executing background tasks; 5) RUNNING_IN_FOREGROUND: The app is active on screen and receiving user input.',
        interviewerEvaluationPoints: [
          'Identifies key ApplicationState enum values',
          'Explains difference between NOT_RUNNING and RUNNING_IN_BACKGROUND',
          'Explains practical use in test assertions',
        ],
      },
      {
        id: 'iq-8-4',
        category: 'Troubleshooting',
        question: 'Why does driver.switchTo().alert() fail on Android runtime permission dialogs, and how should they be automated?',
        idealAnswer:
          'driver.switchTo().alert() is designed specifically for web-based JavaScript alerts (window.alert, window.confirm). On Android, runtime permission prompts (for Camera, Location, Notifications) are NOT JavaScript alerts; they are native Android operating system dialogs rendered by the com.android.permissioncontroller system package. To automate them: locate the dialog buttons as native elements using AppiumBy.id("com.android.permissioncontroller:id/permission_allow_button") and click them directly.',
        interviewerEvaluationPoints: [
          'Explains difference between web alerts and native OS dialogs',
          'Identifies com.android.permissioncontroller package',
          'Demonstrates locator-based permission handling',
        ],
      },
      {
        id: 'iq-8-5',
        category: 'Android Internals',
        question: 'What happens if you try to use By.cssSelector when the active context is NATIVE_APP?',
        idealAnswer:
          'Appium throws an InvalidArgumentException with a message explaining that CSS Selectors are not supported for native mobile applications. Native Android views do not have a Cascading Style Sheet engine or HTML tags. CSS selectors can only be evaluated when the active driver context is switched to a WEBVIEW.',
        interviewerEvaluationPoints: [
          'Names InvalidArgumentException',
          'Explains that native views lack CSS/HTML support',
          'Reiterates need for context switching',
        ],
      },
    ],
    quiz: [
      {
        id: 'q-8-1',
        question: 'Which method in Appium Java returns all available execution contexts (Native and WebViews)?',
        options: [
          'driver.getContextHandles()',
          'driver.getAllWindows()',
          'driver.listViews()',
          'driver.getAvailableScreens()',
        ],
        correctAnswerIndex: 0,
        explanation:
          'driver.getContextHandles() returns a Set<String> containing "NATIVE_APP" and any active "WEBVIEW_<name>" identifiers.',
      },
      {
        id: 'q-8-2',
        question: 'What developer flag must be enabled in an Android debug build for Appium to inspect its WebViews on non-rooted devices?',
        options: [
          'WebView.setWebContentsDebuggingEnabled(true)',
          'android:allowBackup="true"',
          'System.enableHtmlInspection()',
          'app.debugWeb = 1',
        ],
        correctAnswerIndex: 0,
        explanation:
          'WebView.setWebContentsDebuggingEnabled(true) allows the Chrome DevTools protocol to attach to embedded WebViews.',
      },
      {
        id: 'q-8-3',
        question: 'Which driver method sends the app to the background for a specific duration and automatically restores it?',
        options: [
          'driver.runAppInBackground(Duration duration)',
          'driver.sleepApp()',
          'driver.minimize(5)',
          'driver.pauseProcess()',
        ],
        correctAnswerIndex: 0,
        explanation:
          'driver.runAppInBackground(Duration duration) sends the app to the background for the specified duration and brings it back to the foreground.',
      },
      {
        id: 'q-8-4',
        question: 'Which context identifier must you pass to driver.context() to switch back to native Android controls?',
        options: [
          'NATIVE_APP',
          'DEFAULT_VIEW',
          'ANDROID_OS',
          'ROOT_CONTEXT',
        ],
        correctAnswerIndex: 0,
        explanation:
          '`NATIVE_APP` is the universal, standardized context name for native mobile views in Appium.',
      },
      {
        id: 'q-8-5',
        question: 'Which enum value indicates an application is currently active on screen and receiving touch inputs?',
        options: [
          'ApplicationState.RUNNING_IN_FOREGROUND',
          'ApplicationState.ACTIVE_WINDOW',
          'ApplicationState.STARTED',
          'ApplicationState.VISIBLE',
        ],
        correctAnswerIndex: 0,
        explanation:
          'ApplicationState.RUNNING_IN_FOREGROUND indicates the app is currently running in the foreground.',
      },
    ],
  },

  // DAY 9
  {
    dayNumber: 9,
    slug: 'day-9',
    title: 'TestNG Suite Organization & Execution',
    subtitle: 'TestNG Lifecycle Annotations, Test Suites (testng.xml), Groups & Priority',
    badge: 'TestNG Architecture',
    duration: '50 mins',
    objectives: [
      'Master the complete TestNG annotation lifecycle: @BeforeSuite, @BeforeClass, @BeforeMethod, @Test, etc.',
      'Organize test cases into functional groups (smoke, regression, e2e)',
      'Configure testng.xml suites with custom parameters and package inclusion',
      'Manage test execution dependencies and ordering with priority and dependsOnMethods',
      'Understand parallel mobile test execution considerations',
    ],
    introduction:
      'Writing individual automated test methods is great, but running them in an enterprise environment requires disciplined test orchestration. How do you run only smoke tests before every pull request? How do you pass device UDIDs to parallel execution runners? How do you ensure test setup and cleanup run reliably? TestNG is the leading test framework for Java mobile automation. Today you will master TestNG test suites.',
    topics: [
      {
        title: '1. The TestNG Annotation Lifecycle Hierarchy',
        summary: 'Understanding the execution order of all TestNG annotations.',
        explanation:
          'TestNG executes annotations in a strict hierarchical order:\n\n' +
          '1. @BeforeSuite: Runs once before any test in the entire testng.xml suite executes (ideal for starting Appium server or generating ExtentReports).\n' +
          '2. @BeforeTest: Runs before any test class inside the <test> tag in testng.xml.\n' +
          '3. @BeforeClass: Runs once before the first test method in the current class executes.\n' +
          '4. @BeforeMethod: Runs before EACH test method (starts new AndroidDriver session or resets app state).\n' +
          '5. @Test: The actual test execution method containing steps and assertions.\n' +
          '6. @AfterMethod: Runs after EACH test method (captures failure screenshot, calls driver.quit()).\n' +
          '7. @AfterClass: Cleans up class-level resources.\n' +
          '8. @AfterSuite: Flushes reports and shuts down background services.',
        codeSnippet: {
          language: 'java',
          filename: 'LifecycleDemo.java',
          code: `public class LoginTests extends BaseTest {\n\n    @BeforeClass\n    public void setupClass() {\n        System.out.println("Starting LoginTests class suite");\n    }\n\n    @BeforeMethod(alwaysRun = true)\n    public void setupApp() {\n        // Initializes fresh AndroidDriver session before each test\n        initDriver();\n    }\n\n    @Test(groups = {"smoke", "regression"}, priority = 1)\n    public void testValidLogin() {\n        // Test steps\n    }\n\n    @AfterMethod(alwaysRun = true)\n    public void tearDown() {\n        // Quits driver to ensure isolation\n        quitDriver();\n    }\n}`,
          explanation: 'Using @BeforeMethod and @AfterMethod guarantees each test executes in clean isolation without cross-test state leakage.',
        },
        realWorldScenario:
          'If a test fails with an assertion error, without `alwaysRun = true` on `@AfterMethod`, TestNG will skip teardown, leaving the AndroidDriver session dangling and failing all subsequent tests.',
        commonMistakes: [
          'Omitting `alwaysRun = true` on @AfterMethod, causing teardown to be skipped on test failure.',
          'Confusing @BeforeTest with @BeforeMethod.',
        ],
        keyTakeaways: [
          '@BeforeMethod and @AfterMethod provide per-test isolation.',
          'Always add `alwaysRun = true` to teardown methods.',
        ],
      },
      {
        title: '2. Suite Configuration via testng.xml',
        summary: 'Defining suites, tests, classes, packages, and parameters in XML.',
        explanation:
          'In enterprise automation, tests are executed using a testng.xml runner file rather than clicking play in the IDE. This enables CI/CD integration:\n\n' +
          'Key XML tags:\n' +
          '• <suite name="Mobile Regression Suite">\n' +
          '• <test name="Pixel 7 Tests">\n' +
          '• <parameter name="deviceName" value="emulator-5554" />\n' +
          '• <parameter name="platformVersion" value="14.0" />\n' +
          '• <groups><run><include name="smoke" /></run></groups>\n' +
          '• <classes><class name="com.rootaccess.tests.LoginTest" /></classes>',
        codeSnippet: {
          language: 'xml',
          filename: 'testng.xml',
          code: `<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">\n<suite name="RootAccess Mobile Automation Suite" verbose="1">\n    <parameter name="appiumServerUrl" value="http://127.0.0.1:4723" />\n\n    <test name="Smoke Tests - Android">\n        <groups>\n            <run>\n                <include name="smoke" />\n            </run>\n        </groups>\n        <classes>\n            <class name="com.rootaccess.tests.LoginTest" />\n            <class name="com.rootaccess.tests.ProductCatalogTest" />\n            <class name="com.rootaccess.tests.CheckoutTest" />\n        </classes>\n    </test>\n</suite>`,
          explanation: 'Running `mvn test -DsuiteXmlFile=testng.xml` executes exactly the test classes and groups defined in this XML.',
        },
        realWorldScenario:
          'Running a 10-minute smoke suite on every pull request, and scheduling a full 2-hour regression suite overnight simply by switching the XML suite file in the CI pipeline.',
        commonMistakes: [
          'Misspelling group names in XML `<include name="smoke" />` resulting in zero tests executed.',
          'Not providing a DTD header, causing XML validation warnings.',
        ],
        keyTakeaways: [
          'testng.xml is the command center for running targeted test suites in CI/CD.',
          'Groups allow slicing test runs into smoke, sanity, and full regression.',
        ],
      },
      {
        title: '3. Priority, Dependencies & Parallel Execution Considerations',
        summary: 'Controlling method execution order and understanding mobile parallel testing.',
        explanation:
          '• priority = 1, priority = 2: Tests with lower numbers run first (default is 0). Note: Well-designed tests should be independent, but priority is useful for ordered reporting.\n\n' +
          '• dependsOnMethods = {"testValidLogin"}: Skips the dependent test if the prerequisite test fails.\n\n' +
          '• Parallel Execution on Mobile:\n' +
          '  Unlike desktop browsers where Chrome can open 10 tabs simultaneously, each Android physical device or emulator can only run ONE active UiAutomator2 session at a time!\n' +
          '  To run tests in parallel across multiple devices, each test thread must have a unique deviceName/udid, unique systemPort (e.g. 8201, 8202) for port forwarding, and a ThreadLocal<AndroidDriver> instance.',
        realWorldScenario:
          'Running 2 tests simultaneously on the same emulator port causes port collision on port 8200. Configuring unique systemPort capabilities per device thread allows true multi-device parallel runs.',
        commonMistakes: [
          'Attempting to run parallel tests on the same physical phone without unique systemPort capabilities.',
          'Making tests strictly dependent on prior tests instead of designing isolated setup steps.',
        ],
        keyTakeaways: [
          'Independent tests are always preferable to dependent tests.',
          'Mobile parallel execution requires one device/emulator and unique systemPort per thread.',
        ],
      },
    ],
    lab: {
      id: 'lab-day-9',
      labType: 'testng_architect',
      title: 'TestNG Annotation & Suite XML Architect',
      subtitle: 'Construct a multi-class testng.xml suite, configure smoke/regression groups, and sequence lifecycle annotations.',
      instructions: [
        'Arrange the TestNG lifecycle annotations into their correct runtime order.',
        'Tag test methods with functional groups: `smoke`, `regression`, and `e2e`.',
        'Configure a `testng.xml` suite that includes only `smoke` tests.',
        'Validate the execution plan to confirm that teardown runs even on assertion failure.',
      ],
      initialState: {
        selectedGroups: ['smoke'],
        testClasses: ['LoginTest', 'ProductCatalogTest', 'CheckoutTest'],
        executionOrder: [],
      },
      solutionChecklist: [
        'Sequence: BeforeSuite -> BeforeClass -> BeforeMethod -> Test -> AfterMethod -> AfterClass',
        'Configure testng.xml with `<include name="smoke" />`',
        'Set `alwaysRun = true` on AfterMethod',
        'Verify independent execution of Login and Checkout tests',
      ],
      hints: [
        'BeforeMethod runs before every individual @Test method.',
        'Use groups to filter tests without modifying Java source code.',
      ],
    },
    challenge: {
      id: 'challenge-day-9',
      title: 'Author a Production testng.xml with Parameter Injection',
      scenario:
        'Your CI/CD environment needs to run tests against different Android OS versions by passing a parameter from Jenkins into your Java BaseTest.',
      task:
        'Write the XML snippet for `testng.xml` defining a parameter named `platformVersion` with value `14.0`, and write the Java `@BeforeMethod` that accepts this `@Parameters("platformVersion") String version`.',
      verificationCriteria: [
        'testng.xml contains `<parameter name="platformVersion" value="14.0"/>`',
        'Java method has `@Parameters({"platformVersion"})` annotation',
        'Method signature accepts `String version` parameter',
      ],
      hints: [
        'Use `org.testng.annotations.Parameters` in Java.',
      ],
    },
    interviewQuestions: [
      {
        id: 'iq-9-1',
        category: 'TestNG & POM',
        question: 'Explain the complete execution order of TestNG annotations from Suite to Method.',
        idealAnswer:
          'The execution hierarchy is: 1) @BeforeSuite; 2) @BeforeTest; 3) @BeforeClass; 4) @BeforeMethod; 5) @Test; 6) @AfterMethod; 7) @AfterClass; 8) @AfterTest; 9) @AfterSuite. If multiple @Test methods exist in a class, @BeforeMethod and @AfterMethod execute before and after each individual test method. If testng.xml has multiple <test> tags, @BeforeTest and @AfterTest bracket each test tag.',
        interviewerEvaluationPoints: [
          'Lists the 8 annotations in exact chronological order',
          'Clarifies BeforeMethod executes per test method',
          'Explains BeforeTest corresponds to <test> tags in XML',
        ],
      },
      {
        id: 'iq-9-2',
        category: 'TestNG & POM',
        question: 'Why should you always set `alwaysRun = true` on `@AfterMethod` in an Appium test framework?',
        idealAnswer:
          'By default in TestNG, if a setup method (@BeforeMethod) fails or an assertion fails inside a configuration block, TestNG skips subsequent dependent methods. If your teardown method (@AfterMethod) does not have `alwaysRun = true`, any assertion failure in the test will cause TestNG to skip calling `driver.quit()`. As a result, the Appium session remains active on the device, the ADB port forwarder remains locked, and all subsequent tests in the suite will fail with port binding or session creation errors.',
        interviewerEvaluationPoints: [
          'Explains risk of skipped teardown after assertion failure',
          'Highlights port locking and orphaned Appium sessions',
          'Demonstrates enterprise framework design best practice',
        ],
      },
      {
        id: 'iq-9-3',
        category: 'Framework Architecture',
        question: 'How do you run Appium tests in parallel across multiple Android devices using TestNG?',
        idealAnswer:
          'To run Appium tests in parallel: 1) In `testng.xml`, configure `<suite parallel="tests" thread-count="2">` or `<suite parallel="classes">`; 2) In the test framework, use a `ThreadLocal<AndroidDriver>` to ensure each thread maintains an isolated driver instance; 3) In your capabilities for each device thread, assign a unique `udid` (e.g. `emulator-5554` and `emulator-5556`) and a unique `systemPort` capability (e.g. `8200` for device 1 and `8201` for device 2) so UiAutomator2 port forwarders do not collide.',
        interviewerEvaluationPoints: [
          'Mentions TestNG `parallel="tests"` and thread-count',
          'Explains `ThreadLocal<AndroidDriver>` for thread safety',
          'Highlights mandatory unique `systemPort` capability per device',
        ],
      },
      {
        id: 'iq-9-4',
        category: 'TestNG & POM',
        question: 'What is the difference between `priority` and `dependsOnMethods` in TestNG?',
        idealAnswer:
          '`priority` specifies the desired execution order of test methods (lowest number runs first, e.g. priority = 1 before priority = 2). However, all prioritized tests run regardless of whether prior tests passed or failed. `dependsOnMethods` establishes a strict dependency: if the prerequisite test method fails or is skipped, TestNG automatically marks the dependent test as SKIPPED without running it. In mobile automation, test independence is preferred, but dependsOnMethods is helpful for linear multi-step journeys.',
        interviewerEvaluationPoints: [
          'Contrasts ordering (priority) vs prerequisite pass requirement (dependsOnMethods)',
          'Explains SKIPPED status on dependency failure',
          'Discusses test independence best practice',
        ],
      },
      {
        id: 'iq-9-5',
        category: 'TestNG & POM',
        question: 'How do you group test cases in TestNG and execute only a specific group from Maven CLI?',
        idealAnswer:
          'In Java, tag test methods with the `groups` parameter: `@Test(groups = {"smoke", "regression"})`. In `testng.xml`, define `<groups><run><include name="smoke"/></run></groups>`. Alternatively, run directly from the command line using Maven Surefire: `mvn clean test -Dgroups=smoke`. Maven and TestNG will scan the project and execute only methods carrying the "smoke" tag.',
        interviewerEvaluationPoints: [
          'Shows `@Test(groups = {...})` syntax',
          'Explains XML `<include name="..."/>` configuration',
          'Demonstrates Maven CLI execution via `-Dgroups=smoke`',
        ],
      },
    ],
    quiz: [
      {
        id: 'q-9-1',
        question: 'Which TestNG annotation runs before EACH individual test method in a test class?',
        options: [
          '@BeforeClass',
          '@BeforeMethod',
          '@BeforeSuite',
          '@BeforeTest',
        ],
        correctAnswerIndex: 1,
        explanation:
          '@BeforeMethod runs immediately prior to each individual @Test method, making it ideal for driver initialization.',
      },
      {
        id: 'q-9-2',
        question: 'Why should `@AfterMethod(alwaysRun = true)` be configured in mobile test suites?',
        options: [
          'It makes the test run twice as fast',
          'It ensures driver.quit() executes even if assertions fail, preventing hung device sessions',
          'It reboots the Android phone after every test',
          'It is required by Java 17 syntax rules',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Setting `alwaysRun = true` guarantees cleanup runs even when tests fail with assertion errors.',
      },
      {
        id: 'q-9-3',
        question: 'Which capability must be unique per thread when executing parallel Appium tests across multiple Android devices?',
        options: [
          'systemPort (and udid)',
          'platformName',
          'automationName',
          'noReset',
        ],
        correctAnswerIndex: 0,
        explanation:
          'Each device session requires a unique `systemPort` (e.g. 8200, 8201) to forward ADB traffic without collisions.',
      },
      {
        id: 'q-9-4',
        question: 'What happens to a test method configured with `dependsOnMethods = {"testLogin"}` if `testLogin` fails?',
        options: [
          'It runs anyway with simulated data',
          'TestNG marks it as SKIPPED without attempting execution',
          'It throws a NullPointerException',
          'It deletes the app from the phone',
        ],
        correctAnswerIndex: 1,
        explanation:
          'When a prerequisite method fails, TestNG automatically skips all dependent test methods.',
      },
      {
        id: 'q-9-5',
        question: 'Which Maven CLI command executes only the tests belonging to the "smoke" group?',
        options: [
          'mvn clean test -Dgroups=smoke',
          'mvn run --smoke-only',
          'mvn execute smoke',
          'mvn appium:smoke',
        ],
        correctAnswerIndex: 0,
        explanation:
          '`mvn clean test -Dgroups=smoke` directs the Maven Surefire plugin to run only tests tagged with the "smoke" group.',
      },
    ],
  },

  // DAY 10
  {
    dayNumber: 10,
    slug: 'day-10',
    title: 'Page Object Model (POM) Design Pattern',
    subtitle: 'Enterprise Architecture: Decouple Locators, Actions & Assertions with Fluent POM',
    badge: 'Design Patterns',
    duration: '55 mins',
    objectives: [
      'Understand the Page Object Model (POM) architectural design pattern and its maintenance benefits',
      'Design modular Page Classes with private By locators and public action methods',
      'Implement a clean BasePage and BaseTest inheritance structure with AndroidDriver',
      'Apply the Fluent Page Object pattern with method chaining returning `this` or next page objects',
      'Refactor messy procedural mobile test scripts into elegant, maintainable POM classes',
    ],
    introduction:
      'In beginner automation, tests often contain locators, thread sleeps, clicks, and assertions mixed into one huge 200-line method. When developers change a single button ID, 40 different test files break and take hours to fix. The Page Object Model (POM) is the gold standard design pattern that separates application UI structure from test verification logic. Today you will build enterprise-grade Page Objects.',
    topics: [
      {
        title: '1. Principles of Page Object Model in Mobile Testing',
        summary: 'Separation of concerns: UI elements belong in Pages; assertions belong in Tests.',
        explanation:
          'POM treats each mobile screen as an independent Java class:\n\n' +
          '• Page Classes: Hold UI element locators (as private By objects) and user action methods (e.g. enterUsername(), clickLogin()). They NEVER contain TestNG Assert statements!\n\n' +
          '• Test Classes: Hold test scenarios, test data, and TestNG assertions. They interact exclusively through the public methods of Page Classes.\n\n' +
          'Benefits:\n' +
          '1. Zero Code Duplication: If a login button ID changes, you update ONE line in LoginPage.java, and all 50 login-dependent tests are instantly fixed.\n' +
          '2. Readability: Tests read like plain English specifications: loginPage.login("user", "pass"); productsPage.verifyTitle();',
        realWorldScenario:
          'A shopping app changed its "Add to Cart" button ID across 8 product categories. In a project without POM, 35 test files had to be manually edited. In a POM-architected framework, the change was completed in 10 seconds in ProductsPage.java.',
        commonMistakes: [
          'Placing TestNG Assert statements inside Page Object classes (pages represent UI state; tests verify expectations).',
          'Exposing raw By locators or WebElements as public variables instead of encapsulating them.',
        ],
        keyTakeaways: [
          'Keep locators private and expose user actions as public methods.',
          'Keep assertions in @Test methods, never in Page classes.',
        ],
      },
      {
        title: '2. Implementing BasePage & BaseTest Architecture',
        summary: 'Centralizing driver lifecycle, reusable explicit waits, and screenshot helpers.',
        explanation:
          'A clean POM framework uses two foundational base classes:\n\n' +
          '• BaseTest: Manages AndroidDriver lifecycle (@BeforeMethod, @AfterMethod), capability loading, and device teardown.\n\n' +
          '• BasePage: Serves as the parent class for all Page Objects. Accepts AndroidDriver in its constructor, initializes WebDriverWait, and provides safe reusable wrappers: click(), sendKeys(), getText(), and waitForVisibility().',
        codeSnippet: {
          language: 'java',
          filename: 'BasePage.java',
          code: `package com.rootaccess.pages;\n\nimport io.appium.java_client.android.AndroidDriver;\nimport org.openqa.selenium.By;\nimport org.openqa.selenium.WebElement;\nimport org.openqa.selenium.support.ui.ExpectedConditions;\nimport org.openqa.selenium.support.ui.WebDriverWait;\nimport java.time.Duration;\n\npublic abstract class BasePage {\n    protected AndroidDriver driver;\n    protected WebDriverWait wait;\n\n    public BasePage(AndroidDriver driver) {\n        this.driver = driver;\n        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));\n    }\n\n    protected void click(By locator) {\n        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();\n    }\n\n    protected void type(By locator, String text) {\n        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));\n        element.clear();\n        element.sendKeys(text);\n    }\n\n    protected String getText(By locator) {\n        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator)).getText();\n    }\n\n    protected boolean isDisplayed(By locator) {\n        try {\n            return wait.until(ExpectedConditions.visibilityOfElementLocated(locator)).isDisplayed();\n        } catch (Exception e) {\n            return false;\n        }\n    }\n}`,
          explanation: 'BasePage encapsulates explicit wait logic so child page classes never write boilerplate WebDriverWait code.',
        },
        realWorldScenario:
          'By routing all clicks through BasePage.click(By locator), the team easily added automatic logging and error screenshot capture to every single click across the entire app with zero code changes in tests.',
        commonMistakes: [
          'Passing null driver instances to child page constructors.',
          'Not extending BasePage, leading to repeated WebDriverWait declarations.',
        ],
        keyTakeaways: [
          'BasePage wraps driver and explicit waits.',
          'BaseTest manages driver initialization and teardown.',
        ],
      },
      {
        title: '3. Fluent Page Object Pattern with Method Chaining',
        summary: 'Writing elegant tests where action methods return page object instances.',
        explanation:
          'In the Fluent POM pattern, methods that navigate to a new screen return the next Page Object, while methods that stay on the same screen return `this`:\n\n' +
          '• public LoginPage enterUsername(String user) { type(userBy, user); return this; }\n' +
          '• public ProductsPage clickLogin() { click(loginBtn); return new ProductsPage(driver); }\n\n' +
          'This enables clean method chaining in test scripts:\n' +
          'new LoginPage(driver)\n' +
          '    .enterUsername("standard_user")\n' +
          '    .enterPassword("secret_sauce")\n' +
          '    .clickLogin()\n' +
          '    .addProductToCart("Sauce Labs Backpack")\n' +
          '    .openCart();',
        codeSnippet: {
          language: 'java',
          filename: 'FluentLoginPage.java',
          code: `public class LoginPage extends BasePage {\n    private final By usernameInput = AppiumBy.accessibilityId("test-Username");\n    private final By passwordInput = AppiumBy.accessibilityId("test-Password");\n    private final By loginButton = AppiumBy.accessibilityId("test-LOGIN");\n    private final By errorMessage = AppiumBy.xpath("//android.view.ViewGroup[@content-desc='test-Error message']//android.widget.TextView");\n\n    public LoginPage(AndroidDriver driver) {\n        super(driver);\n    }\n\n    public LoginPage enterUsername(String user) {\n        type(usernameInput, user);\n        return this;\n    }\n\n    public LoginPage enterPassword(String pass) {\n        type(passwordInput, pass);\n        return this;\n    }\n\n    public ProductsPage clickLoginSuccess() {\n        if (driver.isKeyboardShown()) driver.hideKeyboard();\n        click(loginButton);\n        return new ProductsPage(driver);\n    }\n\n    public LoginPage clickLoginExpectingError() {\n        if (driver.isKeyboardShown()) driver.hideKeyboard();\n        click(loginButton);\n        return this;\n    }\n\n    public String getErrorText() {\n        return getText(errorMessage);\n    }\n}`,
          explanation: 'Returning `ProductsPage` upon valid login and `this` upon invalid login models the actual application navigation graph.',
        },
        realWorldScenario:
          'Product managers and manual testers can easily read fluent automated test cases because they read like an English specification of user steps.',
        commonMistakes: [
          'Returning a new Page Object before the transition animation completes, causing immediate element lookup failures.',
        ],
        keyTakeaways: [
          'Fluent methods return `this` for same-page actions and `new NextPage(driver)` for navigation.',
          'Makes tests concise, readable, and self-documenting.',
        ],
      },
    ],
    lab: {
      id: 'lab-day-10',
      labType: 'pom_builder',
      title: 'Mobile Page Object Model Architecture Builder',
      subtitle: 'Construct modular Page Classes (LoginPage, ProductsPage, CartPage) and assemble a fluent TestNG test.',
      instructions: [
        'Review the target mobile flow: Login -> Browse Catalog -> Add to Cart -> Verify Cart.',
        'Organize private By locators inside their respective Page Classes.',
        'Implement fluent action methods with proper return types (`this` vs next page).',
        'Compose the final TestNG test method and verify 100% decoupling between pages and tests.',
      ],
      initialState: {
        pages: ['LoginPage', 'ProductsPage', 'CartPage'],
        composedTestSteps: [],
      },
      solutionChecklist: [
        'Encapsulate locators as private static final By constants',
        'Implement constructor passing AndroidDriver to BasePage superclass',
        'Return next Page Object on navigation actions',
        'Verify test class contains zero raw findElement calls',
      ],
      hints: [
        'Pages hold actions and locators; tests hold assertions.',
        'Use `return new ProductsPage(driver)` when a click navigates to the products screen.',
      ],
    },
    challenge: {
      id: 'challenge-day-10',
      title: 'Design CartPage with Item Removal and Quantity Assertion',
      scenario:
        'You need to add a `CartPage.java` class to the framework that supports getting the count of items in the cart, removing an item by name, and navigating to Checkout.',
      task:
        'Write the complete `CartPage.java` class extending `BasePage` with private locators and public methods: `getItemCount()`, `removeItem(String itemName)`, and `proceedToCheckout()`.',
      verificationCriteria: [
        'Extends BasePage and calls super(driver)',
        'Defines private By locators',
        'Implements `removeItem` using parameterized locator or UiSelector',
        'Returns `new CheckoutPage(driver)` from `proceedToCheckout`',
      ],
      hints: [
        'Pass item name into dynamic XPath or UiSelector: AppiumBy.xpath("//android.widget.TextView[@text=\'" + name + "\']")',
      ],
    },
    interviewQuestions: [
      {
        id: 'iq-10-1',
        category: 'TestNG & POM',
        question: 'What is the Page Object Model (POM) and why is it considered an essential best practice in mobile automation?',
        idealAnswer:
          'The Page Object Model (POM) is an architectural design pattern that creates an object repository for web/mobile UI elements. Each application screen is represented by a corresponding Page Class containing: 1) Private locators representing elements on that screen; 2) Public methods representing actions the user can perform. Tests interact exclusively with Page Object methods and contain the verification assertions. POM is essential because: 1) It reduces code duplication; 2) If UI locators change, you update one single class instead of dozens of test files; 3) Tests become readable, self-documenting, and easy to maintain.',
        interviewerEvaluationPoints: [
          'Defines POM as design pattern separating UI locators from test logic',
          'Highlights maintenance advantage when UI changes occur',
          'Explains encapsulation (private locators, public actions)',
        ],
      },
      {
        id: 'iq-10-2',
        category: 'TestNG & POM',
        question: 'Why should you NOT put TestNG assertions inside Page Object classes?',
        idealAnswer:
          'Page Objects should represent the state and behavior of the application under test, not the test verification rules. Putting assertions in Page Objects creates two major problems: 1) It couples the Page Object to a specific test framework (e.g. TestNG), preventing reuse with JUnit or Cucumber; 2) It prevents reusability for negative test flows (e.g. if `login()` asserts successful redirection to the dashboard, you cannot reuse that method to test invalid passwords or locked-out users). Assertions belong strictly in `@Test` methods.',
        interviewerEvaluationPoints: [
          'Explains separation of application behavior vs test validation',
          'Points out inability to reuse pages for negative test cases',
          'Advocates for clean architectural boundaries',
        ],
      },
      {
        id: 'iq-10-3',
        category: 'TestNG & POM',
        question: 'What is the Fluent Page Object pattern and what are its advantages?',
        idealAnswer:
          'The Fluent Page Object pattern is an extension of POM where action methods return either the current page object (`return this;`) or the next page object representing the newly loaded screen (`return new ProductsPage(driver);`). This enables method chaining: `loginPage.enterUser("admin").enterPass("pass").clickLogin().selectProduct("Shoes");`. Advantages: 1) Tests read like natural English workflows; 2) It models the application’s state transition graph at compile time, preventing invalid sequences (e.g. you cannot call `checkout()` from `LoginPage`).',
        interviewerEvaluationPoints: [
          'Explains method chaining and return types (`this` vs next page)',
          'Highlights readability and self-documenting code',
          'Mentions compile-time enforcement of application navigation graph',
        ],
      },
      {
        id: 'iq-10-4',
        category: 'TestNG & POM',
        question: 'Why has PageFactory (@FindBy) fallen out of favor in modern Appium Java Client 9.x compared to standard `By` locators?',
        idealAnswer:
          'In older Selenium versions, `PageFactory.initElements(driver, this)` was popular using `@FindBy`. However, in modern Appium and Selenium 4: 1) PageFactory relies on lazy proxy evaluation that frequently causes `StaleElementReferenceException` on dynamic mobile screens; 2) It complicates the integration of modern explicit `WebDriverWait` conditions; 3) The Appium team officially deprecated several PageFactory classes in favor of explicit `By` / `AppiumBy` locators paired with explicit waits in `BasePage` methods, which offer superior stability, speed, and thread safety.',
        interviewerEvaluationPoints: [
          'Mentions proxy evaluation issues and StaleElement exceptions',
          'Explains incompatibility with dynamic explicit waits',
          'Identifies modern standard: private `By` locators with explicit wait wrappers',
        ],
      },
      {
        id: 'iq-10-5',
        category: 'Framework Architecture',
        question: 'How do you design a `BasePage` class to make child page classes concise and maintainable?',
        idealAnswer:
          'A production `BasePage` class: 1) Is declared `abstract` to prevent direct instantiation; 2) Accepts `AndroidDriver` in its constructor and initializes a centralized `WebDriverWait`; 3) Exposes protected helper methods: `click(By)`, `type(By, String)`, `getText(By)`, `isDisplayed(By)`, and `waitForInvisibility(By)` that wrap element lookups with explicit `ExpectedConditions`; 4) Handles common mobile exceptions (like StaleElementReferenceException retries) in one single place.',
        interviewerEvaluationPoints: [
          'Declares abstract with protected driver and wait instances',
          'Wraps common actions with explicit ExpectedConditions',
          'Centralizes exception handling and retries',
        ],
      },
    ],
    quiz: [
      {
        id: 'q-10-1',
        question: 'What is the primary architectural responsibility of a Page Object class?',
        options: [
          'To run database migrations on the backend',
          'To encapsulate UI element locators and user actions for a specific screen',
          'To generate JUnit XML test reports',
          'To reboot the mobile emulator between steps',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Page Objects represent the UI layout and available user actions for a specific application screen.',
      },
      {
        id: 'q-10-2',
        question: 'Where should TestNG `Assert` statements be placed in a clean POM framework?',
        options: [
          'Inside the BasePage class',
          'Inside Page Object action methods',
          'Inside `@Test` methods in Test classes',
          'Inside the pom.xml file',
        ],
        correctAnswerIndex: 2,
        explanation:
          'Assertions belong exclusively in test classes, keeping Page Objects reusable across both positive and negative scenarios.',
      },
      {
        id: 'q-10-3',
        question: 'In the Fluent Page Object pattern, what does a method that navigates to a new screen return?',
        options: [
          'void',
          'A boolean indicating success',
          'A new instance of the next Page Object class (e.g. `new ProductsPage(driver)`)',
          'The raw HTML string of the screen',
        ],
        correctAnswerIndex: 2,
        explanation:
          'Returning an instance of the destination Page Object enables fluent method chaining.',
      },
      {
        id: 'q-10-4',
        question: 'Why are `By` locators kept `private` inside Page Object classes?',
        options: [
          'Java forbids public variables in all classes',
          'Encapsulation: external tests should not directly manipulate raw locators or WebElements',
          'Appium requires all variables to be private',
          'To prevent the APK from decompiling',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Encapsulation ensures that if an element locator changes, only the Page Object class needs modification.',
      },
      {
        id: 'q-10-5',
        question: 'Which base class typically manages the AndroidDriver lifecycle (@BeforeMethod and @AfterMethod)?',
        options: [
          'BasePage',
          'BaseTest',
          'TestNGRunner',
          'AndroidActivity',
        ],
        correctAnswerIndex: 1,
        explanation:
          'BaseTest manages test lifecycle, driver creation, and session teardown, while BasePage manages UI interactions.',
      },
    ],
  },

  // DAY 11
  {
    dayNumber: 11,
    slug: 'day-11',
    title: 'Data-Driven Mobile Automation',
    subtitle: 'TestNG @DataProvider, Parameterized Test Suites & External Config Management',
    badge: 'Data-Driven Testing',
    duration: '50 mins',
    objectives: [
      'Understand the architecture of Data-Driven Testing (DDT) in mobile automation',
      'Implement TestNG @DataProvider returning 2D Object arrays (Object[][])',
      'Drive positive and negative authentication test cases with dynamic credential datasets',
      'Externalize environment configurations (device name, app path, timeouts) using config.properties',
      'Separate sensitive test credentials from source code',
    ],
    introduction:
      'Hardcoding usernames, passwords, and test data directly inside test methods is a major security risk and maintenance nightmare. What if you need to test login validation across 10 different user roles (standard, locked out, problem user, performance glitch user, visual user)? Copy-pasting the same test 10 times violates DRY principles. Today you will master Data-Driven Testing using TestNG @DataProvider and Java properties.',
    topics: [
      {
        title: '1. The TestNG @DataProvider Mechanism',
        summary: 'How @DataProvider feeds parameterized datasets to @Test methods.',
        explanation:
          'A TestNG `@DataProvider` method returns a two-dimensional array of objects (`Object[][]`) or an `Iterator<Object[]>`:\n\n' +
          '• Each row in the outer array represents an independent test execution run.\n' +
          '• Each column in the inner array maps to an input parameter of the `@Test` method.\n\n' +
          'If a DataProvider returns 4 rows, TestNG automatically executes the `@Test` method 4 times, initializing and tearing down the driver session freshly for each row!',
        codeSnippet: {
          language: 'java',
          filename: 'DataProviderDemo.java',
          code: `import org.testng.Assert;\nimport org.testng.annotations.DataProvider;\nimport org.testng.annotations.Test;\n\npublic class LoginDataDrivenTest extends BaseTest {\n\n    @DataProvider(name = "loginCredentials")\n    public Object[][] getLoginData() {\n        return new Object[][] {\n            {"standard_user", "secret_sauce", true, ""},\n            {"locked_out_user", "secret_sauce", false, "Sorry, this user has been locked out."},\n            {"invalid_user", "wrong_pass", false, "Username and password do not match"},\n            {"", "secret_sauce", false, "Username is required"}\n        };\n    }\n\n    @Test(dataProvider = "loginCredentials", groups = {"regression"})\n    public void testLoginValidation(String user, String pass, boolean shouldSucceed, String expectedError) {\n        LoginPage loginPage = new LoginPage(driver);\n        loginPage.enterUsername(user).enterPassword(pass);\n\n        if (shouldSucceed) {\n            ProductsPage productsPage = loginPage.clickLoginSuccess();\n            Assert.assertTrue(productsPage.isLoaded(), "Products catalog should display");\n        } else {\n            loginPage.clickLoginExpectingError();\n            Assert.assertEquals(loginPage.getErrorText(), expectedError);\n        }\n    }\n}`,
          explanation: 'A single test method validates 4 diverse login scenarios with zero duplicate test logic.',
        },
        realWorldScenario:
          'Testing an international e-commerce app requiring credit card checkout validation across 12 countries with different postal code formats and currency symbols using a single parameterized test.',
        commonMistakes: [
          'Mismatch between the number of columns in `Object[][]` and the parameters in `@Test` method (throws `TestNGException: Method requires X parameters but 0 were supplied`).',
          'Not providing a unique name attribute to `@DataProvider`.',
        ],
        keyTakeaways: [
          '@DataProvider allows running the same test logic with multiple inputs.',
          'Each row represents an isolated, independent test execution.',
        ],
      },
      {
        title: '2. External Configuration Management (config.properties)',
        summary: 'Decoupling environment settings from compiled Java code.',
        explanation:
          'Capabilities like device name, Appium server URL, and app paths should never be hardcoded in Java classes. Use a `config.properties` file loaded by a `ConfigReader` utility:\n\n' +
          '```properties\n' +
          '# src/test/resources/config.properties\n' +
          'appium.server.url=http://127.0.0.1:4723\n' +
          'platform.name=Android\n' +
          'automation.name=UiAutomator2\n' +
          'device.name=emulator-5554\n' +
          'app.package=com.swaglabsmobileapp\n' +
          'app.activity=.MainActivity\n' +
          'explicit.timeout=10\n' +
          '```',
        codeSnippet: {
          language: 'java',
          filename: 'ConfigReader.java',
          code: `import java.io.InputStream;\nimport java.util.Properties;\n\npublic class ConfigReader {\n    private static Properties properties = new Properties();\n\n    static {\n        try (InputStream input = ConfigReader.class.getClassLoader()\n                .getResourceAsStream("config.properties")) {\n            if (input == null) {\n                throw new RuntimeException("config.properties not found in classpath!");\n            }\n            properties.load(input);\n        } catch (Exception e) {\n            throw new RuntimeException("Failed to load config.properties: " + e.getMessage());\n        }\n    }\n\n    public static String getProperty(String key) {\n        // Allow command line override: -Ddevice.name=Pixel_7\n        return System.getProperty(key, properties.getProperty(key));\n    }\n}`,
          explanation: 'Using `System.getProperty(key, fallback)` enables overriding settings dynamically via Maven CLI arguments in CI/CD.',
        },
        realWorldScenario:
          'When running tests on Jenkins, you pass `mvn test -Ddevice.name=Galaxy_S23` to override the local emulator setting without changing a single line of committed code.',
        commonMistakes: [
          'Committing production passwords or secret API keys into public git repositories.',
          'Failing to close file input streams when reading properties.',
        ],
        keyTakeaways: [
          'Externalize environment variables into properties files.',
          'Support System.getProperty overrides for seamless CI/CD execution.',
        ],
      },
      {
        title: '3. Reading External Test Data (JSON & Excel Files)',
        summary: 'Feeding complex nested test data from external files into TestNG.',
        explanation:
          'For complex business flows (like an order checkout with multiple items, shipping addresses, and credit cards), 2D arrays in Java become cumbersome. In enterprise frameworks, test data is stored in JSON or Excel files:\n\n' +
          '• Jackson ObjectMapper / Gson: Deserializes JSON test fixtures into Java POJOs (Plain Old Java Objects).\n\n' +
          '• Apache POI: Reads data from Excel (.xlsx) spreadsheets, allowing manual QA and business analysts to update test datasets directly.',
        realWorldScenario:
          'A QA team maintains 100 test user accounts in a `testdata.json` file. The test automation parses the file and executes a regression run against each user role automatically.',
        commonMistakes: [
          'Parsing Excel files on every single test method instead of caching datasets in memory.',
        ],
        keyTakeaways: [
          'Use JSON/Excel for complex nested objects.',
          'Model test datasets as type-safe Java POJOs.',
        ],
      },
    ],
    lab: {
      id: 'lab-day-11',
      labType: 'data_matrix',
      title: 'Parameterized Test Data Matrix & DataProvider Studio',
      subtitle: 'Build a multi-scenario TestNG DataProvider and test a parameterized mobile form matrix.',
      instructions: [
        'Review the 4 test scenarios: Standard User, Locked User, Problem User, and Empty Password.',
        'Configure the `@DataProvider` method returning the 2D Object array.',
        'Map the data columns to the `@Test` method signature.',
        'Execute the data-driven run and verify that all 4 iterations execute with isolated assertions.',
      ],
      initialState: {
        testCases: [
          { user: 'standard_user', pass: 'secret_sauce', expectedResult: 'PASS' },
          { user: 'locked_out_user', pass: 'secret_sauce', expectedResult: 'FAIL_LOCKED' },
          { user: 'problem_user', pass: 'secret_sauce', expectedResult: 'PASS_GLITCH' },
          { user: '', pass: '', expectedResult: 'FAIL_EMPTY' },
        ],
      },
      solutionChecklist: [
        'Declare `@DataProvider(name = "authData")` returning `Object[][]`',
        'Supply matching parameters in `@Test(dataProvider = "authData")`',
        'Verify independent assertions for pass vs error scenarios',
        'Verify zero hardcoded credentials in test method body',
      ],
      hints: [
        'The number of arguments in `@Test` must exactly match the column count of `Object[][]`.',
      ],
    },
    challenge: {
      id: 'challenge-day-11',
      title: 'Build a Checkout Shipping Data Provider',
      scenario:
        'The checkout information form requires First Name, Last Name, and Postal Code. You must test 3 scenarios: valid shipping, missing postal code, and missing first name.',
      task:
        'Write a TestNG `@DataProvider` named `shippingData` and the corresponding `@Test` method validating the error message returned for incomplete address fields.',
      verificationCriteria: [
        'Creates DataProvider returning 3 datasets',
        'Tests valid checkout vs missing Postal Code error',
        'Asserts specific error banner text',
      ],
      hints: [
        'Error banner text on missing zip: "Error: Postal Code is required".',
      ],
    },
    interviewQuestions: [
      {
        id: 'iq-11-1',
        category: 'TestNG & POM',
        question: 'What is a TestNG `@DataProvider` and how does it work with `@Test` methods?',
        idealAnswer:
          'A TestNG `@DataProvider` is an annotation used to feed parameterized data into test methods for Data-Driven Testing. A method annotated with `@DataProvider(name = "xyz")` returns a 2D array of objects (`Object[][]`) or an `Iterator<Object[]>`. The `@Test` method specifies `dataProvider = "xyz"`. TestNG executes the test method once for each row in the array, automatically passing the row elements as arguments to the test method parameters. This separates test logic from test data and allows testing boundary values and edge cases without code duplication.',
        interviewerEvaluationPoints: [
          'Explains 2D Object array structure (rows=runs, cols=arguments)',
          'Explains `dataProvider` attribute on `@Test`',
          'Highlights benefits for Data-Driven Testing',
        ],
      },
      {
        id: 'iq-11-2',
        category: 'Framework Architecture',
        question: 'Why should environment configurations like device UDID and Appium URLs be externalized into a `config.properties` file?',
        idealAnswer:
          'Hardcoding configuration values inside Java source code is an anti-pattern because: 1) Changing a device name or server URL requires recompiling code; 2) It prevents running the same tests across different environments (local emulators, staging real devices, cloud device farms like BrowserStack) without modifying git branches; 3) Externalizing into `config.properties` paired with `System.getProperty("key", fallback)` enables dynamic overrides via CLI arguments in CI/CD pipelines (e.g. `mvn test -Ddevice.name=Pixel_7`).',
        interviewerEvaluationPoints: [
          'Highlights code recompilation and git pollution avoidance',
          'Explains multi-environment execution flexibility',
          'Mentions CLI parameter overrides in CI/CD',
        ],
      },
      {
        id: 'iq-11-3',
        category: 'TestNG & POM',
        question: 'What error occurs if your `@DataProvider` returns 3 columns but your `@Test` method signature only defines 2 parameters?',
        idealAnswer:
          'TestNG throws a `TestNGException` with a message stating: `The data provider is trying to pass 3 parameters but the method takes 2`. TestNG enforces strict type and parameter count matching between the DataProvider columns and the test method arguments at runtime.',
        interviewerEvaluationPoints: [
          'Identifies TestNGException',
          'Explains strict parameter count matching requirement',
          'Demonstrates hands-on debugging experience',
        ],
      },
      {
        id: 'iq-11-4',
        category: 'Framework Architecture',
        question: 'How do you handle sensitive credentials (like passwords and API keys) in mobile automation frameworks?',
        idealAnswer:
          'Sensitive credentials should NEVER be hardcoded in test classes or committed to source control in plain text. Best practices include: 1) Injecting credentials as environment variables or encrypted secrets in CI/CD (e.g. GitHub Secrets, Jenkins Credentials); 2) Reading them via `System.getenv("TEST_PASSWORD")`; 3) Storing local overrides in a `.env` or `credentials.properties` file that is strictly listed in `.gitignore`; 4) Masking passwords in test reports and console logs.',
        interviewerEvaluationPoints: [
          'Mentions `.gitignore` exclusion of credential files',
          'Explains environment variables and CI secret management',
          'Highlights log masking to prevent credential leaks',
        ],
      },
      {
        id: 'iq-11-5',
        category: 'TestNG & POM',
        question: 'Can a `@DataProvider` run test iterations in parallel in TestNG? If so, what precautions are needed on mobile?',
        idealAnswer:
          'Yes, by adding `parallel = true`: `@DataProvider(name = "data", parallel = true)`. TestNG will execute each data row on a separate thread concurrently. However, on mobile, running iterations in parallel requires extreme care: because each iteration touches the device, running in parallel against a single physical device or emulator will cause simultaneous conflicting taps and crashes. Parallel DataProviders should only be used if the framework dynamically provisions a separate emulator or cloud device instance per thread with unique `systemPort` configurations.',
        interviewerEvaluationPoints: [
          'Identifies `@DataProvider(parallel = true)` attribute',
          'Warns against running parallel tests on a single mobile device',
          'Reiterates device isolation and port requirements',
        ],
      },
    ],
    quiz: [
      {
        id: 'q-11-1',
        question: 'What data structure must a TestNG `@DataProvider` method return by default?',
        options: [
          'Object[][] (Two-dimensional Object array) or Iterator<Object[]>',
          'String[]',
          'int',
          'ArrayList<WebElement>',
        ],
        correctAnswerIndex: 0,
        explanation:
          'TestNG DataProviders return a 2D array of objects (`Object[][]`) or an `Iterator<Object[]>`.',
      },
      {
        id: 'q-11-2',
        question: 'How do you link a `@Test` method to a DataProvider named "userCredentials"?',
        options: [
          '@Test(dataProvider = "userCredentials")',
          '@Test(data = "userCredentials")',
          '@Test(source = "userCredentials")',
          '@Test(params = "userCredentials")',
        ],
        correctAnswerIndex: 0,
        explanation:
          'The attribute `dataProvider = "userCredentials"` links the test method to the designated DataProvider.',
      },
      {
        id: 'q-11-3',
        question: 'What is the primary benefit of using `System.getProperty("device.name", fallback)` in a ConfigReader class?',
        options: [
          'It reboots the phone if the name is wrong',
          'It allows overriding the default configuration via Maven CLI arguments (`-Ddevice.name=...`)',
          'It encrypts the device name',
          'It formats the phone screen',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Checking System properties first enables dynamic CLI argument overrides during automated CI/CD builds.',
      },
      {
        id: 'q-11-4',
        question: 'What happens if a DataProvider returns 5 rows of data for a test method?',
        options: [
          'The test method is executed 5 times, once for each dataset',
          'The test fails because 5 is too many',
          'Only the first row is executed',
          'Appium crashes',
        ],
        correctAnswerIndex: 0,
        explanation:
          'TestNG executes the test method once for each row in the DataProvider, providing independent reporting for each run.',
      },
      {
        id: 'q-11-5',
        question: 'Why should `credentials.properties` containing test passwords be added to `.gitignore`?',
        options: [
          'Git cannot store text files',
          'To prevent committing sensitive secrets and credentials to version control',
          'It makes git push 10x faster',
          'Properties files are not supported by Maven',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Excluding credential files from git protects confidential test account passwords and API keys from being leaked.',
      },
    ],
  },

  // DAY 12
  {
    dayNumber: 12,
    slug: 'day-12',
    title: 'Debugging, Screenshots & Test Reporting',
    subtitle: 'Appium Server Logs Analysis, Automatic Failure Screenshots & ExtentReports',
    badge: 'Diagnostics & Reporting',
    duration: '55 mins',
    objectives: [
      'Read and analyze raw Appium Server logs to diagnose failure root causes',
      'Differentiate between client network timeouts, locator syntax errors, and device crashes',
      'Implement automatic screenshot capture on test failure using TestNG ITestListener and TakesScreenshot',
      'Integrate modern HTML execution reports using ExtentReports',
      'Attach device screenshots and system metadata directly to test report cards',
    ],
    introduction:
      'When an automated test fails at 2:00 AM in a Jenkins CI pipeline, nobody is there to watch the phone screen. All you have is the build log, a stacktrace, and a screenshot. If your framework does not automatically capture screenshots on failure and produce readable HTML reports, developers will ignore the failure as "just flaky QA automation". Today you will master server log diagnostics, failure screenshot listeners, and rich HTML reporting.',
    topics: [
      {
        title: '1. Reading & Decoding Appium Server Logs',
        summary: 'How to decipher HTTP status codes, device session IDs, and log prefixes.',
        explanation:
          'Appium server logs detail every single W3C HTTP transaction between your Java test and the Android device. Here is how to decode them:\n\n' +
          '• `[HTTP] --> POST /session {"capabilities":{...}}`: Client requested a new session.\n' +
          '• `[Appium] Session created with session id: 7e2c9...`: Session established successfully.\n' +
          '• `[HTTP] --> POST /session/.../element {"using":"accessibility id","value":"test-LOGIN"}`: Element lookup requested.\n' +
          '• `[UiAutomator2] Found element with id ...`: Element found on device.\n' +
          '• `[HTTP] <-- POST /session/.../element 200 45 ms`: Successful element return (HTTP 200 in 45ms).\n\n' +
          '**Common Server Error Codes:**\n' +
          '• `HTTP 404 Not Found`: Element does not exist or URL path is wrong.\n' +
          '• `HTTP 500 Internal Error`: UiAutomator2 server crashed or device disconnected.\n' +
          '• `Original error: Could not proxy command`: Port forwarding broke or device died.',
        realWorldScenario:
          'A test fails with "SessionNotCreatedException". Reading the server log reveals: `ADB: device emulator-5554 offline`. The issue was not the Java code, but an emulator that froze during the build.',
        commonMistakes: [
          'Looking only at the Java stacktrace and ignoring the rich Appium server log output.',
          'Not noticing HTTP 404 element lookup errors in the server console.',
        ],
        keyTakeaways: [
          'Appium server logs reveal the exact HTTP exchange between client and device.',
          'Look for `[UiAutomator2]` and `[HTTP]` tags to trace command execution.',
        ],
      },
      {
        title: '2. Automatic Failure Screenshots with TestNG ITestListener',
        summary: 'Capturing and saving PNG screenshots whenever an assertion fails.',
        explanation:
          'Instead of cluttering test methods with screenshot code, use TestNG’s **`ITestListener`** interface. It intercepts test execution events in the background:\n\n' +
          '• `onTestStart(ITestResult result)`\n' +
          '• `onTestSuccess(ITestResult result)`\n' +
          '• `onTestFailure(ITestResult result)`: Invoked automatically when an assertion or error occurs!\n\n' +
          'Inside `onTestFailure`, cast the driver to `TakesScreenshot`, capture the image as bytes or file, and save it to `target/screenshots/<testName>_<timestamp>.png`.',
        codeSnippet: {
          language: 'java',
          filename: 'TestListener.java',
          code: `import org.openqa.selenium.OutputType;\nimport org.openqa.selenium.TakesScreenshot;\nimport org.testng.ITestListener;\nimport org.testng.ITestResult;\nimport java.io.File;\nimport java.nio.file.Files;\nimport java.nio.file.StandardCopyOption;\n\npublic class TestListener implements ITestListener {\n\n    @Override\n    public void onTestFailure(ITestResult result) {\n        Object testClass = result.getInstance();\n        AndroidDriver driver = ((BaseTest) testClass).getDriver();\n\n        if (driver != null) {\n            try {\n                File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);\n                String destPath = "target/screenshots/" + result.getName() + "_" + System.currentTimeMillis() + ".png";\n                File dest = new File(destPath);\n                dest.getParentFile().mkdirs();\n                Files.copy(src.toPath(), dest.toPath(), StandardCopyOption.REPLACE_EXISTING);\n                System.out.println("Saved failure screenshot to: " + destPath);\n            } catch (Exception e) {\n                System.err.println("Failed to capture screenshot: " + e.getMessage());\n            }\n        }\n    }\n}`,
          explanation: 'Registering this listener in testng.xml ensures every failure across the entire framework automatically saves a screenshot.',
        },
        realWorldScenario:
          'A night build had 3 test failures. By checking the captured screenshots in `target/screenshots/`, the team immediately saw that a surprise Google Play promotional overlay had popped up on the test device.',
        commonMistakes: [
          'Writing manual screenshot code inside every single `@Test` method.',
          'Forgetting to register the listener class in `testng.xml` (`<listeners><listener class-name="..."/></listeners>`).',
        ],
        keyTakeaways: [
          'ITestListener decouples screenshot capture from test business logic.',
          'Always timestamp screenshot filenames to prevent overwriting.',
        ],
      },
      {
        title: '3. Professional HTML Reporting with ExtentReports',
        summary: 'Generating executive test reports with embedded screenshots and system metrics.',
        explanation:
          'While default TestNG HTML reports are plain text tables, **ExtentReports** produces interactive, modern executive dashboards with pass/fail charts, execution timelines, step logs, and inline device screenshots:\n\n' +
          '1. Initialize `ExtentReports` and attach `ExtentSparkReporter("reports/ExtentReport.html")`.\n' +
          '2. In listener `onTestStart`: create `ExtentTest test = extent.createTest(result.getName());`.\n' +
          '3. In `onTestSuccess`: `test.pass("Test passed successfully");`.\n' +
          '4. In `onTestFailure`: `test.fail(result.getThrowable()).addScreenCaptureFromPath(screenshotPath);`.\n' +
          '5. In `onFinish`: `extent.flush();` (writes HTML file to disk).',
        realWorldScenario:
          'Engineering management receives an automated email after each nightly build containing a link to the ExtentReports dashboard showing 98% pass rate, execution trends, and screenshots of the 2 bugs found.',
        commonMistakes: [
          'Forgetting to call `extent.flush()` at the end of the suite, causing the report file to be empty!',
          'Not using ThreadLocal<ExtentTest> when running tests in parallel.',
        ],
        keyTakeaways: [
          'ExtentReports provides rich, visual dashboards for engineering stakeholders.',
          'Always call `extent.flush()` in `@AfterSuite` or `onFinish`.',
        ],
      },
    ],
    lab: {
      id: 'lab-day-12',
      labType: 'log_diagnoser',
      title: 'Mobile Test Failure & Log Diagnoser Studio',
      subtitle: 'Analyze raw Appium server logs, error stacktraces, and device screenshots to diagnose 3 real-world failures.',
      instructions: [
        'Inspect the raw Appium server log output and Java stacktrace for 3 simulated test failures.',
        'Diagnose the exact root cause: Device Offline, Element Not Found (XPath typo), or Soft Keyboard Occlusion.',
        'Select the appropriate fix for each failure.',
        'Generate an ExtentReport verification card with the embedded screenshot.',
      ],
      initialState: {
        failures: [
          {
            id: 'fail-1',
            testName: 'testCheckoutButton()',
            logSnippet: '[HTTP] <-- POST /session/.../click 400 [UiAutomator2] Element is not clickable at point (540, 1920) because keyboard is covering it',
            diagnosedCause: '',
          },
          {
            id: 'fail-2',
            testName: 'testLaunchApp()',
            logSnippet: '[ADB] Error: Device emulator-5554 is offline. Could not connect to ADB port 5037',
            diagnosedCause: '',
          },
          {
            id: 'fail-3',
            testName: 'testProductPrice()',
            logSnippet: 'org.openqa.selenium.NoSuchElementException: An element could not be located on the page using given search parameters: By.xpath: //android.widget.TextView[@text=\'Sauce Labs Backpack\']',
            diagnosedCause: '',
          },
        ],
      },
      solutionChecklist: [
        'Diagnose fail-1 as Soft Keyboard Occlusion -> Fix: call driver.hideKeyboard()',
        'Diagnose fail-2 as ADB Device Offline -> Fix: restart ADB and relaunch emulator',
        'Diagnose fail-3 as Element Off-Screen -> Fix: scroll using UiScrollable before locating',
        'Verify ExtentReport attaches screenshots on failure',
      ],
      hints: [
        'When element is not clickable at point, check if the soft keyboard is covering it.',
        'When an element is off-screen, a standard findElement fails; use UiScrollable to scroll it into view.',
      ],
    },
    challenge: {
      id: 'challenge-day-12',
      title: 'Implement ExtentReports TestNG Listener Class',
      scenario:
        'Your management wants an automated HTML report generated in `target/reports/index.html` with pass/fail counts and failure screenshots attached.',
      task:
        'Write the complete `ExtentReportListener.java` class implementing `ITestListener` with methods `onStart`, `onTestStart`, `onTestSuccess`, `onTestFailure`, and `onFinish` (calling `extent.flush()`).',
      verificationCriteria: [
        'Implements ITestListener',
        'Creates ExtentSparkReporter and ExtentReports in onStart',
        'Attaches screenshot path in onTestFailure',
        'Calls extent.flush() in onFinish',
      ],
      hints: [
        'Remember to call `extent.flush()` in `onFinish(ITestContext context)`.',
      ],
    },
    interviewQuestions: [
      {
        id: 'iq-12-1',
        category: 'Troubleshooting',
        question: 'How do you distinguish between an Appium Server issue, an ADB issue, and an Application Under Test (AUT) crash when diagnosing a failure?',
        idealAnswer:
          'By inspecting error layers systematically: 1) **ADB Issue:** If `adb devices` shows offline, unauthorized, or connection refused on port 5037, the host cannot communicate with the Android OS. The Appium log will show `ADB: device offline`; 2) **Appium Server Issue:** If the Appium server returns HTTP 500 or crashes with `ECONNREFUSED` on port 4723, or UiAutomator2 port 8200 fails to bind, the automation bridge is broken; 3) **Application Crash (AUT):** If the app crashes (due to a NullPointerException or ANR), the Appium log will show `Application died` or `UiAutomator2: Instrumentation process stopped`. You can verify this by checking `adb logcat -d | grep FATAL` for the Android app crash stacktrace.',
        interviewerEvaluationPoints: [
          'Separates issues into ADB, Appium Server, and Application crash layers',
          'Identifies key log indicators for each failure mode',
          'Mentions `adb logcat` for inspecting Android app fatal crashes',
        ],
      },
      {
        id: 'iq-12-2',
        category: 'Framework Architecture',
        question: 'How does TestNG’s `ITestListener` work and how do you use it to capture screenshots automatically on test failure?',
        idealAnswer:
          '`ITestListener` is an observer interface in TestNG that listens to test execution lifecycle events (`onTestStart`, `onTestSuccess`, `onTestFailure`, `onTestSkipped`). To capture screenshots on failure: 1) Create a class implementing `ITestListener`; 2) In the `onTestFailure(ITestResult result)` method, retrieve the active `AndroidDriver` instance from the test class instance (`result.getInstance()`); 3) Cast the driver to `TakesScreenshot` and call `getScreenshotAs(OutputType.FILE)`; 4) Save the file to disk with a unique name containing the test name and timestamp; 5) Register the listener in `testng.xml` under `<listeners>`. This completely decouples screenshot logic from individual test methods.',
        interviewerEvaluationPoints: [
          'Explains ITestListener observer pattern',
          'Demonstrates retrieving driver from `result.getInstance()`',
          'Explains `TakesScreenshot` casting and file saving',
          'Mentions XML listener registration',
        ],
      },
      {
        id: 'iq-12-3',
        category: 'Troubleshooting',
        question: 'What does `org.openqa.selenium.WebDriverException: An unknown server-side error occurred while processing the command. Original error: Could not proxy command to the remote server` mean?',
        idealAnswer:
          'This error occurs when the Appium Server successfully received the W3C HTTP command from your Java test, but failed when trying to forward that command over ADB port 8200 to the `io.appium.uiautomator2.server` APK running on the Android device. Common root causes: 1) The Android device or emulator crashed or disconnected during the test; 2) The Android OS killed the UiAutomator2 instrumentation server due to low memory (OOM); 3) Port 8200 was blocked by a dangling session from a previous test that did not call `driver.quit()`.',
        interviewerEvaluationPoints: [
          'Explains failure in forwarding between Appium server and device server',
          'Identifies root causes (device crash, OOM, port collision)',
          'Suggests remediation (restart ADB, clean sessions with driver.quit())',
        ],
      },
      {
        id: 'iq-12-4',
        category: 'Framework Architecture',
        question: 'What is ExtentReports and why is it preferred over default TestNG HTML reports?',
        idealAnswer:
          'Default TestNG reports (`emailable-report.html`) are plain text tables that are difficult for business stakeholders and developers to navigate. **ExtentReports** (via `ExtentSparkReporter`) generates modern, rich, interactive HTML dashboards featuring: 1) High-level donut charts showing test pass/fail/skip percentages; 2) Categorized execution by test author, device, and functional groups (smoke, regression); 3) Step-by-step logs with timestamps and severity badges; 4) Embedded failure screenshots that can be expanded in modal lightboxes; 5) System telemetry (OS, Java version, device model).',
        interviewerEvaluationPoints: [
          'Highlights visual charts and executive dashboards',
          'Mentions embedded screenshot lightboxes and step logs',
          'Contrasts with plain default TestNG tables',
        ],
      },
      {
        id: 'iq-12-5',
        category: 'Troubleshooting',
        question: 'How do you capture Android system logs (logcat) during an Appium test session?',
        idealAnswer:
          'In Appium Java, you can capture logcat logs directly through the driver API without running external terminal commands:\n`LogEntries logs = driver.manage().logs().get("logcat");`\n`for (LogEntry entry : logs) { System.out.println(entry.getMessage()); }`\nAlternatively, in capabilities you can configure `options.setAppiumOption("saveDeviceLogs", true)`. This allows logging Android crashes and network errors directly into your test execution reports when a test fails.',
        interviewerEvaluationPoints: [
          'Demonstrates `driver.manage().logs().get("logcat")` API',
          'Mentions saving logs for crash analysis',
          'Shows deep knowledge of mobile diagnostic APIs',
        ],
      },
    ],
    quiz: [
      {
        id: 'q-12-1',
        question: 'Which TestNG listener interface method is automatically executed whenever an assertion fails in a test?',
        options: [
          'onTestFailure(ITestResult result)',
          'onAssertionCrash()',
          'onTestErrorOccurred()',
          'onExceptionThrown()',
        ],
        correctAnswerIndex: 0,
        explanation:
          '`onTestFailure(ITestResult result)` is the standard callback in `ITestListener` invoked on assertion failure or unhandled exceptions.',
      },
      {
        id: 'q-12-2',
        question: 'Which Selenium/Appium interface is used to capture a screenshot from the active driver session?',
        options: [
          'TakesScreenshot',
          'ScreenCapturer',
          'ImageGrabber',
          'DeviceCamera',
        ],
        correctAnswerIndex: 0,
        explanation:
          'The driver is cast to `TakesScreenshot` and invokes `getScreenshotAs(OutputType.FILE)` or `OutputType.BYTES`.',
      },
      {
        id: 'q-12-3',
        question: 'What method must always be called at the end of test execution to write the ExtentReports HTML file to disk?',
        options: [
          'extent.flush()',
          'extent.save()',
          'extent.close()',
          'extent.writeHTML()',
        ],
        correctAnswerIndex: 0,
        explanation:
          '`extent.flush()` flushes the in-memory report buffer and writes the finalized HTML report to disk.',
      },
      {
        id: 'q-12-4',
        question: 'What does an HTTP 500 error in the Appium Server log typically indicate?',
        options: [
          'The Java test file has a syntax error',
          'An internal error occurred on the Appium server or the on-device UiAutomator2 server crashed',
          'The user forgot to pay their phone bill',
          'The Android device has dark mode enabled',
        ],
        correctAnswerIndex: 1,
        explanation:
          'HTTP 500 indicates an internal server-side error, often caused by the UiAutomator2 server crashing on the device or port disconnection.',
      },
      {
        id: 'q-12-5',
        question: 'Where is a TestNG listener registered in the `testng.xml` suite file?',
        options: [
          'Under the `<listeners>` tag inside `<suite>`',
          'Inside the `<dependency>` tag in pom.xml',
          'In the AndroidManifest.xml',
          'In the build.gradle file',
        ],
        correctAnswerIndex: 0,
        explanation:
          'Listeners are registered in `testng.xml` using `<listeners><listener class-name="com.package.ListenerName"/></listeners>`.',
      },
    ],
  },

  // DAY 13
  {
    dayNumber: 13,
    slug: 'day-13',
    title: 'Framework Integration, CI/CD & Reliability',
    subtitle: 'DriverFactory, ThreadLocal Driver, Maven Surefire CLI & CI/CD Pipeline Execution',
    badge: 'Framework Architecture',
    duration: '60 mins',
    objectives: [
      'Architect a production-ready mobile automation framework structure',
      'Implement DriverFactory with ThreadLocal<AndroidDriver> for thread-safe parallel execution',
      'Configure Maven Surefire plugin for CLI test execution and parameter injection',
      'Design a CI/CD workflow (GitHub Actions) with headless Android emulator execution',
      'Understand cloud mobile testing platforms (BrowserStack, SauceLabs, AWS Device Farm)',
    ],
    introduction:
      'Writing individual scripts is what junior testers do; architecting an extensible, maintainable, thread-safe test automation framework that integrates seamlessly with CI/CD pipelines is what senior automation engineers deliver. Today you will assemble all the components we have learned into a cohesive framework: DriverFactory with ThreadLocal, Maven build automation, and GitHub Actions CI pipeline configuration.',
    topics: [
      {
        title: '1. Production Framework Architecture & Directory Structure',
        summary: 'Standard industry Maven project layout for mobile test automation.',
        explanation:
          'A production-grade Appium framework follows a clean Maven directory layout:\n\n' +
          'rootaccess-mobile-framework/\n' +
          '├── pom.xml\n' +
          '├── testng.xml\n' +
          '├── src/\n' +
          '│   ├── main/java/com/rootaccess/\n' +
          '│   │   ├── driver/\n' +
          '│   │   │   └── DriverFactory.java (ThreadLocal driver management)\n' +
          '│   │   ├── utils/\n' +
          '│   │   │   ├── ConfigReader.java (Properties loader)\n' +
          '│   │   │   ├── GestureUtils.java (W3C Actions helpers)\n' +
          '│   │   │   └── ScreenshotUtils.java\n' +
          '│   │   └── pages/\n' +
          '│   │       ├── BasePage.java\n' +
          '│   │       ├── LoginPage.java\n' +
          '│   │       ├── ProductsPage.java\n' +
          '│   │       └── CartPage.java\n' +
          '│   └── test/\n' +
          '│       ├── java/com/rootaccess/\n' +
          '│       │   ├── base/\n' +
          '│       │   └── BaseTest.java (Lifecycle & Listeners)\n' +
          '│       │   ├── listeners/\n' +
          '│       │   └── ExtentReportListener.java\n' +
          '│       │   └── tests/\n' +
          '│       │       ├── LoginTest.java\n' +
          '│       │       └── ShoppingE2ETest.java\n' +
          '│       └── resources/\n' +
          '│           ├── config.properties\n' +
          '│           └── apps/SauceLabsApp.apk\n',
        realWorldScenario:
          'When onboarding a new engineer, a standard Maven project structure allows them to locate pages, utilities, and test suites immediately without asking for guidance.',
        commonMistakes: [
          'Mixing test classes into `src/main/java`.',
          'Hardcoding file paths with Windows backslashes (`C:\\`) instead of cross-platform relative paths.',
        ],
        keyTakeaways: [
          'Keep framework utilities and pages in `src/main/java`; keep tests in `src/test/java`.',
          'Use classpath-relative resource loading for APKs and config files.',
        ],
      },
      {
        title: '2. ThreadLocal<AndroidDriver> in DriverFactory',
        summary: 'Thread safety: why static drivers fail in parallel execution and how ThreadLocal fixes it.',
        explanation:
          'If you declare `public static AndroidDriver driver;`, all threads share the EXACT same driver reference. In parallel execution, Thread 2 overrides Thread 1’s driver, causing both tests to crash with race conditions!\n\n' +
          '**`ThreadLocal<AndroidDriver>`** solves this by providing an independent, isolated variable copy for every thread:',
        codeSnippet: {
          language: 'java',
          filename: 'DriverFactory.java',
          code: `package com.rootaccess.driver;\n\nimport io.appium.java_client.android.AndroidDriver;\nimport io.appium.java_client.android.options.UiAutomator2Options;\nimport java.net.URI;\nimport java.time.Duration;\n\npublic class DriverFactory {\n    // ThreadLocal ensures each thread has its own isolated AndroidDriver instance\n    private static final ThreadLocal<AndroidDriver> driverThreadLocal = new ThreadLocal<>();\n\n    public static void initDriver(String deviceName, String udid, int systemPort) {\n        try {\n            UiAutomator2Options options = new UiAutomator2Options()\n                .setPlatformName("Android")\n                .setAutomationName("UiAutomator2")\n                .setDeviceName(deviceName)\n                .setUdid(udid)\n                .setSystemPort(systemPort)\n                .setAppPackage("com.swaglabsmobileapp")\n                .setAppActivity(".MainActivity")\n                .setNoReset(true);\n\n            AndroidDriver driver = new AndroidDriver(\n                URI.create("http://127.0.0.1:4723").toURL(),\n                options\n            );\n            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));\n            driverThreadLocal.set(driver);\n        } catch (Exception e) {\n            throw new RuntimeException("Driver init failed: " + e.getMessage());\n        }\n    }\n\n    public static AndroidDriver getDriver() {\n        return driverThreadLocal.get();\n    }\n\n    public static void quitDriver() {\n        if (driverThreadLocal.get() != null) {\n            driverThreadLocal.get().quit();\n            driverThreadLocal.remove(); // Crucial to prevent thread pool memory leaks\n        }\n    }\n}`,
          explanation: 'DriverFactory encapsulates driver creation, retrieval, and teardown with 100% thread safety.',
        },
        realWorldScenario:
          'Running smoke tests across 3 emulators concurrently reduced pipeline execution time from 24 minutes to 8 minutes once DriverFactory was implemented with ThreadLocal.',
        commonMistakes: [
          'Using a single static `AndroidDriver driver` in parallel runs.',
          'Forgetting to call `driverThreadLocal.remove()` in `quitDriver()`, which causes memory leaks in thread pools.',
        ],
        keyTakeaways: [
          'Always use `ThreadLocal<AndroidDriver>` for parallel thread safety.',
          'Always invoke `driverThreadLocal.remove()` on session teardown.',
        ],
      },
      {
        title: '3. CI/CD Integration with GitHub Actions & Cloud Device Farms',
        summary: 'Running mobile tests in CI pipelines and scaling to cloud devices.',
        explanation:
          'Running mobile tests in CI/CD requires coordinating the environment:\n\n' +
          '1. **Local/Self-Hosted Runner with Headless Emulator:**\n' +
          '   • Install Java, Node, and Android SDK.\n' +
          '   • Launch emulator with `-no-window -no-audio -gpu swiftshader_indirect`.\n' +
          '   • Start Appium in background: `appium &`.\n' +
          '   • Run Maven: `mvn clean test -DsuiteXmlFile=testng.xml`.\n\n' +
          '2. **Cloud Mobile Device Farms (BrowserStack / SauceLabs / AWS Device Farm):**\n' +
          '   • Instead of managing physical hardware or heavy CI emulators, point your Appium URL to cloud hubs: `https://user:key@hub-cloud.browserstack.com/wd/hub`.\n' +
          '   • Upload your APK to the cloud storage API, set `app: "bs://<app-id>"`, and run tests on 50 real Android devices simultaneously!',
        codeSnippet: {
          language: 'yaml',
          filename: '.github/workflows/mobile-tests.yml',
          code: `name: Mobile Automation Regression\non: [push, pull_request]\n\njobs:\n  android-test:\n    runs-on: macos-13 # macOS runners support hardware virtualization for Android emulators\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Set up JDK 17\n        uses: actions/setup-java@v4\n        with:\n          java-version: '17'\n          distribution: 'temurin'\n\n      - name: Install Node.js & Appium 2.x\n        run: |\n          npm install -g appium\n          appium driver install uiautomator2\n          appium &\n\n      - name: Run Appium Tests via Maven\n        run: mvn clean test -DsuiteXmlFile=testng.xml\n\n      - name: Upload Test Report & Screenshots\n        if: always()\n        uses: actions/upload-artifact@v4\n        with:\n          name: test-reports\n          path: target/surefire-reports/`,
          explanation: 'This GitHub Actions workflow automatically checks out code, starts Appium, launches tests, and archives failure reports on every commit.',
        },
        realWorldScenario:
          'Before deploying a new mobile release to Google Play, the GitHub Actions pipeline runs 80 automated regression tests against real devices on BrowserStack. If any test fails, the deployment is automatically blocked.',
        commonMistakes: [
          'Attempting to run Android emulators on standard Linux GitHub Actions runners without hardware acceleration (KVM).',
          'Not setting `if: always()` on report upload steps, which loses failure artifacts when tests fail.',
        ],
        keyTakeaways: [
          'macOS runners or self-hosted machines are required for accelerated Android emulators.',
          'Cloud device farms eliminate the overhead of maintaining local hardware.',
        ],
      },
    ],
    lab: {
      id: 'lab-day-13',
      labType: 'framework_audit',
      title: 'Framework Architecture Audit & CI/CD Configurator',
      subtitle: 'Audit a complete mobile automation framework for best practices and configure a GitHub Actions CI pipeline.',
      instructions: [
        'Review the 5 architectural layers: DriverFactory, Pages, Utilities, Tests, and Resources.',
        'Verify ThreadLocal implementation and ensure `remove()` is invoked.',
        'Configure the GitHub Actions workflow YAML to launch Appium and execute Maven Surefire.',
        'Run the framework compliance check to achieve a 100% Production-Ready audit score.',
      ],
      initialState: {
        frameworkScore: 65,
        checks: [
          { name: 'ThreadLocal Driver Management', status: 'pass' },
          { name: 'POM Page Decoupling', status: 'pass' },
          { name: 'Hardcoded Sleep Elimination', status: 'pass' },
          { name: 'CI/CD Pipeline Workflow', status: 'fail', message: 'Missing GitHub Actions YAML' },
          { name: 'Artifact Archival on Failure', status: 'fail', message: 'Missing upload-artifact step' },
        ],
      },
      solutionChecklist: [
        'Verify DriverFactory uses ThreadLocal<AndroidDriver>',
        'Ensure BaseTest cleans up via driverThreadLocal.remove()',
        'Add .github/workflows/mobile-tests.yml with Appium 2.x server start',
        'Configure `if: always()` for report artifact uploads',
      ],
      hints: [
        'Always set `if: always()` on artifact uploads so you can see why builds failed.',
        'Remember that Appium 2.x server must be started in background (`appium &`) in CI scripts.',
      ],
    },
    challenge: {
      id: 'challenge-day-13',
      title: 'Configure Maven Surefire with Parallel Execution in pom.xml',
      scenario:
        'Your test suite has grown to 100 tests. You must configure the `maven-surefire-plugin` in `pom.xml` to execute `testng.xml` with parameter injection.',
      task:
        'Write the `<plugin>` configuration block for `maven-surefire-plugin` specifying `suiteXmlFile` bound to a system property with default `testng.xml`.',
      verificationCriteria: [
        'Includes `maven-surefire-plugin`',
        'Configures `<suiteXmlFiles><suiteXmlFile>${suiteXmlFile}</suiteXmlFile></suiteXmlFiles>`',
        'Sets property `<suiteXmlFile>testng.xml</suiteXmlFile>` default',
      ],
      hints: [
        'Use `<properties><suiteXmlFile>testng.xml</suiteXmlFile></properties>`.',
      ],
    },
    interviewQuestions: [
      {
        id: 'iq-13-1',
        category: 'Framework Architecture',
        question: 'Why is `ThreadLocal<AndroidDriver>` mandatory when designing a framework for parallel test execution?',
        idealAnswer:
          'In Java, static variables are shared across all threads in the same JVM process. If a framework declares a static `AndroidDriver driver`, multiple test threads executing concurrently will overwrite the same driver reference, causing race conditions, mismatched commands, and session crashes. `ThreadLocal<AndroidDriver>` isolates the driver instance to the specific thread executing the test. Thread A and Thread B each get their own dedicated driver instance. Furthermore, calling `driverThreadLocal.remove()` in teardown is mandatory to prevent memory leaks in thread pools.',
        interviewerEvaluationPoints: [
          'Explains race conditions with shared static variables in multi-threading',
          'Explains how ThreadLocal allocates separate memory per thread',
          'Highlights the need for `threadLocal.remove()` to avoid memory leaks',
        ],
      },
      {
        id: 'iq-13-2',
        category: 'Framework Architecture',
        question: 'Explain how you would set up and run mobile automation tests in a GitHub Actions CI/CD pipeline.',
        idealAnswer:
          'A robust GitHub Actions setup consists of: 1) Using a `macos` runner because it supports hardware acceleration (virtualization) for Android emulators; 2) Installing Java JDK 17 and Node.js; 3) Installing Appium 2.x and the UiAutomator2 driver via npm (`npm i -g appium && appium driver install uiautomator2`); 4) Starting the Appium server in the background: `appium &`; 5) Using an action like `reactivecircus/android-emulator-runner` to create, launch, and wait for the Android emulator to boot; 6) Executing tests via Maven: `mvn clean test -DsuiteXmlFile=testng.xml`; 7) Using `actions/upload-artifact` with `if: always()` to preserve HTML reports and screenshots.',
        interviewerEvaluationPoints: [
          'Mentions macOS runners for Android hardware acceleration',
          'Details Appium server launch in background',
          'Explains emulator boot wait step',
          'Highlights artifact archival with `if: always()`',
        ],
      },
      {
        id: 'iq-13-3',
        category: 'Framework Architecture',
        question: 'What are the pros and cons of using a Cloud Device Farm (like BrowserStack or SauceLabs) versus local physical devices?',
        idealAnswer:
          '**Cloud Device Farms (BrowserStack / SauceLabs):**\n• *Pros:* Zero hardware maintenance, thousands of real device models/OS versions available on demand, parallel testing at scale, automated video recordings and network logs, integrates directly with CI/CD.\n• *Cons:* Recurring subscription costs, slight network latency compared to local hardware, requires secure network tunnels (like BrowserStack Local) to access private internal staging APIs.\n**Local Physical Devices:**\n• *Pros:* Fast execution with zero network lag, full control over device settings, one-time hardware purchase.\n• *Cons:* High maintenance overhead (battery swelling, OS updates, USB hub failures, device sleep states), difficult to scale across 30+ device permutations.',
        interviewerEvaluationPoints: [
          'Compares maintenance overhead vs cloud subscription costs',
          'Explains device coverage and scalability advantages of cloud farms',
          'Mentions network tunneling for internal staging environments',
        ],
      },
      {
        id: 'iq-13-4',
        category: 'Framework Architecture',
        question: 'How do you structure an enterprise mobile automation framework from scratch? What are the key packages and responsibilities?',
        idealAnswer:
          'I structure an enterprise mobile framework into 5 distinct layers: 1) **Driver Management (`com.framework.driver`):** `DriverFactory` managing `ThreadLocal<AndroidDriver>` and `UiAutomator2Options`; 2) **Pages (`com.framework.pages`):** `BasePage` (encapsulating WebDriverWait, click, type, and gestures) and modular page classes (LoginPage, ProductsPage) containing private locators and fluent public actions; 3) **Tests (`com.framework.tests`):** `BaseTest` (handling @BeforeMethod, @AfterMethod, and configuration) and test classes holding assertions; 4) **Utilities (`com.framework.utils`):** `ConfigReader`, `GestureUtils`, `ScreenshotUtils`, and `DataProviders`; 5) **Reporting (`com.framework.listeners`):** `ExtentReportListener` implementing `ITestListener` to capture screenshots on failure.',
        interviewerEvaluationPoints: [
          'Articulates clean separation of concerns across 5 architectural layers',
          'Mentions DriverFactory, BasePage, BaseTest, and Listeners',
          'Demonstrates senior-level framework design maturity',
        ],
      },
      {
        id: 'iq-13-5',
        category: 'Troubleshooting',
        question: 'What command line parameters do you pass to the Android emulator binary in CI to ensure fast, headless execution?',
        idealAnswer:
          'When running an emulator in CI/CD without a GUI display, you pass headless optimization flags to the `emulator` binary:\n`emulator -avd Pixel_7_API_34 -no-window -no-audio -no-boot-anim -gpu swiftshader_indirect -camera-back none -camera-front none`\n• `-no-window`: Disables the graphical GUI window, saving significant GPU/CPU overhead.\n• `-no-audio`: Disables the sound subsystem.\n• `-no-boot-anim`: Skips the boot animation for faster startup.\n• `-gpu swiftshader_indirect`: Uses software-based OpenGL rendering on headless cloud servers.',
        interviewerEvaluationPoints: [
          'Names `-no-window` for headless operation',
          'Mentions `-no-boot-anim` and `-no-audio` for resource savings',
          'Explains software GPU rendering flag',
        ],
      },
    ],
    quiz: [
      {
        id: 'q-13-1',
        question: 'Why should `DriverFactory` use `ThreadLocal<AndroidDriver>` instead of a plain static variable?',
        options: [
          'It is required by Java 8 lambdas',
          'To ensure each parallel test thread maintains an isolated driver instance without race conditions',
          'It doubles the Wi-Fi speed of the phone',
          'It automatically fixes broken XPath locators',
        ],
        correctAnswerIndex: 1,
        explanation:
          '`ThreadLocal` guarantees each test thread possesses an isolated driver instance, preventing parallel threads from colliding.',
      },
      {
        id: 'q-13-2',
        question: 'Which Maven plugin is responsible for discovering, configuring, and executing TestNG test suites from the command line?',
        options: [
          'maven-surefire-plugin',
          'maven-compiler-plugin',
          'maven-jar-plugin',
          'maven-deploy-plugin',
        ],
        correctAnswerIndex: 0,
        explanation:
          '`maven-surefire-plugin` is the standard test runner plugin in Maven for executing JUnit and TestNG test suites.',
      },
      {
        id: 'q-13-3',
        question: 'Why are macOS runners typically chosen over standard Linux runners when executing Android emulators in GitHub Actions?',
        options: [
          'macOS runners support hardware virtualization (hypervisor) required to run accelerated Android emulators',
          'Linux cannot run Java',
          'Apple requires all Appium tests to run on macOS',
          'macOS is completely free on all cloud providers',
        ],
        correctAnswerIndex: 0,
        explanation:
          'macOS runners provide nested hardware virtualization (HAXM/Hypervisor.framework) required for performant Android emulators.',
      },
      {
        id: 'q-13-4',
        question: 'Which flag in GitHub Actions ensures test report artifacts are uploaded even when some test steps fail?',
        options: [
          'if: always()',
          'continue-on-error: true',
          'on-fail: upload',
          'ignore-exit-code: 1',
        ],
        correctAnswerIndex: 0,
        explanation:
          '`if: always()` ensures the reporting step executes regardless of whether previous test execution steps succeeded or failed.',
      },
      {
        id: 'q-13-5',
        question: 'Which emulator CLI flag disables the graphical window display for headless server execution?',
        options: [
          '-no-window',
          '-headless-mode',
          '-hide-ui',
          '-silent-screen',
        ],
        correctAnswerIndex: 0,
        explanation:
          '`-no-window` launches the Android emulator in headless mode without allocating a desktop display window.',
      },
    ],
  },

  // DAY 14
  {
    dayNumber: 14,
    slug: 'day-14',
    title: 'Final Capstone Project & Technical Interview Bank',
    subtitle: 'End-to-End Android Shopping App Automation Framework & Comprehensive Interview Prep',
    badge: 'Capstone & Certification',
    duration: '75 mins',
    objectives: [
      'Build a complete end-to-end mobile automation framework for an Android Shopping Application (SauceLabs)',
      'Automate 10 production user journeys: authentication, search, sorting, cart gestures, checkout, and verification',
      'Download and inspect the production-ready Maven project with pom.xml, testng.xml, and Page Objects',
      'Master the 20-question comprehensive mobile automation technical interview question bank',
      'Pass the Day 14 certification assessment and generate your verified RootAccess course certificate',
    ],
    introduction:
      'Congratulations on reaching Day 14! You have journeyed from Appium 2.x fundamentals to Android toolchains, locators, gestures, waits, TestNG, POM, data-driven testing, and CI/CD pipelines. Today you will synthesize everything into a complete, portfolio-grade Capstone Project: automating a real-world Android e-commerce application. You will also review a comprehensive 20-question technical interview bank to prepare for top mobile QA automation job interviews.',
    topics: [
      {
        title: '1. Capstone Project Overview: Android Shopping Application E2E',
        summary: '10 end-to-end automated scenarios covering the complete user shopping journey.',
        explanation:
          'Your final project automates the official SauceLabs mobile shopping application (`com.swaglabsmobileapp`). The automated test suite covers 10 critical real-world scenarios:\n\n' +
          '1. **Valid Login Flow:** Authenticate with `standard_user`, verify redirection to the Products catalog.\n' +
          '2. **Locked Out User Flow:** Verify that entering `locked_out_user` displays the expected error banner.\n' +
          '3. **Product Catalog Sorting:** Change sort filter from "Price (low to high)" to "Price (high to low)" and assert product ordering.\n' +
          '4. **Product Details & Add to Cart:** Tap a product card, inspect title, description, and price, and click "Add to Cart".\n' +
          '5. **Dynamic Cart Badge Counter:** Verify cart icon badge increments from 0 to 1 upon adding an item.\n' +
          '6. **Scroll Down to Off-Screen Products:** Use UiScrollable to scroll to "Sauce Labs Onesie" located below the fold.\n' +
          '7. **Swipe-to-Remove in Cart:** Navigate to Cart and remove an item, verifying the badge updates.\n' +
          '8. **Multi-Step Checkout:** Enter First Name, Last Name, and Postal Code, and proceed to the Payment Overview.\n' +
          '9. **Background App Resilience:** Simulate backgrounding the app for 5 seconds during checkout and verify state is preserved upon resume.\n' +
          '10. **Order Confirmation ID Extraction:** Tap "Finish", extract the dynamic "THANK YOU FOR YOUR ORDER" message, and verify order completion.',
        realWorldScenario:
          'This capstone project mirrors the exact technical assessment given during senior mobile automation engineer interviews at top tech companies.',
        commonMistakes: [
          'Writing the entire 10-step flow in a single monolithic test method instead of modular Page Objects.',
          'Hardcoding sleeps between checkout transitions.',
        ],
        keyTakeaways: [
          'The capstone brings together locators, gestures, waits, POM, and assertions.',
          'Provides a real GitHub-ready portfolio project.',
        ],
      },
      {
        title: '2. Complete Downloadable Framework Structure & Maven Execution',
        summary: 'Downloadable project files, pom.xml, and exact CLI run commands.',
        explanation:
          'The capstone framework includes all source files ready to clone and run locally:\n\n' +
          '**Running the Capstone locally:**\n' +
          '```bash\n' +
          '# 1. Start Appium 2.x server\n' +
          'appium\n\n' +
          '# 2. Verify Android emulator or device is connected\n' +
          'adb devices\n\n' +
          '# 3. Clone / Navigate to project directory\n' +
          'cd rootaccess-appium-capstone\n\n' +
          '# 4. Execute test suite via Maven Surefire\n' +
          'mvn clean test -DsuiteXmlFile=testng.xml\n\n' +
          '# 5. View ExtentReport\n' +
          'open target/reports/ExtentReport.html\n' +
          '```',
        codeSnippet: {
          language: 'java',
          filename: 'ShoppingE2ETest.java',
          code: `package com.rootaccess.tests;\n\nimport com.rootaccess.base.BaseTest;\nimport com.rootaccess.pages.*;\nimport org.testng.Assert;\nimport org.testng.annotations.Test;\n\npublic class ShoppingE2ETest extends BaseTest {\n\n    @Test(groups = {"e2e", "smoke"}, description = "End-to-End Android Shopping Checkout Journey")\n    public void testCompleteShoppingOrderFlow() {\n        // Step 1: Login\n        ProductsPage productsPage = new LoginPage(driver)\n            .enterUsername("standard_user")\n            .enterPassword("secret_sauce")\n            .clickLoginSuccess();\n\n        Assert.assertTrue(productsPage.isLoaded(), "Products catalog should be displayed");\n\n        // Step 2: Add Backpack to cart\n        productsPage.addProductToCart("Sauce Labs Backpack");\n        Assert.assertEquals(productsPage.getCartBadgeCount(), "1", "Cart badge should show 1");\n\n        // Step 3: Scroll to off-screen item and add it\n        productsPage.scrollToProductAndAddToCart("Sauce Labs Onesie");\n        Assert.assertEquals(productsPage.getCartBadgeCount(), "2", "Cart badge should show 2");\n\n        // Step 4: Open Cart\n        CartPage cartPage = productsPage.openCart();\n        Assert.assertTrue(cartPage.isItemInCart("Sauce Labs Backpack"));\n        Assert.assertTrue(cartPage.isItemInCart("Sauce Labs Onesie"));\n\n        // Step 5: Proceed to Checkout\n        CheckoutInformationPage checkoutInfo = cartPage.proceedToCheckout();\n        CheckoutOverviewPage overview = checkoutInfo\n            .enterFirstName("Pavan")\n            .enterLastName("Kalyan")\n            .enterPostalCode("560001")\n            .clickContinue();\n\n        // Step 6: Verify Summary and Finish Order\n        Assert.assertTrue(overview.isLoaded(), "Overview screen should load with order summary");\n        CheckoutCompletePage completePage = overview.clickFinish();\n\n        // Step 7: Final Assertion\n        Assert.assertEquals(\n            completePage.getConfirmationHeader(),\n            "THANK YOU FOR YOUR ORDER",\n            "Order confirmation header mismatch"\n        );\n    }\n}`,
          explanation: 'A clean, readable 40-line E2E test covering 7 different screens and 12 assertions.',
        },
        realWorldScenario:
          'Presenting this clean POM test in a portfolio repository demonstrates senior-level craftsmanship to prospective employers.',
        commonMistakes: [
          'Attempting to run tests without starting the Appium server first.',
          'Missing the APK in the specified file path.',
        ],
        keyTakeaways: [
          'Execute with `mvn clean test -DsuiteXmlFile=testng.xml`.',
          'Reports are automatically archived in `target/reports/`.',
        ],
      },
      {
        title: '3. Technical Interview Preparation & Career Roadmap',
        summary: 'How to communicate mobile testing expertise in technical interviews.',
        explanation:
          'When interviewing for Mobile Automation roles, senior interviewers evaluate:\n\n' +
          '1. **Architectural Depth:** Do you understand the W3C client-server architecture, ADB port forwarding, and UiAutomator2 internals?\n' +
          '2. **Flakiness Management:** Can you explain why Thread.sleep is bad and how to resolve StaleElementReferenceException with WebDriverWait?\n' +
          '3. **Gesture Engineering:** Can you explain W3C PointerInput and UiScrollable without relying on deprecated TouchAction?\n' +
          '4. **Framework Design:** Can you build a POM framework with ThreadLocal<AndroidDriver> and integrate it into GitHub Actions or cloud farms?\n\n' +
          'Review the 20 comprehensive interview questions in the Interview Prep tab to master every topic.',
        realWorldScenario:
          'In an interview coding round, you are asked to write a method that scrolls down a dynamic list. By writing a clean UiScrollable or W3C PointerInput method instead of hardcoded coordinates, you immediately stand out from 95% of candidates.',
        commonMistakes: [
          'Mentioning deprecated TouchAction in 2024+ interviews.',
          'Claiming to have run parallel mobile tests without understanding ThreadLocal or systemPort capabilities.',
        ],
        keyTakeaways: [
          'Emphasize W3C compliance, explicit synchronization, and ThreadLocal thread safety.',
          'Ground all answers in real workplace troubleshooting experience.',
        ],
      },
    ],
    lab: {
      id: 'lab-day-14',
      labType: 'capstone_shopping',
      title: 'Capstone E2E Shopping App Automation Simulator & Project Exporter',
      subtitle: 'Execute the complete 10-step E2E shopping automation flow in the interactive simulator and download the Maven project.',
      instructions: [
        'Review the 10 E2E test steps on the simulated smartphone screen.',
        'Run the interactive test runner step-by-step to observe state transitions, gestures, and assertions.',
        'Inspect the ExtentReport generated upon test completion.',
        'Download the complete Java Maven project archive for your portfolio.',
      ],
      initialState: {
        activeStep: 1,
        totalSteps: 10,
        completedSteps: [],
        currentScreen: 'LOGIN_SCREEN',
        cartCount: 0,
        isFinished: false,
      },
      solutionChecklist: [
        'Step 1: Authenticate with valid standard_user credentials',
        'Step 2: Add Backpack item to cart (badge count = 1)',
        'Step 3: Scroll down to off-screen Onesie item via UiScrollable',
        'Step 4: Add Onesie to cart (badge count = 2)',
        'Step 5: Navigate to Cart and review items',
        'Step 6: Complete Shipping Information form (Name, Postal Code)',
        'Step 7: Background app for 3 seconds and verify resume',
        'Step 8: Review Overview totals and click Finish',
        'Step 9: Assert "THANK YOU FOR YOUR ORDER" header displays',
        'Step 10: Generate ExtentReport and verified course certificate',
      ],
      hints: [
        'Notice how each step seamlessly passes control to the next Page Object.',
        'Click "Run Capstone Simulation" to watch all 10 steps execute with real-time assertions.',
      ],
    },
    challenge: {
      id: 'challenge-day-14',
      title: 'Final Capstone Verification Challenge',
      scenario:
        'You are preparing the final Capstone project submission for RootAccess certification.',
      task:
        'Verify that all 14 course modules are marked completed, complete the 20-question comprehensive interview bank review, and pass the final checkpoint quiz to unlock your verified course certificate.',
      verificationCriteria: [
        'All 14 days completed in curriculum tracker',
        'Final Capstone Simulation executed successfully',
        'Score 80%+ on the Day 14 checkpoint quiz',
      ],
      hints: [
        'Review topics from Days 1 through 13 if you need a refresher on any question.',
      ],
    },
    interviewQuestions: [
      {
        id: 'iq-14-1',
        category: 'Fundamentals',
        question: 'Explain the high-level architecture of Appium 2.x and how a command reaches an Android device.',
        idealAnswer:
          '1) The Java test sends a W3C WebDriver command over HTTP to the Appium 2.x Server running on port 4723; 2) The Appium Server parses the command and routes it to the appium-uiautomator2-driver; 3) The driver forwards the command over ADB port forwarding (port 8200 local to 6790 device) to the io.appium.uiautomator2.server APK running as an instrumentation service on the device; 4) The on-device server invokes native Android Accessibility APIs to perform the action and returns the JSON result back up the chain.',
        interviewerEvaluationPoints: [
          'Names W3C HTTP transport, Appium Server, UiAutomator2 driver, and on-device server',
          'Explains ADB port forwarding',
          'Mentions Android Accessibility layer',
        ],
      },
      {
        id: 'iq-14-2',
        category: 'Android Internals',
        question: 'What is the difference between an Android App Package and an App Activity?',
        idealAnswer:
          'An App Package (e.g. `com.swaglabsmobileapp`) is the unique identifier for the application on the device and Google Play Store. It acts as the process namespace. An App Activity (e.g. `.MainActivity`) represents an individual screen or window with which the user interacts. One package contains many activities.',
        interviewerEvaluationPoints: [
          'Package = unique process ID / application namespace',
          'Activity = individual UI screen',
          'Explains how both configure Appium capabilities',
        ],
      },
      {
        id: 'iq-14-3',
        category: 'Appium Inspector and Locators',
        question: 'Why is Accessibility ID preferred over XPath in mobile test automation?',
        idealAnswer:
          'Accessibility ID maps directly to Android’s `content-desc` attribute which the OS indexes in memory, enabling sub-second lookup speeds. It is also cross-platform (maps to `accessibilityIdentifier` on iOS). XPath requires serializing the entire Android view tree into an in-memory XML document on the device, which is slow (multi-second delays) and brittle.',
        interviewerEvaluationPoints: [
          'Explains in-memory indexing of content-desc',
          'Highlights cross-platform script reuse',
          'Explains why XPath is slow on mobile',
        ],
      },
      {
        id: 'iq-14-4',
        category: 'Waits and Synchronisation',
        question: 'Why is Thread.sleep considered an anti-pattern and what is the proper alternative?',
        idealAnswer:
          'Thread.sleep pauses execution unconditionally without polling. If an element takes 200ms, it wastes seconds; if it takes 5001ms, it still fails. The proper alternative is `WebDriverWait` with `ExpectedConditions` (e.g. `elementToBeClickable`, `visibilityOfElementLocated`), which polls every 500ms and proceeds immediately once the condition is met.',
        interviewerEvaluationPoints: [
          'Explains wasted execution time and brittleness',
          'Names WebDriverWait and ExpectedConditions',
          'Identifies 500ms default polling interval',
        ],
      },
      {
        id: 'iq-14-5',
        category: 'Mobile Gestures',
        question: 'How do you perform a vertical scroll down to an element using Android UiScrollable?',
        idealAnswer:
          'driver.findElement(AppiumBy.androidUIAutomator("new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text(\"Target Text\"))")); This runs natively inside the on-device UiAutomator engine, scrolling until the target element is visible on screen.',
        interviewerEvaluationPoints: [
          'Writes exact `new UiScrollable(...).scrollIntoView(...)` syntax',
          'Explains native on-device execution',
          'Highlights resolution independence',
        ],
      },
      {
        id: 'iq-14-6',
        category: 'Android Internals',
        question: 'How do you switch between Native and WebView contexts in a Hybrid mobile application?',
        idealAnswer:
          '1) Call `Set<String> contexts = driver.getContextHandles();`; 2) Iterate and switch to webview: `driver.context("WEBVIEW_com.package");`; 3) Interact using standard Selenium CSS/ID locators; 4) Switch back to native: `driver.context("NATIVE_APP");`. Note: Developers must enable `WebView.setWebContentsDebuggingEnabled(true)`.',
        interviewerEvaluationPoints: [
          'Names getContextHandles and context methods',
          'Mentions WebView.setWebContentsDebuggingEnabled requirement',
          'Remembers to switch back to NATIVE_APP',
        ],
      },
      {
        id: 'iq-14-7',
        category: 'Framework Architecture',
        question: 'Why must a parallel mobile automation framework use `ThreadLocal<AndroidDriver>`?',
        idealAnswer:
          'Static driver variables are shared across all threads in the JVM. If two tests run in parallel, Thread 2 overrides Thread 1’s driver instance, causing race conditions and crashes. `ThreadLocal<AndroidDriver>` ensures each thread has its own isolated driver reference. Calling `threadLocal.remove()` in teardown prevents memory leaks.',
        interviewerEvaluationPoints: [
          'Explains race conditions with shared static drivers',
          'Explains thread-level isolation provided by ThreadLocal',
          'Mentions `threadLocal.remove()` cleanup',
        ],
      },
      {
        id: 'iq-14-8',
        category: 'TestNG & POM',
        question: 'What are the core principles of the Page Object Model (POM)?',
        idealAnswer:
          '1) Separation of concerns: each screen is represented by a Page Class holding private locators and public action methods; 2) Zero assertions in Page Classes: assertions belong in `@Test` methods; 3) Reusability: locator changes only require updating a single class.',
        interviewerEvaluationPoints: [
          'Defines private locators and public action methods',
          'Emphasizes keeping assertions out of Page Objects',
          'Highlights single point of maintenance',
        ],
      },
      {
        id: 'iq-14-9',
        category: 'TestNG & POM',
        question: 'What does `alwaysRun = true` do on `@AfterMethod` and why is it critical?',
        idealAnswer:
          'By default, if a prior configuration or test step fails, TestNG skips subsequent teardown methods. Setting `alwaysRun = true` on `@AfterMethod` guarantees that teardown (calling `driver.quit()`) runs even when assertions fail, preventing hung Appium sessions and locked device ports.',
        interviewerEvaluationPoints: [
          'Explains skipping behavior on assertion failure',
          'Explains how alwaysRun guarantees cleanup',
          'Prevents orphaned Appium sessions',
        ],
      },
      {
        id: 'iq-14-10',
        category: 'Troubleshooting',
        question: 'How do you automatically capture screenshots on test failure using TestNG?',
        idealAnswer:
          'Implement `ITestListener`, override `onTestFailure(ITestResult result)`, extract the driver instance via `result.getInstance()`, cast to `TakesScreenshot`, call `getScreenshotAs(OutputType.FILE)`, save to a timestamped PNG file, and register the listener in `testng.xml`.',
        interviewerEvaluationPoints: [
          'Names ITestListener interface and onTestFailure callback',
          'Explains extracting driver from test instance',
          'Mentions TakesScreenshot casting and XML registration',
        ],
      },
      {
        id: 'iq-14-11',
        category: 'Android Internals',
        question: 'What is the purpose of `options.setNoReset(true)` versus `options.setFullReset(true)`?',
        idealAnswer:
          '`noReset: true` keeps the application installed and preserves all cached app data and user login sessions between runs. `fullReset: true` uninstalls the app completely at the end of the session and installs it freshly from the APK at the start, providing a completely clean slate.',
        interviewerEvaluationPoints: [
          'Contrasts preserving user state vs clean uninstallation',
          'Explains trade-off between test speed and isolation',
        ],
      },
      {
        id: 'iq-14-12',
        category: 'Mobile Gestures',
        question: 'How do you simulate pressing the Android Back button in Appium Java?',
        idealAnswer:
          'driver.pressKey(new KeyEvent(AndroidKey.BACK)); This sends a native Android hardware back key event to the active window.',
        interviewerEvaluationPoints: [
          'Uses `driver.pressKey(new KeyEvent(AndroidKey.BACK))`',
          'Identifies AndroidKey enum',
        ],
      },
      {
        id: 'iq-14-13',
        category: 'Waits and Synchronisation',
        question: 'What causes a `StaleElementReferenceException` on Android and how do you prevent it?',
        idealAnswer:
          'It happens when a view that was previously located is detached or redrawn in the view hierarchy (e.g. during fragment transitions, screen rotation, or RecyclerView refresh). To prevent it: do not cache WebElements in class fields; store `By` locators and locate dynamically right before interaction; use `ExpectedConditions.refreshed(...)`.',
        interviewerEvaluationPoints: [
          'Explains detachment from active view tree',
          'Identifies mobile triggers (fragments, rotation, list redraw)',
          'Advocates storing By locators instead of WebElements',
        ],
      },
      {
        id: 'iq-14-14',
        category: 'TestNG & POM',
        question: 'How does a TestNG `@DataProvider` work and what does it return?',
        idealAnswer:
          'A `@DataProvider` returns a 2D array of objects (`Object[][]`) or an `Iterator<Object[]>`. The `@Test(dataProvider = "name")` method executes once for each row in the array, receiving the row elements as arguments for data-driven testing.',
        interviewerEvaluationPoints: [
          'Identifies `Object[][]` return type',
          'Explains rows = runs, cols = arguments',
        ],
      },
      {
        id: 'iq-14-15',
        category: 'Troubleshooting',
        question: 'When running `adb devices`, your device shows "unauthorized". How do you fix it?',
        idealAnswer:
          'Unlock the phone screen, look for the "Allow USB debugging?" RSA key dialog, check "Always allow from this computer", and tap Allow. If not shown, toggle USB debugging off and on in Developer Options or run `adb kill-server && adb start-server`.',
        interviewerEvaluationPoints: [
          'Identifies RSA key prompt on phone screen',
          'Mentions restarting ADB server',
        ],
      },
      {
        id: 'iq-14-16',
        category: 'Framework Architecture',
        question: 'How do you run Appium tests in CI/CD using Maven command line?',
        idealAnswer:
          'mvn clean test -DsuiteXmlFile=testng.xml -Dgroups=smoke. This directs the `maven-surefire-plugin` to parse `testng.xml` and run the specified group.',
        interviewerEvaluationPoints: [
          'Mentions `mvn clean test` and `-DsuiteXmlFile` flag',
          'Names maven-surefire-plugin',
        ],
      },
      {
        id: 'iq-14-17',
        category: 'Fundamentals',
        question: 'What is the default base path and port for the Appium 2.x server?',
        idealAnswer:
          'Default host: `http://127.0.0.1`, default port: `4723`, default base path: `/` (the server root). Legacy `/wd/hub` is removed by default in Appium 2.x.',
        interviewerEvaluationPoints: [
          'Identifies port 4723 and base path `/`',
          'Notes removal of `/wd/hub` default in Appium 2.x',
        ],
      },
      {
        id: 'iq-14-18',
        category: 'Mobile Gestures',
        question: 'Why was TouchAction removed in Appium Java Client 9.x?',
        idealAnswer:
          'TouchAction was a proprietary Appium API. It was removed in compliance with the standardized W3C WebDriver Actions API (using `PointerInput` and `Sequence`) to ensure uniform gesture specifications across all browsers and devices.',
        interviewerEvaluationPoints: [
          'Explains W3C Actions standardization',
          'Names PointerInput and Sequence as replacements',
        ],
      },
      {
        id: 'iq-14-19',
        category: 'Android Internals',
        question: 'How do you extract the package name and launch activity of an Android APK using ADB?',
        idealAnswer:
          'With the app open on the phone: `adb shell "dumpsys activity activities | grep -E \'mResumedActivity\'"`. Alternatively, inspect the APK with aapt: `aapt dump badging app.apk | grep package`.',
        interviewerEvaluationPoints: [
          'Mentions `adb shell dumpsys` command',
          'Mentions `aapt dump badging` alternative',
        ],
      },
      {
        id: 'iq-14-20',
        category: 'Framework Architecture',
        question: 'What is the difference between ExtentReports and standard TestNG emailable reports?',
        idealAnswer:
          'Default TestNG reports are simple HTML text tables. ExtentReports provides interactive executive dashboards with visual donut charts, execution timelines, categorized views (by author/device), step logs with severity badges, and embedded failure screenshots in modal lightboxes.',
        interviewerEvaluationPoints: [
          'Highlights visual charts and executive dashboards',
          'Mentions embedded failure screenshots and step logs',
        ],
      },
    ],
    quiz: [
      {
        id: 'q-14-1',
        question: 'In the Page Object Model, where should test assertions (`Assert.assertEquals`) be written?',
        options: [
          'Inside Page Object action methods',
          'Inside BasePage helper methods',
          'Inside `@Test` methods in Test classes',
          'Inside the pom.xml file',
        ],
        correctAnswerIndex: 2,
        explanation:
          'Assertions belong exclusively in test classes, keeping Page Objects clean and reusable across positive and negative scenarios.',
      },
      {
        id: 'q-14-2',
        question: 'Which class provides thread-safe variable isolation for `AndroidDriver` in parallel execution?',
        options: [
          'ThreadLocal<AndroidDriver>',
          'StaticDriverPool',
          'VolatileDriverRef',
          'SyncDriverWrapper',
        ],
        correctAnswerIndex: 0,
        explanation:
          '`ThreadLocal<AndroidDriver>` ensures each executing thread maintains an isolated, independent driver instance.',
      },
      {
        id: 'q-14-3',
        question: 'Which locator strategy is the fastest and most stable across both Android and iOS in Appium?',
        options: [
          'Absolute XPath',
          'Accessibility ID (`AppiumBy.accessibilityId`)',
          'Screen coordinate pixel taps',
          'CSS tag name',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Accessibility ID maps directly to `content-desc` (Android) and `accessibilityIdentifier` (iOS), providing cross-platform sub-second lookups.',
      },
      {
        id: 'q-14-4',
        question: 'Which method on `driver` sends an application to the background for a duration and automatically brings it back to the foreground?',
        options: [
          'driver.runAppInBackground(Duration duration)',
          'driver.sleepApp()',
          'driver.pauseProcess()',
          'driver.minimizeWindow()',
        ],
        correctAnswerIndex: 0,
        explanation:
          '`driver.runAppInBackground(Duration duration)` sends the app to the background and restores it after the specified duration.',
      },
      {
        id: 'q-14-5',
        question: 'What is the Maven CLI command to run a test suite specified in `testng.xml`?',
        options: [
          'mvn clean test -DsuiteXmlFile=testng.xml',
          'mvn run --suite testng.xml',
          'mvn appium:start',
          'mvn test:all',
        ],
        correctAnswerIndex: 0,
        explanation:
          '`mvn clean test -DsuiteXmlFile=testng.xml` instructs the Maven Surefire plugin to execute the designated TestNG XML suite.',
      },
    ],
  },
];
