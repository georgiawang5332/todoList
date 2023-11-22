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
        //id: todoList.length,
        //https://www.cythilya.tw/2017/03/12/uuid/
            id: _uuid(),//入口函數
            todo: inputValue,
            category: inputValue2,
            done: false,
        };
        rendowRow(obj);
        // todoList.push(inputValue, inputValue2)
        todoList.push(obj); //0:{todo: "E todo", category: "E todo"}
        save();
        updateSelectOptions();
    }

    function filterEntries(){
//        console.log('filterEntries running/過濾條目正在運行');

        let selection = selectElem.value;
        if(selection == DEFAULT_OPTION){
            let rows = document.getElementsByTagName("tr");
            Array.from(rows).forEach((row)=>{
                row.style.display = ""
            });
        }else{
            let rows = document.getElementsByTagName("tr");
//            console.log(rows)
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
//        console.log(options)
        let optionsSet = new Set(options);
//        console.log(optionsSet);

        //options the select  options
        selectElem.innerText = "";
        //下拉式選項多一個空值""
        let newOptionElem = document.createElement('option');
        newOptionElem.value = DEFAULT_OPTION;
        newOptionElem.innerText = DEFAULT_OPTION;
        selectElem.appendChild(newOptionElem);

        for(let option of optionsSet){
            let newOptionElem = document.createElement('option');
            newOptionElem.value = option;
            newOptionElem.innerText = option;
            selectElem.appendChild(newOptionElem);
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
//        console.log(typeof todoList);//是string所以save後需要JSON.stringify => ['123456']
        if(todoList == null){
            todoList = [];
        }
//        console.log(todoList);
    };

    function renderRows(){
        todoList.forEach(todoObj => {
            for (let keys in todoObj){
//                console.log(`${keys} -> ${todoObj[keys]}`);
            }
            //todo -> dog
            //category -> cat

            let todoEntry = todoObj["todo"];//顯示td li內容
            let key = "category";
            let todoCategory = todoObj[key];
            rendowRow(todoObj);// 正確的呼叫方式
        })
    };

    function rendowRow({todo: inputValue, category: inputValue2, id, done}){

        // add a new row
        let table = document.getElementById("todoTable");
        let trElem = document.createElement("tr");
        table.appendChild(trElem);

        // checkbox cell
        let checkboxElem = document.createElement("input");
        checkboxElem.type = "checkbox";
        checkboxElem.addEventListener("click", checkboxClickCallback, false);

        // id => datasets python
        checkboxElem.dataset.id = id;

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

        // id => datasets python
        spanElem.dataset.id = id;

        let tdElem4 = document.createElement("td");
        tdElem4.appendChild(spanElem);
        trElem.appendChild(tdElem4);

//        console.log("Done: " + done); //done 是框框盒子
        checkboxElem.type = "checkbox"; //checkbox不會因為刷新就勾勾不見
        checkboxElem.checked = done;//當初是this 改變這個checkboxElem 就會連打勾框框一起加入到行列
        // todoList[i]["done"] = this.checked;
        if(done){
            trElem.classList.add("strike");
        }else{
            trElem.classList.remove("strike");
        }

        function deleteItem(){
            trElem.remove();
            updateSelectOptions();

            for(let i = 0; i < todoList.length; i++){
                if(todoList[i].id == this.dataset.id){
                    todoList.splice(i, 1);
                }
            }
            save();
        }

        function checkboxClickCallback(){
            trElem.classList.toggle("strike");
            for(let i = 0; i < todoList.length; i++){
                if(todoList[i].id == this.dataset.id){
                    todoList[i]["done"] = this.checked;
                }
            }
            //todo array element ["done"] = this.checked
            // console.log(this.checked)
//            console.log(this.dataset.id);
            save();
        }
    }
    function _uuid() {
        var d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}

let str1 = "-> this is demo.";
//let str2 = str1.replace("is", "are");
//or
let regex1 = new RegExp("is", "g") //正則表達式構造函數
//let str2 = str1.replace(regex1, "are");
let str2 = str1.replace(/[is]/g, function(){
    return Math.random();
});

console.log(str2);

/*
(10).toString(16)
'a'
(11).toString(16)
'b'
(255).toString(16)
'ff'
(9).toString(2)
'1001'
Math.random()
0.29881580414650233
Math.random()
0.7163961394091098
Math.random()
0.13568065763871284
Math.floor(1.2)
1
Math.floor(1.9)
1
Date.now()
1700469305356
Date.now()
1700469314191
performance.now()
566392.5
performance.now()
574310.6999999881
performance.now()
579262.599999994
*/