// Import http module
const http = require('http')

// Import file system module
const fs = require('fs')

// Import url module
const url = require('url')

// Import file functions
const { listFiles, readAFile } = require('./utils/filefunctions')

// Create server
const server = http.createServer((request, response) => {
  // Set CORS Headers
  response.setHeader('Access-Control-Allow-Origin', '*') // allow all domains to access this server
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE') // allow these methods to the server
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type') // allow content types 

  // Allow preflight requests
  if (request.method === 'OPTIONS') {
    response.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
    response.end()
    return
  }
  
  if (request.url === '/api/files') {
    fs.readdir('docs', (err, files) => {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      })
      response.write(JSON.stringify(listFiles()))
      response.end()
    })
  } else {
    // Parse url
    const parsedUrl = url.parse(request.url, true)
    const fileName = parsedUrl.query.filename

    if (fileName && request.method === 'GET') {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      })
      response.write(JSON.stringify(readAFile(fileName)))
      response.end()
    } else {
      response.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      response.write('Query string missing...')
      response.end()
    }
  }
})

// Start the server
const port = 4000
server.listen(port, () => {
  console.log(`Server is running on port ${port}...`)
})