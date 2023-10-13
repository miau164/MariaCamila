<script lang="ts">
  import '../app.postcss'
  import placeholder from '$lib/assets/placeholder.webp'
  import createImage from '$lib/utils/createImage'
  import shareOnFacebook from '$lib/utils/shareOnFacebook'
  import type { ChangeEventHandler } from 'svelte/elements'
  import type { PageData } from './$types'

  export let data: PageData

  let imageUrl: string
  let isLoading = false

  const handleChange: ChangeEventHandler<HTMLInputElement> = async event => {
    const file = event.currentTarget.files?.[0]

    if (file && file.type.startsWith('image/')) {
      isLoading = true
      imageUrl = await createImage(file)
    }
  }
</script>

<svelte:head>
  <title>Maria Camila | Alcaldesa 2024 - 2027</title>
  <meta property="og:title" content="Apoya a Maria Camila Dándole ¡ CLICK AQUÍ y COMPARTIENDO !" />
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
    <figure
      class="mask mask-squircle"
      class:animate-pulse={isLoading}
      class:opacity-80={isLoading}
    >
      <img
        class="object-cover"
        src={imageUrl || placeholder}
        alt=""
        width="500"
        height="261"
        on:load={() => (isLoading = false)}
      />
    </figure>
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
        disabled={!imageUrl || isLoading}
        on:click={() => shareOnFacebook(imageUrl)}
      >
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
