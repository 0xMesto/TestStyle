const fs = require('fs').promises;
const path = require('path');

const DATABASE_FILE = path.join(__dirname, '..', 'submissions.txt');

async function saveFormSubmission(data) {
  const timestamp = new Date().toISOString();
  const formattedData = `${timestamp}\n${JSON.stringify(data)}\n\n`;

  try {
    // Check if the file exists
    await fs.access(DATABASE_FILE);
    console.log('Database file exists');
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, create it
      await fs.writeFile(DATABASE_FILE, '');
      console.log('Database file created');
    } else {
      console.error('Error checking database file:', error);
      throw error;
    }
  }

  try {
    // Append the new submission to the existing file
    await fs.appendFile(DATABASE_FILE, formattedData);
    console.log('Submission saved successfully');
  } catch (error) {
    console.error('Error saving submission:', error);
    throw error;
  }

  // Log the current working directory and the full path of the database file
  console.log('Current working directory:', process.cwd());
  console.log('Full path of database file:', path.resolve(DATABASE_FILE));
}

module.exports = { saveFormSubmission };
