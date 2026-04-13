let isActive = false;
function handleToggleClick() {
  isActive = !isActive;
  const toggleButton = document.getElementById("toggle");
  const toggleHandle = document.getElementById("toggle-handle");
  toggleButton.classList.toggle("active", isActive);
  toggleHandle.classList.toggle("active", isActive);
}
