import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { DEVOPS_DAY_1_DATA } from '../src/data/devopsDay1Data';
import { DEVOPS_DAY_2_DATA } from '../src/data/devopsDay2Data';
import { DEVOPS_DAY_3_DATA } from '../src/data/devopsDay3Data';
import type { DevOpsDayUnit } from '../src/types/devopsCourse';

const OUTPUT_DIR = path.resolve(process.cwd(), 'public/devops');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Visual Palette matching RootAccess application
const NAVY = '#0F172A';
const INDIGO = '#4F46E5';
const ACCENT = '#6366F1';
const DARK = '#1E293B';
const MUTED = '#475569';
const LIGHT_BG = '#F8FAFC';
const BORDER = '#CBD5E1';
const CODE_BG = '#1E293B';

const CONTENT_X = 40;
const CONTENT_WIDTH = 515;

function writeText(
  doc: typeof PDFDocument,
  text: string,
  opts: {
    color?: string;
    size?: number;
    font?: string;
    lineGap?: number;
    width?: number;
    moveDown?: number;
  } = {}
) {
  const color = opts.color || DARK;
  const size = opts.size || 8.5;
  const font = opts.font || 'Helvetica';
  const lineGap = opts.lineGap || 2;
  const width = opts.width || CONTENT_WIDTH;

  doc.x = CONTENT_X;
  doc.fillColor(color).fontSize(size).font(font).text(text, CONTENT_X, doc.y, {
    width,
    lineGap,
  });
  doc.x = CONTENT_X;
  if (opts.moveDown !== undefined) {
    doc.moveDown(opts.moveDown);
  }
}

function writeBullet(
  doc: typeof PDFDocument,
  boldPrefix: string,
  bodyText: string,
  boldColor = NAVY
) {
  doc.x = CONTENT_X;
  doc.fillColor(boldColor).fontSize(8.5).font('Helvetica-Bold').text(`•  ${boldPrefix}: `, CONTENT_X, doc.y, {
    continued: true,
  });
  doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(bodyText, {
    lineGap: 1.8,
    width: CONTENT_WIDTH,
  });
  doc.x = CONTENT_X;
  doc.moveDown(0.3);
}

function checkPageBudget(doc: typeof PDFDocument, dayTitle: string, requiredSpace = 75) {
  if (doc.y <= 60) return false;
  if (doc.y + requiredSpace > doc.page.height - 50) {
    doc.addPage();
    drawPageHeader(doc, dayTitle);
    return true;
  }
  return false;
}

function drawPageHeader(doc: typeof PDFDocument, dayTitle: string) {
  doc.rect(0, 0, doc.page.width, 18).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold')
    .text(`ROOTACCESS  •  DEVOPS ACADEMY  |  ${dayTitle.toUpperCase()}`, CONTENT_X, 5, {
      width: doc.page.width - 80,
      lineBreak: false,
    });
  doc.x = CONTENT_X;
  doc.y = 35;
}

function drawHeader(doc: typeof PDFDocument, dayUnit: DevOpsDayUnit) {
  // Top brand banner
  doc.rect(0, 0, doc.page.width, 24).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(8.5).font('Helvetica-Bold')
    .text('ROOTACCESS  |  CAREER-LEARNING PLATFORM  •  DEVOPS ENGINEERING ACADEMY', CONTENT_X, 7, {
      width: doc.page.width - 80,
      align: 'left',
    });

  doc.y = 40;

  // Day pill
  doc.rect(CONTENT_X, doc.y, 220, 18).fill(INDIGO);
  doc.fillColor('#FFFFFF').fontSize(8).font('Helvetica-Bold')
    .text(`DAY ${dayUnit.dayNumber} OF 36  •  ${dayUnit.estimatedHours.toUpperCase()}  •  ${dayUnit.level.toUpperCase()}`, CONTENT_X + 5, doc.y - 14, {
      width: 210,
      align: 'center',
    });

  doc.moveDown(0.8);

  // Lesson Title & Subtitle
  doc.fillColor(NAVY).fontSize(16).font('Helvetica-Bold').text(dayUnit.lessonTitle, CONTENT_X, doc.y);
  doc.moveDown(0.25);
  doc.fillColor(MUTED).fontSize(9.5).font('Helvetica').text(dayUnit.subtitle, {
    lineGap: 2,
    width: CONTENT_WIDTH,
  });

  doc.moveDown(0.5);
  doc.rect(CONTENT_X, doc.y, CONTENT_WIDTH, 1.5).fill(INDIGO);
  doc.moveDown(0.6);
}

