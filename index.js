
const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('pdfkit');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/generate-pdf', async (req, res) => {
  const { name, email, message } = req.body;

  const doc = new pdf.Document();
  doc.pipe(fs.createWriteStream('public/output.pdf'));

  doc.fontSize(20).text('Contact Form Submission').moveDown();
  doc.fontSize(12).text(`Name: ${name}`).moveDown();
  doc.fontSize(12).text(`Email: ${email}`).moveDown();
  doc.fontSize(12).text(`Message: ${message}`).moveDown();

  doc.end();

  res.status(200).json({ message: 'PDF generated successfully' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});