<script>
  import ClassicAbout from './ClassicAbout.svelte';
  import ChatbotAbout from './ChatbotAbout.svelte';
  import "../app.css";
  
  let aboutVersion = 'classic'; // 'classic' or 'chatbot'

  /**
	 * @param {string} version
	 */
  function setAboutVersion(version) {
    aboutVersion = version;
  }
</script>

<div class="aboutMeWrapper">
  <div class="innerWrapper">
    <nav class="view-selector">
      <a href="#" class:active={aboutVersion === 'classic'} on:click|preventDefault={() => setAboutVersion('classic')}>Classic View</a>
      <span class="separator"></span>
      <a href="#" class:active={aboutVersion === 'chatbot'} on:click|preventDefault={() => setAboutVersion('chatbot')}>Chatbot View</a>
    </nav>
    {#if aboutVersion === 'classic'}
      <ClassicAbout />
    {:else if aboutVersion === 'chatbot'}
      <ChatbotAbout />
    {/if}
  </div>
</div>


<style>
.view-selector {
  display: flex;
  justify-content: center;
  align-items: center;
}

.view-selector a {
  background-color: transparent;
  border: none;
  color: #f0f0f0;
  font-weight: bold;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  text-decoration: none; /* Remove underline from links */
  transition: background-color 0.3s, color 0.3s;
  z-index: 10;
}

.view-selector a:hover,
.view-selector a:active,
.view-selector a:focus,
.view-selector a.active {
  background-color: #f0f0f0;
  color: #000;
}

.separator {
  margin: 0 15px;
  height: 20px;
  width: 1px;
  background-color: #333;
}

/* Add a class for active state and style it */
.active {
  background-color: #f0f0f0; /* Active state background */
  color: #000; /* Active state text color */
}

.aboutMeWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%; /* Adjust the width as needed */
  height: 70%; /* Adjust the height as needed */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.4); /* White with 40% opacity */
  border-radius: 15px; /* Rounded corners */
  padding: 20px; /* Spacing inside the div */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: Adds a subtle shadow */
  overflow: auto; /* In case the content overflows */
  z-index: 2; /* Ensure it's above other content */
}

@media(max-width: 600px) {
  .aboutMeWrapper {
    width: 80%;
    height: 80%;
  }
}

.innerWrapper {
  background-color: #f0f0f0; /* Grayish background */
  border-radius: 10px; /* Optional: Adds rounded corners */
  width: 100%;
  height: 100%;
  padding: 20px; /* Spacing inside the inner wrapper */
}
</style>
