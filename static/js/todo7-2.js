onload = todoMain;

function todoMain(){
    const DEFAULT_OPTION = "選擇類別";
    let inputElem,
        inputElem2,
        button,
        ulElem,
        selectElem;
        todoList = []

    // todoList = localStorage.setItem("todoList", todoList);
    // todoList = localStorage.getItem(todoList);
    // console.log(todoList);

    getElements();
    addListeners();
    load();
    renderRows();

    function getElements(){
        inputElem = document.getElementsByTagName("input")[0];
        inputElem2 = document.getElementsByTagName("input")[1];
        button = document.getElementById("addBtn");
        ulElem = document.getElementsByTagName("ul")[0];

        selectElem = document.getElementById("categoryFilter");
    }

    function addListeners(){
        button.addEventListener("click", addEntry, false);
        selectElem.addEventListener("change", filterEntries, false);
    }

    function addEntry(event){ //add新增Entry條目
        let inputValue = inputElem.value;
        inputElem.value = "";
        let inputValue2 = inputElem2.value;
        inputElem2.value = "";

        rendowRow(inputValue, inputValue2);
        todoList.push(inputValue, inputValue2);
        save();
        updateSelections();
    }

    function filterEntries(){
        console.log('filterEntries running/過濾條目正在運行');

        let selection = selectElem.value;
        if(selection == DEFAULT_OPTION){
            let rows = document.getElementsByTagName("tr");
            Array.from(rows).forEach((row)=>{
                row.style.display = ""
            });
        }else{
            let rows = document.getElementsByTagName("tr");
            console.log(rows)
            Array.from(rows).forEach((row, index)=>{
                //因為我標題會因為點擊 work 選項他會display:none;他也是t選項 所以會因為work消失
                if(index==0){
                    return;
                }

                let category = row.getElementsByTagName("td")[2].innerText;
                if(category == selectElem.value){
                    row.style.display = "";
                }else{
                    row.style.display = "none";
                }
            }); //數組.原型.對於每個 ()
        }

    }

    function updateSelections(){
        let options = [];
        let rows = document.getElementsByTagName("tr");

        Array.from(rows).forEach((row, index)=>{
            //因為我標題會因為點擊 work 選項他會display:none;他也是t選項 所以會因為work消失
            if(index==0){
                return;
            }

            let category = row.getElementsByTagName("td")[2].innerText;
            // if(!options.includes(category)){
            options.push(category);
            // }

        }); //數組.原型.對於每個 ()
        console.log(options);
        let optionsSet = new Set(options);
        console.log(optionsSet);

        //empty the select options/清空選擇的選項
        selectElem.innerHTML = "";

        //todo6.js (因為我之前option的空值 不見了不能全覽td，所以建議我再次寫一遍這三行)
        let newOptionElem = document.createElement('option');
        newOptionElem.value = DEFAULT_OPTION;
        newOptionElem.innerText = DEFAULT_OPTION;
        selectElem.appendChild(newOptionElem);

        // options.forEach((option)=>{
        for(let option of optionsSet){
            //todo6.js
            let newOptionElem = document.createElement('option');
            newOptionElem.value = option;
            newOptionElem.innerText = option;
            selectElem.appendChild(newOptionElem);
        }

    }

    function save(){
        let stringified = JSON.stringify(todoList);
        localStorage.setItem("todoList", stringified);
    }
    function load(){
        let retrieved = localStorage.getItem("todoList");
        todoList = JSON.parse(retrieved)
        console.log(typeof todoList)
        if (todoList == null)
            todoList = [];
    }
    function renderRows(){
        todoList.forEach( todo =>{
            rendowRow(todo, null);
        })
    }
    function rendowRow(inputValue, inputValue2){
        console.log("test in here!!! ")

        // add a new row
        let table = document.getElementById("todoTable");
        let trElem = document.createElement("tr");
        table.appendChild(trElem);

        // checkbox cell
        let checkboxElem = document.createElement("input");
        checkboxElem.type = "checkbox";
        checkboxElem.addEventListener("click", done, false);
        let tdElem1 = document.createElement("td");
        tdElem1.appendChild(checkboxElem);
        trElem.appendChild(tdElem1);

        // to-do cell
        let tdElem2 = document.createElement("td");
        tdElem2.innerText = inputValue;
        trElem.appendChild(tdElem2);

        // category cell
        let tdElem3 = document.createElement("td");
        tdElem3.innerText = inputValue2;
        trElem.appendChild(tdElem3);

        // delete cell
        let spanElem = document.createElement("span");
        spanElem.innerText = "delete";
        spanElem.className = "material-icons";
        spanElem.addEventListener("clickaddEntry", deleteItem, false);
        let tdElem4 = document.createElement("td");
        tdElem4.appendChild(spanElem);
        trElem.appendChild(tdElem4);
    }
    function deleteItem(){
        trElem.remove();
        updateSelections()
    }
    function done(){
        trElem.classList.toggle("strike");
    }
}