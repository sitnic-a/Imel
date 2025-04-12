export const displayConfirmationContainer = (element) => {
  // console.log("Element ", element);
  hideOpenedConfirmationContainers();
  element.style.display = "block";
};

export const hideOpenedConfirmationContainers = () => {
  let confirmationContainers = document.querySelectorAll(".confirmation");
  confirmationContainers.forEach((confirmationContainer) => {
    confirmationContainer.style.display = "none";
  });
};

export const closeConfirmModal = (element) => {
  console.log("Element ", element);
  element.style.display = "none";
};
