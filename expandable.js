document.addEventListener("DOMContentLoaded", function () {
    const expandableItems = document.querySelectorAll(".expandable");
  
    expandableItems.forEach((item) => {
      item.addEventListener("click", function () {
        this.classList.toggle("active");
  
        expandableItems.forEach((sibling) => {
          if (sibling !== this) {
            sibling.classList.remove("active");
          }
        });
      });
    });
  
    const formElements = document.querySelectorAll(".expandable input, .expandable button");
    formElements.forEach((element) => {
      element.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    });
  });