<script>
  import { onMount } from 'svelte';
  import "./app.css";

  export let inverted = false;

  // @ts-ignore
  let mouseInactivityTimer;
  // @ts-ignore
  let pointGenerationInterval;
  // @ts-ignore
  let back;
  // @ts-ignore
  let letters;
  // @ts-ignore
  let animationFrameId = null;

  const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))],
        // @ts-ignore
        randomString = length => Array.from({length}, randomChar).join("");

  const chars = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

  onMount(() => {
    back = document.querySelector(".back");
    // @ts-ignore
    letters = back.querySelector(".back-letters");

    // @ts-ignore
    back.addEventListener('mousemove', handleOnMove);
    // @ts-ignore
    back.addEventListener('touchmove', handleOnMove);

    startGeneratingRandomPoints();
  });

  function startGeneratingRandomPoints() {
    pointGenerationInterval = setInterval(generateRandomPoints, 500);
  }

  function stopGeneratingRandomPoints() {
    // @ts-ignore
    clearInterval(pointGenerationInterval);
  }

  function generateRandomPoints() {
    // @ts-ignore
    const rect = back.getBoundingClientRect();
    const points = [];
    for (let i = 0; i < 4; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      points.push({x, y});
    }
    updateMaskForMultiplePoints(points);
  }

  function resetInactivityTimer() {
    // @ts-ignore
    clearTimeout(mouseInactivityTimer);
    mouseInactivityTimer = setTimeout(() => {
      startGeneratingRandomPoints();
    }, 3000); // Set to 3 seconds of inactivity
  }

  // @ts-ignore
  function updateMaskForMultiplePoints(points) {
    const circleSize = '8rem';
    // @ts-ignore
    const maskImage = points.map(point => {
      return `radial-gradient(circle ${circleSize} at ${point.x}px ${point.y}px, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0.25), transparent)`;
    }).join(', ');

    // @ts-ignore
    letters.style.webkitMaskImage = maskImage;
    // @ts-ignore
    letters.style.opacity = '1';
  }

  // @ts-ignore
  const handleOnMove = (e) => {
    // @ts-ignore
    const rect = back.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updateMaskForMultiplePoints([{x, y}]);

    stopGeneratingRandomPoints(); // Stop the point generation as the mouse moves
    resetInactivityTimer(); // Reset the timer on every mouse move

    // @ts-ignore
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(() => {
      // @ts-ignore
      const backArea = back.clientWidth * back.clientHeight;
      const desiredLength = backArea / 100;
      // @ts-ignore
      letters.innerText = randomString(Math.floor(desiredLength));
    });
  }
</script>

<body>
  <div class="back-track">
    <div class="back-wrapper">
      <div class={inverted ? 'back inverted' : 'back'}>
        <div class="back-gradient"></div>
        <div class="back-letters"></div>
      </div>
      <div class="back-corners">
        <span class="back-corner"></span>
        <span class="back-corner"></span>
        <span class="back-corner"></span>
        <span class="back-corner"></span>
      </div>
    </div>
  </div>
</body>

<style>
  .back-track {
    max-height: calc(100vh - 4rem);
    width: 100vw;
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box; /* Include margin in width/height calculations */
  }

  .back-wrapper {
    width: 100%;
    position: relative;
  }

  .back {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--back-height);
    aspect-ratio: var(--back-width) / var(--back-height);
    position: relative;
    margin: 1rem;
    border-radius: 2rem;
    overflow: hidden;
    cursor: pointer;
  }

  .back-gradient {
    height: 100%;
    width: 100%;
    position: absolute;
    background: linear-gradient(-45deg, #aa076b, #61045f);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    mix-blend-mode: darken; 
    pointer-events: none;
    z-index: 2;
  }

  .back-letters {
    --x: 0px;
    --y: 0px;
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    width: 100%;
    color: white;
    /*font-size: var(clamp(-font-size));*/
    font-size: clamp(0.6rem, 0.7vw + 1vw, 0.9rem);
    font-weight: 500;
    word-wrap: break-word;
    opacity: 0;
    transition: opacity 400ms;
    -webkit-mask-image: radial-gradient(
      calc(var(--back-height) * 0.25) circle at var(--x) var(--y), 
      rgb(255 255 255) 20%, 
      rgb(255 255 255 / 25%), 
      transparent
    );
    scale: 1.03;
    z-index: 1;
  }

  .back:hover .back-letters {
    opacity: 1;
  }

  @media(max-width: 600px) {
    :root {
      --back-width: 100vw; /* New width for smaller screens */
      --back-height: 98vh;
    }
    
    .back {
      border-radius: 1rem;
    }
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

</style>