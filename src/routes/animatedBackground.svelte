<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import "./app.css";

  export let inverted = false;

  let mouseInactivityTimer;
  let pointGenerationInterval;
  let back;
  let letters;
  let animationFrameId = null;
  let ripples = [];
  let isFirstMouseMove = true;

  let lastMousePosition = { x: null, y: null }; // Start with undefined mouse position

  const randomChar = () => chars[Math.floor(Math.random() * chars.length)],
        randomString = length => Array.from({length}, randomChar).join("");

  const chars = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

  onMount(() => {
    back = document.querySelector(".back");
    letters = back.querySelector(".back-letters");
    letters.style.webkitMaskImage = 'none';
    back.addEventListener('mousemove', handleOnMove);
    back.addEventListener('touchmove', handleOnMove);
    
    // Listen for visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    setTimeout(() => {
      if (document.visibilityState === 'visible') {
        startGeneratingRandomPoints();
      }
    }, 13000);
  });

  // Handle visibility change
  function handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      stopGeneratingRandomPoints();
    } else if (document.visibilityState === 'visible') {
      // Optionally resume generating points here if needed when the user comes back
      // This could be based on additional conditions, like if user interaction was detected before
    }
  }

  function startGeneratingRandomPoints() {
    if (!pointGenerationInterval) {
      pointGenerationInterval = setInterval(generateRandomPoints, 200);
    }
  }

  function stopGeneratingRandomPoints() {
    clearInterval(pointGenerationInterval);
    pointGenerationInterval = null;
  }

  function generateRandomPoints() {
    const rect = back.getBoundingClientRect();
    const points = [];
    for (let i = 0; i < 2; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      points.push({x, y});
    }
    animateRipple(points[0]);
  }

  function resetInactivityTimer() {
    clearTimeout(mouseInactivityTimer);
    mouseInactivityTimer = setTimeout(() => {
      if (ripples.length === 0) {
        startGeneratingRandomPoints();
      }
    }, 3000);
  }

  function animateRipple(point) {
    const numberOfRipples = Math.floor(Math.random() * (5 - 2 + 1)) + 2; // Random number between 2 and 5
    const baseDelayBetweenRipples = 500; // Base delay, can adjust if needed
    
    for (let i = 0; i < numberOfRipples; i++) {
      const duration = 2000 + Math.random() * 1000; // Longer, varying duration for each ripple
      const maxRadius = 100 + Math.random() * 50; // Varying sizes for realism

      setTimeout(() => {
        const ripple = {
          point,
          maxRadius: maxRadius,
          duration: duration,
          startTime: performance.now(),
          currentRadius: 0
        };
        ripples.push(ripple);
        manageRipples();
      }, i * baseDelayBetweenRipples);
    }
  }

  function manageRipples() {
    const activeRipples = [];
    ripples.forEach(ripple => {
      const elapsedTime = performance.now() - ripple.startTime;
      const progress = elapsedTime / ripple.duration;
      if (progress < 1) {
        ripple.currentRadius = progress * ripple.maxRadius;
        activeRipples.push(ripple);
      }
    });

    ripples = activeRipples;
    updateMaskForRipples();

    if (ripples.length > 0) {
      requestAnimationFrame(manageRipples);
    }
  }

  function updateMaskForRipples() {
    // Define the circle size for the mouse move mask to ensure it doesn't stretch
    const circleSize = '5rem'; // Adjust this size as needed to match your design
    // Generate the mouse move mask with a fixed size
    const mouseMask = `radial-gradient(circle ${circleSize} at ${lastMousePosition.x}px ${lastMousePosition.y}px, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0.25), transparent)`;

    // Generate the ripple masks
    const rippleMasks = ripples.map(ripple => {
      const {point, currentRadius} = ripple;
      return `radial-gradient(circle at ${point.x}px ${point.y}px, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) ${currentRadius * 0.5}px, transparent ${currentRadius}px)`;
    }).join(', ');

    // Combine the mouse move mask with the ripple masks
    const combinedMasks = `${mouseMask}, ${rippleMasks}`;
    letters.style.webkitMaskImage = combinedMasks;
  }

  const handleOnMove = (e) => {
    const rect = back.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isFirstMouseMove) {
      isFirstMouseMove = false;
    }

    lastMousePosition = { x, y };

    updateMaskForMultiplePoints([{x, y}]);
    stopGeneratingRandomPoints();
    clearTimeout(mouseInactivityTimer);
    resetInactivityTimer();

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(() => {
      const backArea = back.clientWidth * back.clientHeight;
      letters.innerText = randomString(Math.floor(backArea / 100));
    });
  };

  function updateMaskForMultiplePoints(points) {
    const circleSize = '8rem';
    const maskImage = points.map(point => {
      return `radial-gradient(circle ${circleSize} at ${point.x}px ${point.y}px, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0.25), transparent)`;
    }).join(', ');

    letters.style.webkitMaskImage = maskImage;
    letters.style.opacity = '1';
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
      mask-image: radial-gradient(
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
  
    @keyframes expandAndFade {
      0% {
        transform: scale(0.5);
        opacity: 1;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.75;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }  
  </style>