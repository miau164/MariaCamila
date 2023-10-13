import { randomUUID } from 'node:crypto'
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'
import { text, type RequestHandler } from '@sveltejs/kit'
import { put } from '@vercel/blob'
import sharp from 'sharp'

export const POST: RequestHandler = async ({ fetch, url, request }) => {
  const rotate = url.searchParams.get('rotate')
  const [frame, photo] = await Promise.all([
    fetch(`${url.origin}/frame.webp`).then(response => response.arrayBuffer()),
    request.arrayBuffer()
  ])

  const buffer = await sharp(photo)
    .rotate(Number(rotate))
    .resize({ width: 167, height: 167, fit: 'cover' })
    .toBuffer()
    .then(buffer => {
      return sharp(frame)
        .composite([{ input: buffer, top: 28, left: 167, blend: 'dest-over' }])
        .webp()
        .toBuffer()
    })

  const image = await put(`${randomUUID()}.webp`, buffer, {
    access: 'public',
    token: BLOB_READ_WRITE_TOKEN
  })

  return text(image.url, { status: 201 })
}
