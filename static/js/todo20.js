todoMain()

function todoMain() {
    const DEFAULT_OPTION = "選擇類別";
    let inputElem,
        inputElem2,
        dateInput,
        timeInput,
        addButton,
        sortButton,

        selectElem,
        todoList = [],
        calendar,
        shortlistBtn,
        changeBtn,
        todoTable,
        draggingElement;

    getElements();
    addListeners();
    initCalendar();
    load();
    renderRows(todoList);
    updateSelectOptions();//選擇類別

    function getElements() {
        inputElem = document.getElementsByTagName("input")[0];
        inputElem2 = document.getElementsByTagName("input")[1];
        dateInput = document.getElementById("dateInput");
        timeInput = document.getElementById("timeInput");
        addButton = document.getElementById("addBtn");
        sortButton = document.getElementById("sortBtn");
        ulElem = document.getElementsByTagName("ul")[0];
        selectElem = document.getElementById("categoryFilter");
        shortlistBtn = document.getElementById("shortlistBtn");
        // console.log(shortlistBtn);

        // changeBtn.addEventListener("click", commitEdit, false);
        changeBtn = document.getElementById("changeBtn"); 
        todoTable = document.getElementById("todoTable");
    }

    function addListeners() {
        addButton.addEventListener("click", addEntry, false);
        sortButton.addEventListener("click", sortEntry, false);
        selectElem.addEventListener("change", multipleFilter, false);
        shortlistBtn.addEventListener("change", multipleFilter, false);
        document.getElementById("todo-modal-close-btn").addEventListener("click", closeEditModalBox, false);

        changeBtn.addEventListener("click", commitEdit, false);
        // drag click
        todoTable.addEventListener("dragstart", onDragstart, false);
        todoTable.addEventListener("drop", onDrop, false);
        todoTable.addEventListener("dragover", onDragover, false);
    }

    function addEntry(event) {
        // 檢查是否有填寫 To-Do 欄位
        let inputValue = inputElem.value.trim();
        if (!inputValue) {
            alert("新增前請輸入待辦事項。");
            return;
        }
    
        // 取得其他欄位的值
        let inputValue2 = inputElem2.value.trim();
        let dateValue = dateInput.value.trim();
        let timeValue = timeInput.value.trim();
    
        // 只有在 To-Do 欄位有值的情況下才執行新增
        let obj = {
            id: _uuid(),
            todo: inputValue,
            category: inputValue2,
            date: dateValue,
            time: timeValue,
            done: false,
        };
        renderRow(obj);
        todoList.push(obj);
        save();
        updateSelectOptions();
    
        // 清空輸入欄位值
        inputElem.value = "";
        inputElem2.value = "";
        dateInput.value = "";
        timeInput.value = "";
    }

    function filterEntries() {
        let selection = selectElem.value;

        clearTable();

        if (selection == DEFAULT_OPTION) {
            todoList.forEach(obj => renderRow(obj));
        } else {
            todoList.forEach(obj => {
                if (obj.category == selection) {
                    renderRow(obj);
                }
            });
        }
    }

    function updateSelectOptions() {
        let options = [];
        //13.這邊取代category 部分不用寫那摩多編碼
        todoList.forEach((obj) => {
            options.push(obj.category);
        })

        let optionsSet = new Set(options);
        //options the select  options
        selectElem.innerText = "";
        //下拉式選項多一個空值""
        let newOptionElem = document.createElement('option');
        newOptionElem.value = DEFAULT_OPTION;
        newOptionElem.innerText = DEFAULT_OPTION;
        selectElem.appendChild(newOptionElem);

        for (let option of optionsSet) {
            let newOptionElem = document.createElement('option');
            newOptionElem.value = option;
            newOptionElem.innerText = option;
            selectElem.appendChild(newOptionElem);
        }
    }

    function save() {
        let stringified = JSON.stringify(todoList) //添加此物可解決todoList.forEach問題
        localStorage.setItem("todoList", stringified);
    }

    function load() {
        let retrieved = localStorage.getItem("todoList");
        todoList = JSON.parse(retrieved);
        // console.log(typeof todoList);//是string所以save後需要JSON.stringify => ['123456']
        if (todoList == null) {
            todoList = [];
        }
    };

    function renderRows(arr) {
        arr.forEach(todoObj => {
            renderRow(todoObj);// 正確的呼叫方式
        })
    }

    function renderRow({ todo: inputValue, category: inputValue2, id, date, time, done }) {
        // add a new row
        let table = document.getElementById("todoTable");
        let trElem = document.createElement("tr");
        table.appendChild(trElem);
        trElem.draggable = "true"; //drag

        // checkbox cell
        let checkboxElem = document.createElement("input");
        checkboxElem.type = "checkbox";
        checkboxElem.addEventListener("click", checkboxClickCallback, false);

        // id => datasets python
        checkboxElem.dataset.id = id;

        let tdElem1 = document.createElement("td");
        tdElem1.appendChild(checkboxElem);
        trElem.appendChild(tdElem1);
        trElem.dataset.id = id  // splice() => onDrop()

        //  date cell
        let dateElem = document.createElement("td");
        let formattedDate = formatDate(date);
        // console.log(formattedDate);

        dateElem.innerText = formatDate(date);
        trElem.appendChild(dateElem);

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

        // edit cell
        let editSpan = document.createElement("span");
        editSpan.innerText = "edit";
        editSpan.className = "material-icons";
        editSpan.addEventListener("click", toEditItem, false);
        editSpan.dataset.id = id;
        let editTd = document.createElement("td");
        editTd.appendChild(editSpan);
        trElem.appendChild(editTd);

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

        // done button
        checkboxElem.type = "checkbox"; //checkbox不會因為刷新就勾勾不見
        checkboxElem.checked = done;//當初是this 改變這個checkboxElem 就會連打勾框框一起加入到行列
        if (done) {
            trElem.classList.add("strike");
        } else {
            trElem.classList.remove("strike");
        }

        //新增事件
        addEvent({
            id: id,
            title: inputValue,
            date: date,
        });

        // For edit on cell feature (lesson 17)
        dateElem.dataset.editable = true;
        timeElem.dataset.editable = true;
        tdElem2.dataset.editable  = true;
        tdElem3.dataset.editable  = true;

        dateElem.dataset.type = "date";
        dateElem.dataset.value = date;
        timeElem.dataset.type = "time";
        tdElem2.dataset.type  = "todo";
        tdElem3.dataset.type  = "category";

        dateElem.dataset.id = id;
        timeElem.dataset.id = id;
        tdElem2.dataset.id  = id;
        tdElem3.dataset.id  = id;

        function deleteItem() {
            trElem.remove();
            updateSelectOptions();

            for (let i = 0; i < todoList.length; i++) {
                if (todoList[i].id == this.dataset.id) {
                    todoList.splice(i, 1);
                }
            }
            save();
            //enent.from calendar: Calendar::getEventById - 日曆::getEventById
            calendar.getEventById(this.dataset.id).remove();

        }

        function checkboxClickCallback() {
            trElem.classList.toggle("strike");
            for (let i = 0; i < todoList.length; i++) {
                if (todoList[i].id == this.dataset.id) {
                    todoList[i]["done"] = this.checked;
                }
            }
            save();
        }
    }

    function _uuid() {
        var d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available/如果可用，請使用高精度計時器
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    function sortEntry() {
        todoList.sort((a, b) => {
            let aDate = Date.parse(a.date);
            let bDate = Date.parse(b.date);
            return aDate - bDate;
        });

        save();
        clearTable();
        renderRows(todoList);
    }

    function initCalendar() {
        var calendarEl = document.getElementById('calendar');

        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            // locale: 'zh-tw',
            // navLinks: true,
            initialDate: '2023-11-07',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: [],
            // Event Clicking & Hovering
            eventClick: function(info) {
                toEditItem(info.event); //點擊月曆跑出編輯
            },
            eventBackgroundColor:"#ffebe6",
            eventBorderColor: "#ffebe6",
            eventTextColor: "#598047",
            // 拖曳日曆上時間
            editable:true,
            eventDrop:function(info) {
                // console.log(info);
                calendarEventDragged(info.event);
            },
        });
        calendar.render();
    }

    // Calendar::addEvent
    function addEvent(event) {
        calendar.addEvent(event);
    }

    function clearTable() {
        let trElems = document.getElementsByTagName("tr");
        for (let i = trElems.length - 1; i > 0; i--) {
            trElems[i].remove();
        }
        calendar.getEvents().forEach(event => event.remove());
    }

    function onShortListChange() {
        clearTable();

        if (shortlistBtn.checked) {
            // - Array filter() - 數組過濾器()
            let filteredIncompleteArray = todoList.filter(obj => obj.done == false);
            renderRows(filteredIncompleteArray);
            
            let filteredDoneArray = todoList.filter(obj => obj.done == true);
            renderRows(filteredDoneArray);
        } else {
            renderRows(todoList);
        }

    }

    function multipleFilter(){
        clearTable();
        // shortlistBtn.checked
        let selection = selectElem.value;

        if (selection == DEFAULT_OPTION) {
            if (shortlistBtn.checked) {
                let filteredIncompleteArray = todoList.filter(obj => obj.done == false);
                renderRows(filteredIncompleteArray);
                
                let filteredDoneArray = todoList.filter(obj => obj.done == true);
                renderRows(filteredDoneArray);
            } else {
                renderRows(todoList);
            }

        } else {
            let filteredCategoryArray = todoList.filter(obj => obj.category == selection);
            
            if (shortlistBtn.checked) {
                let filteredIncompleteArray = filteredCategoryArray.filter(obj => obj.done == false);
                renderRows(filteredIncompleteArray);
                
                let filteredDoneArray = filteredCategoryArray.filter(obj => obj.done == true);
                renderRows(filteredDoneArray);
            } else {
                renderRows(filteredCategoryArray);
            }  
        }
    }

    function onTableClicked(event){
        console.log(event.target); //秀出html
        if(event.target.matches("td") && event.target.dataset.editable == "true"){
            console.log(event.target); 
            let tempInputElem;
            switch(event.target.dataset.type){
                case "date":
                    console.log("date////");
                    tempInputElem = document.createElement("input");
                    tempInputElem.type = "date";
                    tempInputElem.value = event.target.innerText;
                    break;
                case "time":
                    console.log("time////");
                    tempInputElem = document.createElement("input");
                    tempInputElem.type = "time";
                    tempInputElem.value = event.target.innerText;
                    break;
                case "todo":
                case "category":
                    console.log("todo////");
                    tempInputElem = document.createElement("input");
                    tempInputElem.value = event.target.innerText;// 編輯時候會出現undefined ; innerText可以修改問題。
                    break;
                default:
            }
            // 編輯時候會出現undefined 
            event.target.innerText = "";
            event.target.appendChild(tempInputElem);

            tempInputElem.addEventListener("change", onChange, false);
        }  
        
        function onChange(event){
            let changedValue = event.target.value;
            let id = event.target.parentNode.dataset.id;
            let type = event.target.parentNode.dataset.type;

            calendar.getEventById(id).remove();

            todoList.forEach(todoObj => {
                if(todoObj.id == id){
                    todoObj[type] = changedValue;

                    addEvent({
                        id: id,
                        title: todoObj.todo,
                        start: todoObj.date,
                    });
                }
            });
            save();

            if(type == "date"){
                event.target.parentNode.innerText = formatDate(changedValue);
            }else{
                event.target.parentNode.innerText = changedValue;
            }
        }
    }

    function formatDate(date){
        let dateObj = new Date(date);
        let formattedDate = dateObj.toLocaleString("zh-TW",
            {
                month: "long",
                day: "numeric",
                year: "numeric",
            });
            return formattedDate;
    }

    function showEditModalBox(event){
        document.getElementById("todo-overlay").classList.add("slidedIntoView");
    }

    function closeEditModalBox(event){
        document.getElementById("todo-overlay").classList.remove("slidedIntoView");
    }

    function commitEdit(event){
        closeEditModalBox();

        let id = event.target.dataset.id;
        let todo = document.getElementById("todo-edit-todo").value;
        let category = document.getElementById("todo-edit-category").value;
        let date = document.getElementById("todo-edit-date").value;
        let time =  document.getElementById("todo-edit-time").value;

        document.getElementById("changeBtn").addEventListener("click", commitEdit, false);

        calendar.getEventById(id).remove();

        for(let i = 0; i<todoList.length; i++){
            if(todoList[i].id == id){
                todoList[i] = {
                    id: id,
                    todo:todo,
                    category:category,
                    date:date,
                    time:time
                };
                addEvent({
                    id: id,
                    title: todoList[i].todo,
                    start: todoList[i].date,
                });
            }
        }

        console.log(todoList);
        save();

        let tdNodeList = todoTable.querySelectorAll(`td[data-id='${id}']`);
        // console.log(tdNodeList)

        for(let i = 0; i < tdNodeList.length; i++){
            let type = tdNodeList[i].dataset.type;
            switch(type){
                case "date":
                    tdNodeList[i].innerText = formatDate(date);
                    break;
                case "time":
                    tdNodeList[i].innerText = time;
                    break;    
                case "todo":
                    tdNodeList[i].innerText = todo;
                    break;
                case "category":
                    tdNodeList[i].innerText = category;
                    break;       
            }

        }
    }

    function toEditItem(event){
        showEditModalBox();

        let id;
        if(event.target){ //mouse event
            id = event.target.dataset.id;
        }else{ // calender event
            id = event.id;
        }

        // console.log(id);
        preFillEditForm(id);
    }

    function preFillEditForm(id){
        let result = todoList.find(todoObj => todoObj.id == id);

        let {todo, category, date, time} = result;
        document.getElementById("todo-edit-todo").value = todo;
        document.getElementById("todo-edit-category").value = category;
        document.getElementById("todo-edit-date").value = date;
        document.getElementById("todo-edit-time").value = time;

        changeBtn.dataset.id = id;
    }

    function onDragstart(event){
        draggingElement = event.target; //trElem
    }

    
    function onDrop(event){
        /*
            Handing visual drag and drop of the rows
        */
        console.log(todoList);

        // console.log(event.target);
        if(event.target.matches("table")){
            return;
        }
        // prevent when target is table
        // console.log("drop"); //抓到想要欄位，這邊會抓到代表成功但是還未讓欄位移位。
        let beforeTarget = event.target;

        // to look through parent until it is tr
        while(!beforeTarget.matches("tr")){
            beforeTarget = beforeTarget.parentNode;
        }

        // to be implemented
        // beforeTarget.style.paddingTop = "1rem";

        // prevent when the tr is the first row
        // console.log(beforeTarget);
        if(beforeTarget.matches(":first-child")){
            return; //解決此 /*todo19.js:574 Uncaught DOMException: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.at HTMLTableElement.onDrop*/
        }

        // visualize the drag and drop
        todoTable.insertBefore(draggingElement, beforeTarget); //可以順利移位了
        /* 
            Handling the array   
        */

        let tempIndex;
        console.log(todoList.length);

        // find the index of one to be taken out
        todoList.forEach((todoObj, index)=>{
            if(todoObj.id == draggingElement.dataset.id){
                tempIndex = index;
            }
        });
        
        // pop the element
        let [toInsertObj] = todoList.splice(tempIndex, 1);
        console.log(toInsertObj);

        // find the index of one to be inserted before
        todoList.forEach((todoObj, index)=>{
            if(todoObj.id == beforeTarget.dataset.id){
                tempIndex = index;
            }
        });

        // insert the temp
        todoList.splice(tempIndex, 0, toInsertObj);
        console.log(todoList);

        // update storage
        save(); 
    }

    function onDragover(event){
        event.preventDefault();
        // console.log(event.target); 
    }

    function calendarEventDragged(event){
        let id = event.id;
        // let data = event.start;
        // let month = event.getMonth();

        // console.log(event.date);
        // console.log(event);
        console.log(typeof event.start);
        let dateObj = new Date(event.start);
        // console.log(dateObj);
        let year = (dateObj.getFullYear());
        let month = (dateObj.getMonth() + 1);
        let date = (dateObj.getDate());
    
        let paddedMonth = month.toString();
        if(paddedMonth.length < 2){
            paddedMonth = "0" + paddedMonth;
        }
        let paddedDate = date.toString();
        if(paddedDate.length < 2){
            paddedDate = "0" + paddedDate;
        }
        let toStoreDate = `${year}-${paddedMonth}-${paddedDate}`;
        console.log(toStoreDate);
        
        //拖曳日期上時間，更改正確時間上。
        todoList.forEach(todoObj => {
            if(todoObj.id == id){
                todoObj.date = toStoreDate;
            }
        });

        save();

        multipleFilter();
    }
}
