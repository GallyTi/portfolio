<script>
  import Background from './animatedBackground.svelte';
  import About from './about-me/aboutMe.svelte';
  import Skills from './skills.svelte';
  import Work from './workExperience.svelte';
  import NotFound from './notFound.svelte';
  import "./app.css";

  let inverted = false;

  export let menu = 1;
  let menuTitle = 'Home'; // Variable to store the current menu title
  
  // Function to toggle the color scheme
  function toggleColorScheme() {
    inverted = !inverted;
  }
</script>

<div>
  <ul id="navBarStyle">
    <li class="{menu === 1 ? 'active' : ''}"><a href="/" on:click|preventDefault={() => (menu = 1)}>Home</a></li>
    <li class="{menu === 2 ? 'active' : ''}"><a href="/" on:click|preventDefault={() => (menu = 2)}>Skills</a></li>
    <li class="{menu === 3 ? 'active' : ''}"><a href="/" on:click|preventDefault={() => (menu = 3)}>Work</a></li>
    <li class="{menu === 4 ? 'active' : ''}"><a href="/" on:click|preventDefault={() => (menu = 4)}>About</a></li>
    <li class="dropdown">
      <a href="#" class="dropdown-button">⚙️</a> <!-- Example: Gear icon as button -->
      <div class="dropdown-content">
          <a href="#">SLOVAK</a>
          <a href="#">ENGLISH</a>
          <!-- Add more languages as needed -->
      </div>
    </li>
  </ul>

  <div id="menuTitleDisplay">{menuTitle}</div>
    {#if menu === 1}
      <page />
    {:else if menu === 2}
      <Skills />
    {:else if menu === 3}
      <Work />
    {:else if menu === 4}
      <About />
    {:else}
      <h1>
        <NotFound />
      </h1>
    {/if}

  <Background {inverted} />
</div>