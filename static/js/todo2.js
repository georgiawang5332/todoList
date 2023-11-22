onload = todoMain;

function todoMain(){
  let inputElem,
      ulElem;

  getElements();
  addListeners();

  function getElements(){
    inputElem = document.getElementsByTagName("input")[0];
    ulElem = document.getElementsByTagName("ul")[0];
  }

  function addListeners(){
    inputElem.addEventListener("change", onChange, false);
  }

  function onChange(event){
    let inputValue = inputElem.value;
    //ulElem.innerHTML += `<li>${inputValue}</li>`;
    inputElem.value = "";
    // console.log(inputElem.value)


    let liElem = document.createElement("li");
    liElem.innerText = inputValue;
    // liElem.innerText = inputValue + " <span class='material-icon'>delete</span>";

    let spanElem = document.createElement("span");
    spanElem.innerText = "delete";
    spanElem.className = "material-icons";
    spanElem.addEventListener("click", deleteItem, false);

    ulElem.appendChild(liElem);
    liElem.appendChild(spanElem);

    function deleteItem(){
      liElem.remove();
    }
  }
}