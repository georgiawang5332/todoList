onload = todoMain;

function todoMain(){
    const DEFAULT_OPTION = "選擇類別";
    let inputElem,
        inputElem2,
        dateInput,
        timeInput,
        addButton,
        sortButton,
        ulElem,
        selectElem,
        todoList = [];
        calendar;

    getElements();
    addListeners();
    initCalendar();
    load();
    renderRows();
    rendowRow();
    updateSelectOptions();//選擇類別

    function getElements(){
        inputElem = document.getElementsByTagName("input")[0];
        inputElem2 = document.getElementsByTagName("input")[1];
        dateInput = document.getElementById("dateInput");
        timeInput = document.getElementById("timeInput");
        addButton = document.getElementById("addBtn");
        sortButton = document.getElementById("sortBtn");
        ulElem = document.getElementsByTagName("ul")[0];
        selectElem = document.getElementById("categoryFilter");
    }

    function addListeners(){
        addButton.addEventListener("click", addEntry, false);
        sortButton.addEventListener("click", sortEntry, false);
        selectElem.addEventListener("change", filterEntries, false);
    }

    function addEntry(event){ //add新增Entry條目
        let inputValue = inputElem.value;
        inputElem.value = "";
        let inputValue2 = inputElem2.value;
        inputElem2.value = "";
        //11
        let dateValue = dateInput.value;
        dateInput.value = "";
        let timeValue = timeInput.value;
        timeInput.value = "";
        /////////////////取走放入 rendowRow(); 函數//////////////////////
        let obj = {
            id: _uuid(),//入口函數
            todo: inputValue,
            category: inputValue2,
            //11
            date:dateValue,
            time:timeValue,
            done: false,
        };
        rendowRow(obj);
        todoList.push(obj); //0:{todo: "E todo", category: "E todo"}
        save();
        updateSelectOptions();
    }

    function filterEntries(){
        let selection = selectElem.value;
        //empty the table清空表格, keeping the first row保留地一行
        let trElems = document.getElementsByTagName("tr");
        // let trElems = Array.prototype.slice.call(document.getElementsByTagName("tr"));
        for(let i = trElems.length - 1; i > 0; i--){
            trElems[i].remove();
        }

        calendar.getEvents().forEach(event=>event.remove());

        if(selection == DEFAULT_OPTION){
            todoList.forEach( obj => rendowRow(obj) );
        }else{
            todoList.forEach( obj => {
                if(obj.category == selection){
                    rendowRow(obj);
                }
            });
        }
    }

    function updateSelectOptions(){
        let options = [];
        //13.這邊取代category 部分不用寫那摩多編碼
        todoList.forEach((obj)=>{
            options.push(obj.category);
        })

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
        // draw(todoList.map(obj => {
        //     return{
        //         title:obj.todo,
        //         start:obj.date,
        //     }
        // }))
    }

    function rendowRow({todo: inputValue, category: inputValue2, id ,date ,time ,done}){
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

        //  date cell
        let dateElem = document.createElement("td");
        let dateObj = new Date(date);
        let formattedDate = dateObj.toLocaleString("zh-TW",
        {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
        console.log(formattedDate);
        dateElem.innerText = date;
        trElem.appendChild(dateElem);
        //console.log(dateObj.toLocaleString("zh-TW"));("en-US"));("en-GB"));

        //  time cell
        let timeElem = document.createElement("td");
        timeElem.innerText = time;
        trElem.appendChild(timeElem);

        // to-do cell
        let tdElem2 = document.createElement("td");
        tdElem2.innerText = inputValue;
        trElem.appendChild(tdElem2);

        // category cell
        let tdElem3 = document.createElement("td");
        tdElem3.innerText = inputValue2;
        tdElem3.className = "categoryCell";
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

//      console.log("Done: " + done); //done 是框框盒子
        checkboxElem.type = "checkbox"; //checkbox不會因為刷新就勾勾不見
        checkboxElem.checked = done;//當初是this 改變這個checkboxElem 就會連打勾框框一起加入到行列
        if(done){
            trElem.classList.add("strike");
        }else{
            trElem.classList.remove("strike");
        }

        //新增事件
        addEvent({
            id: id,
            title: inputValue,
            date: date,
        });

        function deleteItem(){
            trElem.remove();
            updateSelectOptions();

            for(let i = 0; i < todoList.length; i++){
                if(todoList[i].id == this.dataset.id){
                    todoList.splice(i, 1);
                }
            }
            save();
            //enent.from calendar: Calendar::getEventById - 日曆::getEventById
            calendar.getEventById(this.dataset.id).remove();
            
        }

        function checkboxClickCallback(){
            trElem.classList.toggle("strike");
            for(let i = 0; i < todoList.length; i++){
                if(todoList[i].id == this.dataset.id){
                    todoList[i]["done"] = this.checked;
                }
            }
            save();
        }
    }

    function _uuid() {
        var d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available/如果可用，請使用高精度計時器
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    function sortEntry(){
        todoList.sort((a,b) => {
            let aDate = Date.parse(a.date);
            let bDate = Date.parse(b.date);
            return aDate - bDate;
        });

        save();

        //empty the table清空表格, keeping the first row保留地一行
        let trElems = document.getElementsByTagName("tr");
        for(let i = trElems.length - 1; i > 0; i--){
            trElems[i].remove();
        }
        renderRows();    
    }

    function initCalendar(){
        var calendarEl = document.getElementById('calendar');

        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            initialDate: '2023-11-07',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: [],
        });
        calendar.render();
    }

    // Calendar::addEvent
    function addEvent(event){
        calendar.addEvent(event);
    }
}