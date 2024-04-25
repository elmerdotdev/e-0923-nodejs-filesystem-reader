const filesList = document.querySelector('.files-list')
const fileContent = document.querySelector('.file-content')

// Get files from API
const getFiles = async () => {
  const res = await fetch(`http://localhost:4000/api/files`)
  const data = await res.json()
  return data
}

// Read file from API
const readFile = async (filename) => {
  const res = await fetch (`http://localhost:4000/?filename=${filename}`)
  const data = await res.json()
  fileContent.innerHTML = data
}

// Build file list items
const buildList = async () => {
  const files = await getFiles()

  files.forEach(file => {
    // Create li
    const li = document.createElement('li')
    li.classList.add('list-group-item')

    // Create span inside li
    const fileSpan = document.createElement('span')
    fileSpan.textContent = file
    fileSpan.classList.add('file-name')
    fileSpan.addEventListener('click', () => {
      readFile(file)
    })

    li.appendChild(fileSpan)
    filesList.appendChild(li)
  })
}

// Run build list
buildList()