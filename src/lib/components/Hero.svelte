<script lang="ts">
  import { page } from '$app/state';

  const { 
    height = 'auto',
    overlay = true,
    align = 'center', // center | start | end
    children
  } = $props();  
  
const routeName = $derived.by(() => {
    // 1. Parameterized routes (/pages/[slug])
    if (page.params?.slug) {
      return page.params.slug;
    }

    // 2. Root
    const id = page.route.id;
    if (!id || id === '/') {
      return 'home';
    }

    // 3. Static routes (/about, /missions)
    return id
      .replace(/^\/+/, '')
      .replace(/\[.*?\]/g, '');
  });

  const bgUrl = $derived.by(() => {
    debugger;
    return routeName
      ? `url('/assets/${routeName}/hero.jpg')`
      : undefined
  });

    const alignStyles = $derived.by(() => {
    switch (align) {
        case 'start':
        return {
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        };

        case 'end':
        return {
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
        };

        case 'center':
        default:
        return {
            alignItems: 'center',
            justifyContent: 'center'
        };
    }
    });    

</script>

<section
  class="hero d-flex"
  style:min-height={height}
  style:background-image={bgUrl}
  style:align-items={alignStyles.alignItems}
  style:justify-content={alignStyles.justifyContent}
>  
  {#if overlay}
    <div class="hero-overlay"></div>
  {/if}

    <div class="position-relative z-1 hero-inner"
         style:align-items={alignStyles.alignItems}
         style:justify-content={alignStyles.justifyContent}>
        {@render children()}
  </div>
</section>

<style>
  .hero {
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 72px;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      rgba(0, 0, 0, 0.45),
      rgba(0, 0, 0, 0.45)
    );
    z-index: 0;
  }
  .hero-inner {
    display: flex;
    flex-direction: column;
    align-items: center;      /* horizontal */
    justify-content: center;  /* vertical */
    text-align: center;
    height: 100%;
    padding: 4rem 1rem;
  }

  .z-1 {
    z-index: 1;
  }
  </style>
