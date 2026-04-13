const makeFirstTabActive = () => {
  const tab1 = document.getElementById("tab1");
  tab1.classList.add("active");
};

// const addTabClickListeners = () => {
//   const tabs = document.querySelectorAll(".tab");

//   tabs.forEach((tab, i = 0) => {
//     tab.addEventListener("click", () => {
//       const activeTab = document.querySelector(".tab.active");
//       const contentEl = document.querySelector(".tab-content");

//       if (activeTab) activeTab.classList.remove("active");

//       tab.classList.add("active");
//       contentEl.innerText = `Content for Tab ${i + 1}`;
//     });
//   });
// };

const handelTabClick = (tab) => {
  console.log(tab);
  const activeTab = document.querySelector(".tab.active");
  const contentEl = document.querySelector(".tab-content");

  if (activeTab) activeTab.classList.remove("active");

  document.getElementById(tab).classList.add("active");
  contentEl.innerText = `Content for ${tab}`;
};

makeFirstTabActive();
// addTabClickListeners();
