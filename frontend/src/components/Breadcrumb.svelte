<script lang="ts">
  export let links: {
    text: string;
    href: string;
  }[] = [];
</script>

<div class="breadcrumbs text-sm">
  <ul>
    {#each links as link}
      {#if link.href.includes("services")}
        <li><a href={"/services"}>บริการ</a></li>
      {/if}
      {#if link.href.includes("considerations")}
        <li><a href={"/considerations"}>การพิจารณา</a></li>
      {/if}
      <li><span class="badge badge-secondary badge-outline">{link.text}</span></li>
    {/each}
  </ul>
</div>
