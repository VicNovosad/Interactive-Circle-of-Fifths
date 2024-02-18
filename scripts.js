document.addEventListener("DOMContentLoaded", function() {
  const tabLinks = document.querySelectorAll(".tab-links");

  updateTabContentsDisplay();

  tabLinks.forEach(function(tab) {
    tab.addEventListener("click", function() {
      tabLinks.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      updateTabContentsDisplay();
    });
  });

  function updateTabContentsDisplay() {
    const tabContents = document.querySelectorAll(".tab-content");

    tabContents.forEach(content => {
      content.style.display = "none";
    });

    const activeTab = document.querySelector(".tab-links.active");
    if (activeTab) {
      const activeTabName = activeTab.getAttribute("data-tab");
      const activeContent = document.getElementById(activeTabName);
      if (activeContent) {
        activeContent.style.display = "block";
      }
    }
  }
});
