export default function shareOnFacebook(imageUrl: string) {
  const width = 560

  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      `${location.origin}?src=${imageUrl}`
    )}`,
    '_blank',
    `width=${width}, height=600, left=${(innerWidth - width) / 2}`
  )
}
