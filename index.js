function getmap() {
  const destination = document.querySelector("#curr");
  const map1 = document.getElementsByClassName("map");
  const location = "Charbagh";
  let haz = true;
  let Char = true;

  if (destination.value == "Hazratganj") {
    haz = true;
  } else {
    Char = true;
  }
  haz ? map1.classList.add(".map1") : "";
  Char ? map1.classList.add(".map1") : "";
}