function generateDayPdf(dayUnit: DevOpsDayUnit, fileName: string) {
  const filePath = path.join(OUTPUT_DIR, fileName);
  const doc = new PDFDocument({
    margin: 40,
    size: 'A4',
    bufferPages: true,
  });

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  drawHeader(doc, dayUnit);

  // 1. Learning Objectives Box
  checkPageBudget(doc, dayUnit.lessonTitle, 120);
  const objBoxY = doc.y;
  doc.rect(CONTENT_X, objBoxY, CONTENT_WIDTH, 18).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(8.5).font('Helvetica-Bold').text('DAY LEARNING OBJECTIVES', CONTENT_X + 8, objBoxY + 5);
  doc.y = objBoxY + 24;

  dayUnit.learningObjectives.forEach((obj) => {
    writeBullet(doc, 'Objective', obj, INDIGO);
  });
  doc.moveDown(0.6);

  // 2. Core Concept Lessons
  dayUnit.topics.forEach((topic) => {
    checkPageBudget(doc, dayUnit.lessonTitle, 140);

    // Topic Header Bar
    const topicY = doc.y;
    doc.rect(CONTENT_X, topicY, CONTENT_WIDTH, 18).fill(LIGHT_BG);
    doc.rect(CONTENT_X, topicY, 4, 18).fill(INDIGO);
    doc.rect(CONTENT_X, topicY, CONTENT_WIDTH, 18).stroke(BORDER);
    doc.fillColor(NAVY).fontSize(9).font('Helvetica-Bold')
      .text(`Topic ${topic.topicNumber}: ${topic.title} (${topic.durationMinutes} mins)`, CONTENT_X + 10, topicY + 5);
    doc.y = topicY + 26;

    // Body text (clean markdown tags)
    const cleanText = topic.explanation
      .replace(/###\s*(.*)/g, '$1:')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/```[a-z]*\n([\s\S]*?)```/g, '$1');

    writeText(doc, cleanText, { size: 8, lineGap: 1.8, moveDown: 0.4 });

    // Key Takeaways
    if (topic.keyTakeaways && topic.keyTakeaways.length > 0) {
      checkPageBudget(doc, dayUnit.lessonTitle, 60);
      topic.keyTakeaways.forEach((k) => {
        writeBullet(doc, 'Takeaway', k, INDIGO);
      });
      doc.moveDown(0.3);
    }
  });

  // 3. Interview Preparation Section
  checkPageBudget(doc, dayUnit.lessonTitle, 100);
  const ivBoxY = doc.y;
  doc.rect(CONTENT_X, ivBoxY, CONTENT_WIDTH, 18).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(8.5).font('Helvetica-Bold').text('INTERVIEW REVISION VAULT (TOP 5 QUESTIONS)', CONTENT_X + 8, ivBoxY + 5);
  doc.y = ivBoxY + 24;

  dayUnit.interviewQuestions.forEach((iq, idx) => {
    checkPageBudget(doc, dayUnit.lessonTitle, 80);
    writeText(doc, `Q${idx + 1}: ${iq.question} [Target Role: ${iq.targetRole} | ${iq.difficulty}]`, {
      font: 'Helvetica-Bold',
      size: 8.5,
      color: NAVY,
      moveDown: 0.2,
    });
    writeText(doc, `Model Answer: ${iq.modelAnswer}`, {
      size: 8,
      color: DARK,
      lineGap: 1.8,
      moveDown: 0.2,
    });
    writeText(doc, `Key Evaluation Signals: ${iq.keyPoints.join(' • ')}`, {
      size: 7.5,
      color: INDIGO,
      moveDown: 0.1,
    });
    writeText(doc, `Common Candidate Pitfalls: ${iq.commonMistakes.join(' • ')}`, {
      size: 7.5,
      color: MUTED,
      moveDown: 0.4,
    });
  });

  // 4. Glossary and Quick Revision Checklist
  checkPageBudget(doc, dayUnit.lessonTitle, 100);
  const glossBoxY = doc.y;
  doc.rect(CONTENT_X, glossBoxY, CONTENT_WIDTH, 18).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(8.5).font('Helvetica-Bold').text('DAY SUMMARY & RAPID REVISION CHECKLIST', CONTENT_X + 8, glossBoxY + 5);
  doc.y = glossBoxY + 24;

  const checklists: Record<number, string[]> = {
    1: [
      'DevOps eliminates the Wall of Confusion by creating shared accountability across Dev and Ops.',
      'Immutable artifacts: Build once in CI and promote the exact same container image across environments.',
      'Continuous Delivery includes a deliberate human release gate; Continuous Deployment is fully automated.',
      'DORA metrics measure both velocity (deployment frequency, lead time) and stability (change failure rate, MTTR).',
      'Blameless postmortems repair pipeline guardrails without finger-pointing or punishing engineers.',
    ],
    2: [
      'Linux is the dominant cloud operating system; Debian uses apt, Red Hat uses dnf, Alpine uses apk.',
      'FHS standard: /etc contains configurations, /var/log contains logs, /tmp contains temporary files.',
      'pwd prints working directory, ls -lah displays all files with human-readable sizes, cd .. moves up.',
      'mkdir -p creates nested parents; cp -r recursively copies directories; mv renames or moves.',
      'Never run rm -rf without verifying your current directory using pwd; Linux has no Recycle Bin.',
      'Use cat for small files; use tail -n or tail -f to stream active server logs safely without memory lockup.',
    ],
    3: [
      'Linux permissions are divided into Owner (u), Group (g), and Others (o) triplets.',
      'Read = 4, Write = 2, Execute = 1. Standard file mode is 644; standard executable/dir mode is 755.',
      'Execute bit (x) on a directory is required to cd into the folder and access files within it.',
      'chmod changes access permissions; chown changes user and group ownership.',
      'Never use chmod 777 in production; it violates the Principle of Least Privilege and exposes secrets.',
      'ps aux displays running processes; always send SIGTERM (kill -15) before resorting to SIGKILL (kill -9).',
      'free -m: Look at the "available" column, not free; df -h checks disk partition capacity.',
      'Follow the 5-step troubleshooting framework: Gather evidence -> Isolate -> Hypothesize -> Fix -> Verify.',
    ],
  };

  const dayChecklist = checklists[dayUnit.dayNumber] || [];
  dayChecklist.forEach((item) => {
    writeBullet(doc, 'Verified Concept', item, INDIGO);
  });

  // Footer Loop (Zero blank page guarantee)
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    const oldBottom = doc.page.margins.bottom;
    const oldTop = doc.page.margins.top;
    doc.page.margins.bottom = 0;
    doc.page.margins.top = 0;

    doc.rect(CONTENT_X, doc.page.height - 30, doc.page.width - 80, 0.5).fill(BORDER);
    doc.fillColor(MUTED).fontSize(7.5).font('Helvetica')
      .text(`RootAccess DevOps Academy • ${dayUnit.lessonTitle}`, CONTENT_X, doc.page.height - 22, {
        width: 350,
        align: 'left',
        lineBreak: false,
      });
    doc.text(`Page ${i + 1} of ${range.count}`, doc.page.width - 140, doc.page.height - 22, {
      width: 100,
      align: 'right',
      lineBreak: false,
    });

    doc.page.margins.bottom = oldBottom;
    doc.page.margins.top = oldTop;
  }

  doc.end();

  return new Promise<void>((resolve, reject) => {
    stream.on('finish', () => {
      console.log(`Generated: ${filePath} (${range.count} pages)`);
      resolve();
    });
    stream.on('error', reject);
  });
}

async function run() {
  console.log('Generating DevOps Academy Study Guide PDFs...');
  await generateDayPdf(DEVOPS_DAY_1_DATA, 'day-1-understanding-devops.pdf');
  await generateDayPdf(DEVOPS_DAY_2_DATA, 'day-2-linux-fundamentals.pdf');
  await generateDayPdf(DEVOPS_DAY_3_DATA, 'day-3-linux-permissions-processes-logs.pdf');
  console.log('All 3 DevOps Study Guide PDFs generated successfully!');
}

run().catch((err) => {
  console.error('Error generating DevOps PDFs:', err);
  process.exit(1);
});
