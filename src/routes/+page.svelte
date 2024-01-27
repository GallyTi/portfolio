<script>
  import { onMount } from 'svelte';
  import Background from './animatedBackground.svelte';
  import About from './about-me/aboutMe.svelte';
  import Skills from './skills.svelte';
  import Work from './workExperience.svelte';
  import NotFound from './notFound.svelte';
  
  let isMenuOpen = false; // State for burger menu visibility

  export let menu = 1;
  let menuTitle = 'Home';

  // Function to toggle the burger menu
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  // Function to handle language switching (add your logic)
  function toggleLanguage() {
    // Language switching logic goes here
  }

  onMount(() => {
    // Add a resize event listener
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        isMenuOpen = false;
      }
    };

    // Execute immediately to set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  /**
	 * @param {{ key: string; }} event
	 */
  function handleKeyDown(event) {
    // Check if the Enter key or Space key was pressed
    if (event.key === 'Enter' || event.key === ' ') {
      toggleMenu();
    }
  }
</script>

<div>
  <button class="hamburger" on:click={toggleMenu} on:keydown={handleKeyDown}>
    {#if isMenuOpen}
      ✖
    {:else}
      ☰
    {/if}
  </button>

  <div class="burger-menu" class:open={isMenuOpen}>
    <ul>
      <li><button on:click={() => { menu = 1; toggleMenu(); }}>Home</button></li>
      <li><button on:click={() => { menu = 2; toggleMenu(); }}>Skills</button></li>
      <li><button on:click={() => { menu = 3; toggleMenu(); }}>Work</button></li>
      <li><button on:click={() => { menu = 4; toggleMenu(); }}>About</button></li>
      <li class="language-switch"><button on:click={toggleLanguage}>🌏︎</button></li>
    </ul>
  </div>
  
  <ul id="navBarStyle" class:open={isMenuOpen}>
    <li class="{menu === 1 ? 'active' : ''}">
      <a href="/" on:click|preventDefault={() => (menu = 1)}>Home</a>
    </li>
    <li class="{menu === 2 ? 'active' : ''}">
      <a href="/" on:click|preventDefault={() => (menu = 2)}>Skills</a>
    </li>
    <li class="{menu === 3 ? 'active' : ''}">
      <a href="/" on:click|preventDefault={() => (menu = 3)}>Work</a>
    </li>
    <li class="{menu === 4 ? 'active' : ''}">
      <a href="/" on:click|preventDefault={() => (menu = 4)}>About</a>
    </li>
    <li class="language-switch">
      <button on:click={toggleLanguage}>🌏︎</button>
    </li>
  </ul>

  <div id="menuTitleDisplay">{menuTitle}</div>
  
  {#if menu === 1}
    <div class="centered-div">
      <h1 class="main-text">VITAJTE</h1>
      <br>
      <p class="sub-text highlight">NA STRÁNKE MÔJHO CURRICULUM VITAE</p>
    </div>
    <page />
  {:else if menu === 2}
    <Skills />
  {:else if menu === 3}
    <Work />
  {:else if menu === 4}
    <About />
  {:else}
    <NotFound />
  {/if}

  <Background/>
</div>


<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');

  .centered-div {
    max-width: 100%; /* Ensures the div doesn't exceed the width of the page */
    text-align: center; /* Centers the text inside the div */
    top: 50%; /* Positions the div in the center of the page vertically */
    left: 50%;
    transform: translate(-50%, -50%); /* Adjusts the positioning to be truly centered */
    color: white; /* Sets the text color to white */
    z-index: 4; /* Higher z-index to ensure it's above the gradient */
    position: absolute;
  }

  .main-text {
    font-size: clamp(0.7rem, 5vw + 8vw, 8rem); /* Responsive font size */
    margin-bottom: 0.5rem; /* Spacing between the main text and the subtitle */
    font-family: 'Orbitron', sans-serif;
    font-weight: bolder;
  }

  .sub-text {
    font-size: clamp(0.5rem, 1vw + 1.5vw, 2rem); /* Responsive font size, 1/4 of the main text */
    font-weight: bold;
    font-family: 'Orbitron', sans-serif;
  }

  .burger-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 60%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    transition: right 0.3s ease;
    z-index: 5;
    /* Other styling as needed */
  }

  .burger-menu.open {
    right: 0;
    z-index: 5;
  }

  .burger-menu ul {
    list-style: none;
    padding: 20px;
    z-index: 5;
  }

  .burger-menu ul li {
    background: none;
    border: none;
    color: white; /* Or any other color */
    text-align: left;
    padding: 1rem;
    border: 1px solid #fff;
    margin-bottom: 1rem;
    text-align: center;
    color: white;
    z-index: 5;
    margin-top: 3rem;
    /* Additional styling as needed */
  }

  .language-switch {
    /* Additional styling for language switch */
  }
</style>