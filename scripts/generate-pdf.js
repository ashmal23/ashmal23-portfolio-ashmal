const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Ensure directory exists
const pdfDir = path.resolve(__dirname, '../public/resume');
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

const doc = new PDFDocument({ margin: 50, size: 'A4' });
const pdfPath = path.join(pdfDir, 'Ashmal_Resume.pdf');
const stream = fs.createWriteStream(pdfPath);
doc.pipe(stream);

// Header / Title
doc.fillColor('#111827').fontSize(26).font('Helvetica-Bold').text('Ashmal Ahmed', { align: 'left' });
doc.fontSize(10).font('Helvetica').fillColor('#4b5563');
doc.text('Karachi, Pakistan | +92 315 1116129 | ashmalahmed54@gmail.com', { align: 'left' });
doc.text('GitHub: github.com/ashmal23 | LinkedIn: linkedin.com/in/ashmal-ahmed-988776347', { align: 'left' });
doc.moveDown(1.5);

// Objective
doc.fillColor('#111827').fontSize(14).font('Helvetica-Bold').text('Objective');
doc.strokeColor('#e5e7eb').lineWidth(1).moveTo(50, doc.y + 2).lineTo(545, doc.y + 2).stroke();
doc.moveDown(0.6);
doc.fillColor('#374151').fontSize(10).font('Helvetica').text(
  'Computer Science student with problem-solving skills seeking to develop industry-relevant skills and contribute to real-world software projects.',
  { align: 'justify', lineGap: 2 }
);
doc.moveDown(1.5);

// Education
doc.fillColor('#111827').fontSize(14).font('Helvetica-Bold').text('Education');
doc.strokeColor('#e5e7eb').lineWidth(1).moveTo(50, doc.y + 2).lineTo(545, doc.y + 2).stroke();
doc.moveDown(0.6);

doc.fillColor('#111827').fontSize(11).font('Helvetica-Bold').text('Greenwich University', { continued: true });
doc.fillColor('#4b5563').font('Helvetica').text(' — Karachi, Pakistan', { continued: true });
// For proper right alignment, we can draw a manual text or use a clean spacing.
doc.fillColor('#4b5563').text('                                                                                Sep 2025 - Current', { align: 'left' });

doc.fillColor('#374151').fontSize(10).font('Helvetica-Oblique').text('Bachelor of Science in Computer Science (BSCS)');
doc.moveDown(0.4);
doc.fillColor('#374151').fontSize(10).font('Helvetica').text('• Related coursework: Programming Fundamentals, Object Oriented Programming');
doc.moveDown(1.5);

// Projects
doc.fillColor('#111827').fontSize(14).font('Helvetica-Bold').text('Projects');
doc.strokeColor('#e5e7eb').lineWidth(1).moveTo(50, doc.y + 2).lineTo(545, doc.y + 2).stroke();
doc.moveDown(0.6);

doc.fillColor('#111827').fontSize(11).font('Helvetica-Bold').text('Student Record Management System (Console-Based)');
doc.moveDown(0.4);
doc.fillColor('#374151').fontSize(10).font('Helvetica');
doc.text('• Designed and implemented a menu-driven application to manage student data (add, update, delete, search).');
doc.text('• Applied modular programming using functions to improve code readability and maintainability.');
doc.text('• Focused on input validation and edge case handling, improving program reliability.');
doc.moveDown(1.5);

// Skills
doc.fillColor('#111827').fontSize(14).font('Helvetica-Bold').text('Skills & Abilities');
doc.strokeColor('#e5e7eb').lineWidth(1).moveTo(50, doc.y + 2).lineTo(545, doc.y + 2).stroke();
doc.moveDown(0.6);

doc.fillColor('#374151').fontSize(10).font('Helvetica');
doc.font('Helvetica-Bold').text('Languages: ', { continued: true }).font('Helvetica').text('Python, C');
doc.moveDown(0.2);
doc.font('Helvetica-Bold').text('Core Concepts: ', { continued: true }).font('Helvetica').text('Problem Solving, OOP (basic), Data Structures (arrays, lists, basic algorithms)');
doc.moveDown(0.2);
doc.font('Helvetica-Bold').text('Tools: ', { continued: true }).font('Helvetica').text('GitHub, VS Code');

doc.end();
