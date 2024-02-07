document.addEventListener("DOMContentLoaded", function() {
  const tabLinks = document.querySelectorAll(".tab-links");
  tabLinks.forEach(function(tab) {
    tab.addEventListener("click", function() {
      openTab(this.getAttribute("data-tab"));
    });
  });

  function openTab(tabName) {
    let tabContent = document.querySelectorAll(".tab-content");
    for (let i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
    let tabLinks = document.querySelectorAll(".tab-links");
    for (let i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    document.querySelector('[data-tab="' + tabName + '"]').classList.add("active");
  }
});
