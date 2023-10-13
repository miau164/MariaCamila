<script lang="ts">
  import '../app.postcss'
  import createImage from '$lib/utils/createImage'
  import shareOnFacebook from '$lib/utils/shareOnFacebook'
  import placeholder from '$lib/assets/placeholder.webp'
  import iconRotate from '$lib/assets/icon-rotate.png'
  import type { ChangeEventHandler } from 'svelte/elements'
  import type { PageData } from './$types'

  export let data: PageData

  let photo: File
  let rotate = 0
  let isLoading = false

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const file = event.currentTarget.files?.[0]

    if (file && file.type.startsWith('image/')) photo = file
  }

  const handleClick = async () => {
    isLoading = true

    const image = await createImage(photo, rotate)

    shareOnFacebook(image)

    isLoading = false
  }
</script>

<svelte:head>
  <title>Maria Camila | Alcaldesa 2024 - 2027</title>
  <meta
    property="og:title"
    content="Apoya a Maria Camila Dándole ¡ CLICK AQUÍ y COMPARTIENDO !"
  />
  <meta
    property="og:description"
    content="Yo voto Maria Camila alcaldesa de Guarne 2024-2027"
  />
  <meta property="og:image" content={data.imageUrl} />
  <meta property="og:image:width" content="500" />
  <meta property="og:image:height" content="261" />
  <meta property="og:locale" content="es_CO" />
</svelte:head>

<main class="grid min-h-[100svh] place-items-center p-6">
  <section class="flex flex-col items-center">
    <div class="relative">
      <figure class="mask mask-squircle">
        <img
          class="aspect-square w-[261px] object-cover"
          src={photo ? '/frame.webp' : placeholder}
          alt=""
          width="500"
          height="261"
        />
      </figure>
      {#if photo}
        <img
          class="absolute inset-x-0 top-[28px] -z-[1] mx-auto aspect-square
            w-[167px] object-cover"
          style="rotate: {rotate}deg"
          src={URL.createObjectURL(photo)}
          alt=""
        />
        <button
          class="btn btn-circle absolute bottom-0 right-0"
          on:click={() => (rotate = rotate === 270 ? 0 : rotate + 90)}
        >
          <img src={iconRotate} alt="Rotate" width="32" height="32" />
        </button>
      {/if}
    </div>
    <div class="mb-8 mt-7 flex flex-wrap justify-center gap-4">
      <label class="btn" class:btn-disabled={isLoading}>
        Seleccionar imagén
        <input
          type="file"
          accept="image/*"
          disabled={isLoading}
          hidden
          on:change={handleChange}
        />
      </label>
      <label class="btn xl:hidden" class:btn-disabled={isLoading}>
        Tomar foto
        <input
          type="file"
          capture="user"
          accept="image/*"
          disabled={isLoading}
          hidden
          on:change={handleChange}
        />
      </label>
    </div>
    <div class="flex flex-wrap justify-center gap-4">
      <button
        class="btn btn-info btn-outline"
        disabled={!photo || isLoading}
        on:click={handleClick}
      >
        {#if isLoading}
          <span class="loading loading-spinner" />
        {/if}
        Compartir en Facebook
      </button>
      <a
        class="btn btn-success btn-outline"
        href="https://chat.whatsapp.com/F3UQxS9hi5q6jbp3E7Sdfr"
        target="_blank"
        rel="noreferrer"
      >
        ¡Unete al Grupo de WhatsApp!
      </a>
    </div>
  </section>
</main>
