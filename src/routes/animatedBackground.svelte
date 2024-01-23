<script>
  import { onMount } from 'svelte';
  import "./app.css";

  export let inverted = false;

  // Function to toggle the color scheme
  function toggleColorScheme() {
    inverted = !inverted;
  }
  
  const chars2 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const chars = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
  
  // @ts-ignore
  const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))],
  // @ts-ignore
      randomString = length => Array.from(Array(length)).map(randomChar).join("");

  // @ts-ignore
  let back;
  // @ts-ignore
  let letters;
  // @ts-ignore
  let animationFrameId = null;
  
  onMount(() => {
    back = document.querySelector(".back");
    // @ts-ignore
    letters = back.querySelector(".back-letters");
  
    // @ts-ignore
    back.addEventListener('mousemove', handleOnMove);
    // @ts-ignore
    back.addEventListener('touchmove', handleOnMove);
  });
  
  // @ts-ignore
  const handleOnMove = (e) => {
    // @ts-ignore
    if (letters) {
      // @ts-ignore
      const rect = back.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      letters.style.setProperty("--x", `${x}px`);
      letters.style.setProperty("--y", `${y}px`);
  
      //letters.innerText = randomString(1500);

      // @ts-ignore
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        // @ts-ignore
        const backArea = back.clientWidth * back.clientHeight;
        const desiredLength = backArea / 100; // Adjust this factor as needed

        // @ts-ignore
        letters.innerText = randomString(Math.floor(desiredLength));
      });
    }
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