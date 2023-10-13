export default async function createImage(file: File, rotate = 0) {
  const response = await fetch(`/api/image?rotate=${rotate}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/octet-stream' },
    body: await file.arrayBuffer()
  })

  const url = await response.text()

  return url
}
