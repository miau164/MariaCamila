export default async function createImage(file: File) {
  const response = await fetch('/api/image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/octet-stream' },
    body: await file.arrayBuffer()
  })

  const url = await response.text()

  return url
}
