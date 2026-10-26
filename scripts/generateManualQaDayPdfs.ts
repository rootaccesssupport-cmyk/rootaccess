import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { MANUAL_QA_DAYS, COURSE_METADATA } from '../src/data/manualQaCurriculum';
import type { ManualQaDayUnit } from '../src/types/manualQa';

const OUTPUT_DIR = path.resolve(process.cwd(), 'public/manual-qa');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Colors
const NAVY = '#0F172A';
const PRIMARY = '#0284C7';
const ACCENT = '#0369A1';
const DARK = '#1E293B';
const MUTED = '#475569';
const LIGHT_BG = '#F8FAFC';
const BORDER = '#CBD5E1';
const GREEN = '#16A34A';
const RED = '#DC2626';

function drawHeader(doc: typeof PDFDocument, day: ManualQaDayUnit) {
  // Top brand banner
  doc.rect(0, 0, doc.page.width, 24).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(8.5).font('Helvetica-Bold')
    .text('ROOTACCESS  |  CAREER-LEARNING PLATFORM  •  MANUAL QA 5-DAY PROGRAMME', 40, 7, {
      width: doc.page.width - 80,
      align: 'left',
    });

  doc.y = 40;

  // Day pill
  doc.rect(40, doc.y, 140, 18).fill(PRIMARY);
  doc.fillColor('#FFFFFF').fontSize(8).font('Helvetica-Bold')
    .text(`DAY ${day.dayNumber} OF 5  •  ${day.estimatedHours.toUpperCase()}`, 45, doc.y - 14, {
      width: 130,
      align: 'center',
    });

  doc.moveDown(0.8);

  // Day Title & Subtitle
  doc.fillColor(NAVY).fontSize(16).font('Helvetica-Bold').text(day.title, 40, doc.y);
  doc.moveDown(0.2);
  doc.fillColor(MUTED).fontSize(10).font('Helvetica').text(day.subtitle, {
    lineGap: 2,
    width: 515,
  });

  doc.moveDown(0.6);
  doc.rect(40, doc.y, 515, 1.5).fill(PRIMARY);
  doc.moveDown(0.8);
}

function drawPageHeader(doc: typeof PDFDocument, day?: ManualQaDayUnit) {
  doc.rect(0, 0, doc.page.width, 18).fill(NAVY);
  const subtitle = day ? ` (DAY ${day.dayNumber}: ${day.title.toUpperCase()})` : '';
  doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold')
    .text(`ROOTACCESS  •  MANUAL QA 5-DAY CAREER PROGRAMME${subtitle}`, 40, 5, {
      width: doc.page.width - 80,
    });
  doc.y = 35;
}

function checkPageBudget(doc: typeof PDFDocument, requiredSpace = 80, day?: ManualQaDayUnit) {
  if (doc.y <= 60) return false;
  if (doc.y + requiredSpace > doc.page.height - 50) {
    doc.addPage();
    drawPageHeader(doc, day);
    return true;
  }
  return false;
}

