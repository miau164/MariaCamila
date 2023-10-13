import placeholder from '$lib/assets/placeholder.webp'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
  const imageUrl = url.searchParams.get('src')

  if (!imageUrl) return { imageUrl: url.origin + placeholder }

  return { imageUrl }
}
