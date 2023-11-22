onload = todoMain;

function todoMain(){
    const DEFAULT_OPTION = "選擇類別";
    let inputElem,
        inputElem2,
        button,
        ulElem,
        selectElem,
        todoList = [];

    getElements();
    addListeners();
    load();
    renderRows();
    rendowRow();//這為何沒有出現在影片上?
    updateSelectOptions();//選擇類別

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

        /////////////////取走放入 rendowRow(); 函數//////////////////////
        let obj = {
            todo: inputValue,
            category: inputValue2,
        };
        rendowRow(obj);
        // todoList.push(inputValue, inputValue2)
        todoList.push(obj); //0:{todo: "E todo", category: "E todo"}

        save();
        updateSelectOptions();
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

    function updateSelectOptions(){
        let options = [];
        let rows = document.getElementsByTagName("tr");

        Array.from(rows).forEach((row, index)=>{
            if(index==0){
                return;
            }
            let category = row.getElementsByTagName("td")[2].innerText;
            options.push(category);
        });
        console.log(options)
        let optionsSet = new Set(options);
        console.log(optionsSet);

        //options the select  options
        selectElem.innerText = "";
        //下拉式選項多一個空值""
        let newOptionElem = document.createElement('option');
        newOptionElem.value = DEFAULT_OPTION;
        newOptionElem.innerText = DEFAULT_OPTION;
        selectElem.appendChild(newOptionElem);

        // options.forEach((option)=>{
        for(let option of optionsSet){
            let newOptionElem = document.createElement('option');
            newOptionElem.value = option;
            newOptionElem.innerText = option;
            selectElem.appendChild(newOptionElem);
        // });
        }

    }

    function save(){
        // todo7.js:127 Uncaught TypeError: todoList.forEach is not a function
        let stringified = JSON.stringify(todoList) //添加此物可解決todoList.forEach問題
        localStorage.setItem("todoList", stringified);
    }

    function load(){
        let retrieved = localStorage.getItem("todoList");
        todoList = JSON.parse(retrieved);
        console.log(typeof todoList);//是string所以save後需要JSON.stringify => ['123456']
        if(todoList == null){
            todoList = [];
        }
        console.log(todoList);
    };

    function renderRows(){
        todoList.forEach(todoObj => {
            // let arr = ["apple", "banana"];
            // console.log(typeof arr);
            for (let keys in todoObj){
                console.log(`${keys} -> ${todoObj[keys]}`);
            }
            //todo -> dog
            //category -> cat

            let todoEntry = todoObj["todo"];//顯示td li內容
            let key = "category";
            let todoCategory = todoObj[key];
            rendowRow(todoObj);// 正確的呼叫方式
        })
    };

    function rendowRow({todo: inputValue, category: inputValue2}){
        // let inputValue = obj.todo;
        // let inputValue2 = obj.category;
        // let = obj;

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
        spanElem.addEventListener("click", deleteItem, false);
        let tdElem4 = document.createElement("td");
        tdElem4.appendChild(spanElem);
        trElem.appendChild(tdElem4);

        function deleteItem(){
            trElem.remove();
            updateSelectOptions();
        }

        function done(){
        trElem.classList.toggle("strike");
        }


    }
}