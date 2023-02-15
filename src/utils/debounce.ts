let debounceTimer: number;

function debounce(callback: () => void, time: number) {
  clearTimeout(debounceTimer);

  debounceTimer = window.setTimeout(callback, time);
}

export default debounce;