function generateDayPdf(day: ManualQaDayUnit) {
  const filename = path.basename(day.pdfDownloadUrl);
  const targetPath = path.join(OUTPUT_DIR, filename);

  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 40, bottom: 45, left: 40, right: 40 },
    bufferPages: true,
  });

  const writeStream = fs.createWriteStream(targetPath);
  doc.pipe(writeStream);

  drawHeader(doc, day);

  // SECTION 1: LEARNING OBJECTIVES
  checkPageBudget(doc, 100);
  doc.fillColor(NAVY).fontSize(11).font('Helvetica-Bold').text('1. Day Learning Objectives');
  doc.rect(40, doc.y + 3, 515, 0.5).fill(BORDER);
  doc.moveDown(0.6);

  day.learningObjectives.forEach((obj) => {
    checkPageBudget(doc, 25);
    doc.fillColor(PRIMARY).fontSize(9).font('Helvetica-Bold').text('  [✓]', { continued: true });
    doc.fillColor(DARK).fontSize(8.5).font('Helvetica').text(`  ${obj}`, { lineGap: 2 });
  });

  doc.moveDown(1);

  // SECTION 2: CORE CONCEPTS & IN-DEPTH EXPLANATIONS
  checkPageBudget(doc, 60);
  doc.fillColor(NAVY).fontSize(11).font('Helvetica-Bold').text('2. Core Concepts & Practical Fundamentals');
  doc.rect(40, doc.y + 3, 515, 0.5).fill(BORDER);
  doc.moveDown(0.6);

  day.concepts.forEach((concept) => {
    checkPageBudget(doc, 100);

    // Concept Title
    doc.fillColor(PRIMARY).fontSize(10).font('Helvetica-Bold').text(concept.title);
    doc.moveDown(0.3);

    // Explanation
    doc.fillColor(DARK).fontSize(8.5).font('Helvetica').text(concept.explanation, {
      lineGap: 2.5,
      width: 515,
    });
    doc.moveDown(0.5);

    // Examples
    if (concept.examples && concept.examples.length > 0) {
      checkPageBudget(doc, 70);
      doc.fillColor(ACCENT).fontSize(8.5).font('Helvetica-Bold').text('Real-World Workplace Examples:');
      concept.examples.forEach((ex) => {
        checkPageBudget(doc, 30);
        doc.fillColor(DARK).fontSize(8).font('Helvetica-Bold').text(`• [${ex.project}]: `, { continued: true });
        doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(ex.description, { lineGap: 1.5 });
      });
      doc.moveDown(0.4);
    }

    // Terminology
    if (concept.terminology && concept.terminology.length > 0) {
      checkPageBudget(doc, 60);
      doc.fillColor(ACCENT).fontSize(8.5).font('Helvetica-Bold').text('Key Standard Terminology:');
      concept.terminology.forEach((t) => {
        checkPageBudget(doc, 25);
        doc.fillColor(DARK).fontSize(8).font('Helvetica-Bold').text(`• ${t.term}: `, { continued: true });
        doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(t.definition, { lineGap: 1.5 });
      });
      doc.moveDown(0.4);
    }

    // Common Mistakes
    if (concept.commonMistakes && concept.commonMistakes.length > 0) {
      checkPageBudget(doc, 50);
      doc.fillColor(RED).fontSize(8.5).font('Helvetica-Bold').text('Common Beginner Mistakes & Interview Traps:');
      concept.commonMistakes.forEach((mistake) => {
        checkPageBudget(doc, 25);
        doc.fillColor(RED).fontSize(8).font('Helvetica').text(`  ⚠  ${mistake}`, { lineGap: 1.5 });
      });
      doc.moveDown(0.4);
    }

    // Worked Example
    if (concept.workedExample) {
      checkPageBudget(doc, 90);
      doc.rect(40, doc.y, 515, 1).fill(BORDER);
      doc.moveDown(0.3);
      doc.fillColor(GREEN).fontSize(8.5).font('Helvetica-Bold').text(`Worked Walkthrough: ${concept.workedExample.scenario}`);
      doc.fillColor(DARK).fontSize(8).font('Helvetica').text(concept.workedExample.walkthrough, { lineGap: 2 });

      if (concept.workedExample.sampleTable && concept.workedExample.sampleTable.length > 0) {
        doc.moveDown(0.3);
        concept.workedExample.sampleTable.forEach((row) => {
          checkPageBudget(doc, 20);
          const rowText = Object.entries(row)
            .map(([k, v]) => `${k}: ${v}`)
            .join(' | ');
          doc.fillColor(MUTED).fontSize(7.5).font('Courier').text(`   ${rowText}`);
        });
      }
      doc.moveDown(0.5);
    }

    doc.rect(40, doc.y, 515, 0.5).fill(BORDER);
    doc.moveDown(0.6);
  });

  // SECTION 3: GUIDED EXERCISE
  checkPageBudget(doc, 100);
  doc.fillColor(NAVY).fontSize(11).font('Helvetica-Bold').text('3. Guided Practice Exercise');
  doc.rect(40, doc.y + 3, 515, 0.5).fill(BORDER);
  doc.moveDown(0.6);

  doc.fillColor(PRIMARY).fontSize(9.5).font('Helvetica-Bold').text(day.guidedExercise.title);
  doc.fillColor(DARK).fontSize(8.5).font('Helvetica').text(day.guidedExercise.description, { lineGap: 2 });
  doc.moveDown(0.4);

  // Specification box
  checkPageBudget(doc, 100);
  const specY = doc.y;
  doc.rect(40, specY, 515, 65).fillAndStroke(LIGHT_BG, BORDER);
  doc.fillColor(DARK).fontSize(8).font('Helvetica-Bold').text('Feature Specification Under Test:', 48, specY + 6);
  doc.fillColor(MUTED).fontSize(7.5).font('Helvetica').text(day.guidedExercise.sampleSpecification, 48, specY + 18, {
    width: 495,
    lineGap: 1.5,
  });
  doc.y = specY + 72;

  doc.moveDown(0.3);
  doc.fillColor(DARK).fontSize(8.5).font('Helvetica-Bold').text('Recommended Execution Steps:');
  day.guidedExercise.steps.forEach((step) => {
    checkPageBudget(doc, 25);
    doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(`  • ${step}`, { lineGap: 1.5 });
  });

  doc.moveDown(1);

  // SECTION 4: PRACTICAL ASSIGNMENT & RUBRIC
  checkPageBudget(doc, 120);
  doc.fillColor(NAVY).fontSize(11).font('Helvetica-Bold').text('4. Practical Workplace Assignment & Evaluation Rubric');
  doc.rect(40, doc.y + 3, 515, 0.5).fill(BORDER);
  doc.moveDown(0.6);

  doc.fillColor(PRIMARY).fontSize(9.5).font('Helvetica-Bold').text(day.practicalAssignment.title);
  doc.fillColor(DARK).fontSize(8.5).font('Helvetica').text(day.practicalAssignment.description, { lineGap: 2 });
  doc.moveDown(0.4);

  doc.fillColor(DARK).fontSize(8.5).font('Helvetica-Bold').text('System Under Test Brief:');
  doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(day.practicalAssignment.targetSystemBrief, { lineGap: 2 });
  doc.moveDown(0.4);

  doc.fillColor(DARK).fontSize(8.5).font('Helvetica-Bold').text('Submission Instructions:');
  day.practicalAssignment.instructions.forEach((ins) => {
    checkPageBudget(doc, 25);
    doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(`  • ${ins}`, { lineGap: 1.5 });
  });
  doc.moveDown(0.4);

  doc.fillColor(DARK).fontSize(8.5).font('Helvetica-Bold').text('Deterministic Evaluation Rubric:');
  day.practicalAssignment.criteria.forEach((crit) => {
    checkPageBudget(doc, 25);
    const minReq = crit.minCountRequired ? ` [Requires at least ${crit.minCountRequired}]` : '';
    doc.fillColor(PRIMARY).fontSize(8).font('Helvetica-Bold').text(`  ✓ [Weight ${crit.weight}%] ${crit.title}${minReq}: `, { continued: true });
    doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(crit.description, { lineGap: 1.5 });
  });

  doc.moveDown(1);

  // SECTION 5: TOP INTERVIEW QUESTIONS
  checkPageBudget(doc, 120);
  doc.fillColor(NAVY).fontSize(11).font('Helvetica-Bold').text('5. Industry Interview Questions & Model Answers');
  doc.rect(40, doc.y + 3, 515, 0.5).fill(BORDER);
  doc.moveDown(0.6);

  day.interviewQuestions.forEach((q, idx) => {
    checkPageBudget(doc, 90);
    doc.fillColor(NAVY).fontSize(9).font('Helvetica-Bold').text(`Q${idx + 1} [${q.type}]: ${q.question}`);
    doc.moveDown(0.2);

    doc.fillColor(DARK).fontSize(8).font('Helvetica-Bold').text('Model Answer:');
    doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(q.modelAnswer, { lineGap: 2 });

    if (q.followUp) {
      doc.moveDown(0.2);
      doc.fillColor(PRIMARY).fontSize(7.5).font('Helvetica-Bold').text(`Interviewer Follow-Up: ${q.followUp}`);
    }

    if (q.commonMistakes && q.commonMistakes.length > 0) {
      doc.moveDown(0.2);
      doc.fillColor(RED).fontSize(7.5).font('Helvetica').text(`Avoid this mistake: ${q.commonMistakes.join('; ')}`);
    }

    doc.moveDown(0.6);
  });

  // SECTION 6: KEY TAKEAWAYS & REVISION NOTES
  checkPageBudget(doc, 100);
  doc.fillColor(NAVY).fontSize(11).font('Helvetica-Bold').text('6. Key Takeaways & Fast Revision Notes');
  doc.rect(40, doc.y + 3, 515, 0.5).fill(BORDER);
  doc.moveDown(0.6);

  doc.fillColor(DARK).fontSize(8.5).font('Helvetica-Bold').text('Core Takeaways:');
  day.keyTakeaways.forEach((t) => {
    checkPageBudget(doc, 25);
    doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(`  • ${t}`, { lineGap: 1.5 });
  });
  doc.moveDown(0.4);

  doc.fillColor(DARK).fontSize(8.5).font('Helvetica-Bold').text('Cheat Sheet / Revision Notes:');
  day.revisionNotes.forEach((n) => {
    checkPageBudget(doc, 25);
    doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(`  • ${n}`, { lineGap: 1.5 });
  });

  // Number all pages
  const totalPages = doc.bufferedPageRange().count;
  for (let i = 0; i < totalPages; i++) {
    doc.switchToPage(i);
    const oldBottom = doc.page.margins.bottom;
    const oldTop = doc.page.margins.top;
    doc.page.margins.bottom = 0;
    doc.page.margins.top = 0;

    doc.rect(40, doc.page.height - 30, doc.page.width - 80, 0.5).fill(BORDER);
    doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(
      `RootAccess Manual QA 5-Day Career Programme  •  Day ${day.dayNumber}: ${day.title}`,
      40,
      doc.page.height - 22,
      {
        width: 320,
        align: 'left',
        lineBreak: false,
      }
    );
    doc.text(`Page ${i + 1} of ${totalPages}`, doc.page.width - 140, doc.page.height - 22, {
      width: 100,
      align: 'right',
      lineBreak: false,
    });

    doc.page.margins.bottom = oldBottom;
    doc.page.margins.top = oldTop;
  }

  doc.end();

  return new Promise<void>((resolve, reject) => {
    writeStream.on('finish', () => {
      console.log(`Generated: ${targetPath} (${totalPages} pages)`);
      resolve();
    });
    writeStream.on('error', reject);
  });
}

async function main() {
  console.log(`Generating 5-Day Manual QA PDF handbooks into: ${OUTPUT_DIR}`);
  for (const day of MANUAL_QA_DAYS) {
    await generateDayPdf(day);
  }
  console.log('All 5 Day PDFs generated successfully!');
}

main().catch((err) => {
  console.error('Failed to generate day PDFs:', err);
  process.exit(1);
});
