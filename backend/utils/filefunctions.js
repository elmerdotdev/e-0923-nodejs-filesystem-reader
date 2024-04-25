const fs = require('fs')
const path = require('path')

const targetDirectory = 'docs'
const docsFolderPath = path.join(__dirname, '../', targetDirectory)

// List directory files
const listFiles = () => {
  try {
    const files = fs.readdirSync(docsFolderPath)
    return files
  } catch (err) {
    console.log('Error reading directory', err)
  }
}

// Read file content
const readAFile = (filename) => {
  try {
    const filePath = path.join(docsFolderPath, filename)
    const data = fs.readFileSync(filePath, 'utf8')
    return data
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  listFiles,
  readAFile
}