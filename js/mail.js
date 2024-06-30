const sliderButton = document.getElementById('sliderButton');
  const sliderContainer = document.getElementById('sliderContainer');
  const sliderText = document.getElementById('sliderText');
  let isDragging = false;
  let startX;
  let buttonStartLeft;

  sliderButton.addEventListener('mousedown', startDragging);
  sliderButton.addEventListener('touchstart', startDragging);

  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);

  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('touchend', stopDragging);

  function startDragging(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    buttonStartLeft = sliderButton.offsetLeft;
    sliderContainer.style.cursor = 'grabbing';
  }

  function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const diff = currentX - startX;
    let newLeft = buttonStartLeft + diff;

    newLeft = Math.max(0, Math.min(newLeft, sliderContainer.offsetWidth - sliderButton.offsetWidth));
    sliderButton.style.left = newLeft + 'px';

    const progress = newLeft / (sliderContainer.offsetWidth - sliderButton.offsetWidth);
    sliderText.style.opacity = 1 - progress;
  }

  function stopDragging() {
    if (!isDragging) return;
    
    isDragging = false;
    sliderContainer.style.cursor = 'pointer';
    const finalPosition = sliderButton.offsetLeft;
    
    if (finalPosition >= sliderContainer.offsetWidth - sliderButton.offsetWidth - 10) {
      window.location.href = 'mailto:harshithharshi253@gmail.com';
    } else {
      sliderButton.style.left = '0px';
      sliderText.style.opacity = 1;
    }
  }