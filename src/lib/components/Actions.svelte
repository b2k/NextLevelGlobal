<script lang="ts">
  type ActionVariant =
    | 'outline-light'
    | 'outline-dark'
    | 'light'
    | 'dark';

  type Action = {
    href: string;
    text: string;
    variant?: ActionVariant;
    target?: string;
    rel?: string;
  };

  const {
    actions = [],
    align = 'center'
  }: {
    actions?: Action[];
    align?: 'start' | 'center' | 'end';
  } = $props();
</script>

<nav class="actions actions--{align} mb-4">
  {#each actions as action}
    <a
      href={action.href}
      target={action.target}
      rel={action.rel}
      class="action action--{action.variant ?? 'outline-light'}"
    >
      {action.text}
    </a>
  {/each}
</nav>

<style>
  .actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .actions--start { justify-content: flex-start; }
  .actions--center { justify-content: center; }
  .actions--end { justify-content: flex-end; }

  .action {
    padding: 0.6rem 1.25rem;
    font-weight: 600;
    text-decoration: none;
    /*border-radius: 999px; -- old website has square buttons */
    letter-spacing: 0.04em;
    transition:
      background-color 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease;
    white-space: nowrap;
  }

  /* ───────────── Variants ───────────── */

  /* Light outline (hero / dark bg) */
  .action--outline-light {
    color: var(--very-light);
    border: 1px solid var(--very-light);
    background: transparent;
  }

  .action--outline-light:hover {
    background: var(--very-light);
    color: var(--very-dark);
  }

  /* Dark outline (light sections) */
  .action--outline-dark {
    color: var(--very-dark);
    border: 1px solid var(--very-dark);
    background: transparent;
  }

  .action--outline-dark:hover {
    background: var(--very-dark);
    color: var(--very-light);
  }

  /* Solid light */
  .action--light {
    background: var(--very-light);
    color: var(--very-dark);
  }

  .action--light:hover {
    background: rgba(255, 255, 255, 1);
  }

  /* Solid dark */
  .action--dark {
    background: var(--very-dark);
    color: var(--very-light);
  }

  .action--dark:hover {
    background: rgba(0, 0, 0, 1);
  }
</style>
