onload = todoMain;
// todoMain()

function todoMain() {
    const DEFAULT_OPTION = "選擇類別";
    let inputElem,
        inputElem2,
        dateInput,
        timeInput,
        addButton,
        sortButton,
        // ulElem,
        selectElem,
        todoList = [];
        calendar,
        shortlistBtn,
        changeBtn;

    getElements();
    addListeners();
    initCalendar();
    load();
    renderRows(todoList);
    // renderRow();
    updateSelectOptions();//選擇類別

    // onShortListChange,
    // filterEntries();

    function getElements() {
        inputElem = document.getElementsByTagName("input")[0];
        inputElem2 = document.getElementsByTagName("input")[1];
        dateInput = document.getElementById("dateInput");
        timeInput = document.getElementById("timeInput");
        addButton = document.getElementById("addBtn");
        sortButton = document.getElementById("sortBtn");
        ulElem = document.getElementsByTagName("ul")[0];
        // ulElem = document.getElementById("todoTable");
        selectElem = document.getElementById("categoryFilter");
        shortlistBtn = document.getElementById("shortlistBtn");
        // console.log(shortlistBtn);

        changeBtn = document.getElementById("changeBtn");

    }

    function addListeners() {
        addButton.addEventListener("click", addEntry, false);
        sortButton.addEventListener("click", sortEntry, false);
        selectElem.addEventListener("change", multipleFilter, false);
        shortlistBtn.addEventListener("change", multipleFilter, false);
        // part 17 event delegation (活動代表團)
        // document.getElementById("todoTable").addEventListener("click", onTableClicked, false);
        // document.addEventListener("click", showEditModalBox, false);

        // let button = document.getElementById("todo-modal-close-btn");
        // console.log(button);
        // closeEditModalBox
        // button.addEventListener("click", closeEditModalBox, false);
        document.getElementById("todo-modal-close-btn").addEventListener("click", closeEditModalBox, false);

        changeBtn.addEventListener("click", commitEdit, false);

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
        // let inputValue = inputElem.value;
        inputElem.value = "";
        // let inputValue2 = inputElem2.value;
        inputElem2.value = "";
        // let dateValue = dateInput.value;
        dateInput.value = "";
        // let timeValue = timeInput.value;
        timeInput.value = "";
    }

    /*註解:
            當 To-Do 欄位沒有填寫內容時，會彈出一個警告視窗，並且不會執行新增的動作。
            這樣就能夠避免在沒有填寫必要內容的情況下添加多餘的空白欄位。
    */

    function filterEntries() {
        let selection = selectElem.value;

        //empty the table清空表格, keeping the first row保留地一行
        // let trElems = document.getElementsByTagName("tr");
        // for (let i = trElems.length - 1; i > 0; i--) {
        //     trElems[i].remove();
        // }
        // calendar.getEvents().forEach(event => event.remove());
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
        //        console.log(optionsSet);

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
        // todo7.js:127 Uncaught TypeError: todoList.forEach is not a function
        let stringified = JSON.stringify(todoList) //添加此物可解決todoList.forEach問題
        localStorage.setItem("todoList", stringified);
    }

    function load() {
        let retrieved = localStorage.getItem("todoList");
        todoList = JSON.parse(retrieved);
        //        console.log(typeof todoList);//是string所以save後需要JSON.stringify => ['123456']
        if (todoList == null) {
            todoList = [];
        }
        //        console.log(todoList);
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
        dateElem.innerText = formatDate(date);
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

        // for edit on cell feature(lesson 17)
        // tdElem2.dataset.id = id;
        // tdElem2.addEventListener("dblclick", allowEdit, false);

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

        // id => datasets python
        editSpan.dataset.id = id;

        let editTd = document.createElement("td");
        editTd.appendChild(editSpan);
        trElem.appendChild(editTd);
        // let tdElem5 = document.createElement("td");
        // tdElem5.innerText = "edit";
        // tdElem5.className = "material-icons";
        // // tdElem5.addEventListener("click", editItem, false);
        // trElem.appendChild(tdElem5);


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

        // console.log("Done: " + done); //done 是框框盒子
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
            start: date,
        });

        // for edit on cell feature(lesson 17)
        // dateElem.dataset.editable = true ;
        // timeElem.dataset.editable = true ;
        // tdElem2.dataset.editable = true;
        // tdElem3.dataset.editable = true;

        // dateElem.dataset.type = "date" ;
        // dateElem.dataset.value = date ;
        // timeElem.dataset.type = "time" ;
        // tdElem2.dataset.type = "todo";
        // tdElem3.dataset.type = "category";

        // dateElem.dataset.id = id ;
        // timeElem.dataset.id = id ;
        // tdElem2.dataset.id = id;
        // tdElem3.dataset.id = id;
        // tdElem2.addEventListener("dblclick", allowEdit, false);

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

        function toEditItem(event) {
            showEditModalBox();
            let id = event.target.dataset.id;
            let result = todoList.find(todoObj => todoObj.id == id);
            // console.log(result);
            let {todo, category, date, time} = result;
            document.getElementById("todo-edit-todo").value = todo;
            document.getElementById("todo-edit-category").value = category;
            document.getElementById("todo-edit-date").value = date;
            document.getElementById("todo-edit-time").value = time;

            changeBtn.dataset.id = id;
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
            locale: 'zh-tw',
            navLinks: true,
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
    function addEvent(event) {
        calendar.addEvent(event);
    }

    function clearTable() {
        //empty the table清空表格, keeping the first row保留地一行
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
            // filteredArray.forEach(renderRow);
            
            let filteredDoneArray = todoList.filter(obj => obj.done == true);
            renderRows(filteredDoneArray);
            // filteredArray.forEach(renderRow);
            //按一次會把刪除的排列至後方
        } else {
            renderRows(todoList);
            //再按一次InComplete 會消失，所以這用else解決，他就是把你想刪除的list統整刪除跟還原刪除而已。
            // todoList.forEach(renderRow)
        }

    }

    function multipleFilter(){
        clearTable();
        // shortlistBtn.checked
        let selection = selectElem.value;

        if (selection == DEFAULT_OPTION) {
            // 
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
        // if(event.target.matches("td"))
        if(event.target.matches("td") && event.target.dataset.editable == "true"){
            // console.log("onTableClicked: " + event.target);
            let tempInputElem ;
            switch(event.target.dataset.type){
                case "date":
                    tempInputElem = document.createElement("input");
                    tempInputElem.type = "date";
                    tempInputElem.value = event.target.dataset.value;
                    break;
                case "time":
                    tempInputElem = document.createElement("input");
                    tempInputElem.type = "time";
                    tempInputElem.value = event.target.innerText;
                    break;
                case "todo":
                case "category":
                    tempInputElem = document.createElement("input");
                    tempInputElem.value = event.target.innerText;
                    break;
                default:
            }
            event.target.innerText = "";
            event.target.appendChild(tempInputElem);
            tempInputElem.addEventListener("change", onChange, false);   
        }

        function onChange(event){
            let changedValue = event.target.value;
            let id = event.target.parentNode.dataset.id;
            let type = event.target.parentNode.dataset.type;
            
            //remove from calendar
            calendar.getEventById(id).remove();

            todoList.forEach(todoItem  => {
                // if(todoItem.id == event.target.parentNode.dataset.id){
                if(todoItem.id == id){
                    todoItem[type] = changedValue;
                    // todoItem.todo = changedValue;
                    // todoItem[event.target.parentNode.dataset.type] = changedValue;
                    
                    //新增事件
                    addEvent({
                        id: id,
                        title: todoItem.todo,
                        date: todoItem.date,
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
        let formattedDate = dateObj.toLocaleString(
        "zh-TW", {
            month: "long",
            day: "numeric",
            year: "numeric"
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
        let time = document.getElementById("todo-edit-time").value;

        //remove from calendar
        // calendar.getEventById(id).remove();
        let existingEvent = calendar.getEventById(id);
        if (existingEvent) {
            // remove from calendar
            existingEvent.remove();
        }

        todoList.forEach(todoObj => {
            if(todoObj.id == id){
                todoObj = {
                    id,
                    todo,
                    category,
                    date,
                    time,
                };

                console.log(todo);
                console.log(todoObj);

                //新增事件
                addEvent({
                    id: id,
                    title: todoObj.todo,
                    start: todoObj.date,
                });
            }
        })
        save();

        // if(type == "date"){
        //     event.target.parentNode.innerText = formatDate(changedValue);
        // }else{
        //     event.target.parentNode.innerText = changedValue;
        // }

    }
}




// Date & Time
if (/Mobi/.test(navigator.userAgent)) {
    // if mobile device, use native pickers
    $(".date input").attr("type", "date");
    $(".time input").attr("type", "time");
  } else {
    // if desktop device, use DateTimePicker
    $("#datepicker").datetimepicker({
      useCurrent: false,
      format: "DD-MMM-YYYY",
      showTodayButton: true,
      icons: {
        next: "fa fa-chevron-right",
        previous: "fa fa-chevron-left",
        today: 'todayText',
      }
    });
    $("#timepicker").datetimepicker({
      format: "LT",
      icons: {
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down"
      }
    });
  }
// Date & Time
