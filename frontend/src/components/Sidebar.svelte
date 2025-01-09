<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let links: {
    href: string;
    text: string;
    icon: string;
    submenu?: {
      href: string;
      text: string;
      icon: string;
    }[];
  }[] = [];

  //breadcrumb
  const dispatch = createEventDispatcher();

  function handleClick(link: {
    href: string;
    text: string;
    icon: string;
    submenu?: { href: string; text: string; icon: string }[];
  }) {
    dispatch("menuClick", { href: link.href, text: link.text });
  }

  //login
  let isLoggedIn = false;

  function handleLogin() {
    isLoggedIn = !isLoggedIn;
    dispatch("loginToggle", { isLoggedIn });
  }
</script>

<aside aria-label="Sidebar Navigation" class="sidebar">
  <ul class="menu">
    {#each links as link (link.href)}
      {#if link.text == "<hr>"}
        <hr class="mt-4 mb-4" />
      {:else}
        <li>
          <a
            href={link.href}
            class="menu-item"
            on:click={() => handleClick(link)}
          >
            <i class={`icon ${link.icon}`}></i>
            {link.text}
          </a>
          {#if link.submenu}
            <ul class="submenu">
              {#each link.submenu as sublink (sublink.href)}
                <li>
                  <a
                    href={sublink.href}
                    class="submenu-item"
                    on:click={() => handleClick(sublink)}
                  >
                    <i class={`icon ${sublink.icon}`}></i>
                    {sublink.text}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/if}
    {/each}
  </ul>

  <ul class="menu login">
    <hr />
    <li>
      <button class="menu-item" on:click={handleLogin}>
        <i class="icon fas fa-sign-in-alt"></i>
        {isLoggedIn ? "ออกจากระบบ" : "เข้าสู่ระบบ"}
      </button>
    </li>
  </ul>
</aside>

<style>
  .sidebar {
    background-color: #f4f4f4;
    padding: 1rem;
    width: auto;
    display: flex;
    flex-direction: column;
    /* height: 100vh; */
    justify-content: space-between;
  }

  .menu {
    list-style: none;
    padding: 0.5rem;
  }

  .menu.login {
    margin-top: auto;
    margin-bottom: 2rem;
  }

  .menu-item,
  .submenu-item {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.25rem;
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    font-weight: 500;
    /* transition: background-color 0.3s, color 0.3s; */
    margin: 0.2rem;
  }

  .menu-item:hover,
  .submenu-item:hover {
    background-color: #8d8d8d;
    color: #ffffff;
  }

  .menu-item-hr {
  }

  .icon {
    margin-right: 1rem;
    font-size: 1.25rem;
  }

  .submenu {
    margin-left: 1rem;
    margin-top: 0.5rem;
    list-style: none;
    padding: 0;
  }

  .active {
    background-color: #8d8d8d;
    color: #ffffff;
  }
</style>
