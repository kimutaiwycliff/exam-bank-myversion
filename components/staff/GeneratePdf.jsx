import { capitalizeAllLetters, extractQuestion } from '@/lib/utils';
import jsPDF from 'jspdf';

const generatePDF = (sections) => {
  const examName = sections?.[0]?.exam;
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height; // Height of the page
  const margin = 10; // Top and bottom margin
  let yPosition = 20; // Initial vertical position

  // Helper function to add a new page
  const addNewPage = () => {
    doc.addPage();
    yPosition = margin;
  };

  // Loop through each section
  sections?.forEach((section, sectionIndex) => {
    const { name, instructions, questions } = section;

    // Add section header
    if (sectionIndex > 0) addNewPage(); // Start new page for each section
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(capitalizeAllLetters(name), 105, yPosition, { align: 'center' });

    yPosition += 10;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(instructions, 105, yPosition, { align: 'center' });

    yPosition += 15;

    // Render questions and answer lines
    questions.forEach((question) => {
      // Check if we need a new page
      if (yPosition + 20 > pageHeight - margin) {
        addNewPage();
      }

      // Question number and text
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(`${question?.numbering}`, 15, yPosition);

      const questionTextWidth = 160; // Available width for question text
      const questionTextLines = doc.splitTextToSize(
        extractQuestion(question?.description),
        questionTextWidth
      );
      questionTextLines.forEach((line) => {
        // Check if we need a new page for the next line of text
        if (yPosition + 10 > pageHeight - margin) {
          addNewPage();
        }
        doc.text(line, 25, yPosition); // Align the question text
        yPosition += 7;
      });

      // Marks
      doc.setFont('Helvetica', 'italic');
      doc.setTextColor(100);
      doc.text(`(${question?.marks} Marks)`, 170, yPosition - 7);

      yPosition += 5; // Add space after question

      // Dotted answer lines
      for (let i = 0; i < question.marks; i++) {
        if (yPosition + 10 > pageHeight - margin) {
          addNewPage();
        }
        doc.setDrawColor(200);
        doc.setLineDash([2, 2], 0); // Dotted line style
        doc.line(25, yPosition, 190, yPosition); // x1, y1, x2, y2
        yPosition += 10;
      }

      yPosition += 5; // Add space between questions
    });
  });

  // Save the PDF
  doc.save(`${examName}.pdf`);
};

export default generatePDF;
