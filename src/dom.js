export function updateSidebar(projectList) {
    const sidebar = document.querySelector(".sidebar");
    const domProjects = document.createElement("div");
    const allBtn = document.createElement("button");
    const addBtn = document.createElement("button");
    const addProjDialog = createAddProjDialog(projectList);
    allBtn.textContent = "All Projects";
    allBtn.addEventListener("click", () => showAll(projectList));
    domProjects.appendChild(allBtn);
    for (const proj of projectList.projects) {
        const projBtn = document.createElement("button");
        projBtn.textContent = proj.name;
        projBtn.addEventListener("click", () => updateContent(proj));
        domProjects.appendChild(projBtn);
    }
    addBtn.addEventListener("click", () => addProjDialog.showModal());
    addBtn.textContent = "Add Project";
    domProjects.appendChild(addBtn);
    domProjects.appendChild(addProjDialog);
    sidebar.replaceChildren();
    sidebar.appendChild(domProjects);
}

function createAddProjDialog(projectList) {
    const addProjDialog = document.createElement("dialog");
    const form = document.createElement("form");
    const inputLabel = document.createElement("label");
    const input = document.createElement("input");
    const submitBtn = document.createElement("button");
    form.setAttribute("action", "");
    form.setAttribute("method", "dialog");
    form.addEventListener("submit", (event) => {
        const data = new FormData(form);
        projectList.addProject(data.get("projName"));
        updateSidebar(projectList);
        event.preventDefault();
    })
    input.setAttribute("name", "projName");
    input.setAttribute("required", "");
    inputLabel.textContent = "Project Name ";
    submitBtn.textContent = "Add Project";
    submitBtn.setAttribute("type", "submit");
    addProjDialog.classList.add("addProjDialog");
    inputLabel.appendChild(input);
    form.appendChild(inputLabel);
    form.appendChild(submitBtn);
    addProjDialog.appendChild(form);
    return addProjDialog;
}

export function showAll(projectList) {
    const content = document.querySelector(".content");
    const newContent = document.createElement("div");
    for (const proj of projectList.projects) {
        const title = document.createElement("p");
        title.textContent = proj.name;
        title.classList.add("projectTitle");
        newContent.appendChild(title);
        displayTasks(newContent, proj);
    }
    content.replaceChildren();
    content.appendChild(newContent);
}

function displayTasks(domParent, proj) {
    const taskList = document.createElement("div");
    taskList.classList.add("taskList");
    for (let i = 0; i < proj.tasks.length; ++i) {
        const expandableTask = taskToDomElem(proj.tasks[i], taskList, proj);
        taskList.appendChild(expandableTask);
    }
    const addBtn = document.createElement("button");
    const addTaskDialog = createAddTaskDialog(proj, taskList);
    addBtn.textContent = "Add Task";
    addBtn.addEventListener("click", () => {
        addTaskDialog.showModal();
    })
    domParent.appendChild(taskList);
    domParent.appendChild(addBtn);
    domParent.appendChild(addTaskDialog);
}

function taskToDomElem(task, taskList, proj) {
    const expandableTask = document.createElement("div");
    const checkbox = document.createElement("input");
    const taskTitle = document.createElement("input");
    const taskTitleLabel = document.createElement("label");
    const showBtn = document.createElement("button");
    const details = document.createElement("div");
    const desc = document.createElement("input");
    const descLabel = document.createElement("label")
    const dueDate = document.createElement("input");
    const dueDateLabel = document.createElement("label");
    const prio = document.createElement("select");
    const prioLabel = document.createElement("label");
    const optHigh = document.createElement("option");
    const optMed = document.createElement("option");
    const optLow = document.createElement("option");
    const delBtn = document.createElement("button");

    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "completed");
    if (task.completed === true) {
        checkbox.setAttribute("checked", "");
    }
    checkbox.addEventListener("input", () => {
        task.completed = !task.completed;
    })

    taskTitleLabel.textContent = "Task ";
    taskTitle.value = task.title;
    taskTitle.setAttribute("name", "taskTitle");
    taskTitle.addEventListener("change", (event) => {
        if (event.target.value.length > 0) {
            task.title = event.target.value;
        } else {
            taskTitle.value = task.title;
        }
    })

    descLabel.textContent = "Description ";
    desc.value = task.desc;
    desc.setAttribute("name", "desc");
    desc.addEventListener("change", (event) => {
        if (event.target.value.length > 0) {
            task.desc = event.target.value;
        }
    })

    dueDateLabel.textContent = "Due ";
    dueDate.setAttribute("type", "date");
    dueDate.setAttribute("name", "dueDate");
    dueDate.value = task.dueDate;
    dueDate.addEventListener("input", (event) => {
        task.dueDate = event.target.value;
        console.log(task.dueDate);
    })

    prioLabel.textContent = "Priority ";
    optHigh.textContent = "High";
    optMed.textContent = "Med";
    optLow.textContent = "Low";
    optHigh.setAttribute("value", "High")
    optMed.setAttribute("value", "Med")
    optLow.setAttribute("value", "Low")
    if (task.prio === "High") {
        optHigh.setAttribute("selected", "");
    } else if (task.prio === "Med") {
        optMed.setAttribute("selected", "");
    } else {
        optLow.setAttribute("selected", "");
    }
    prio.setAttribute("name", "prio");
    prio.appendChild(optHigh);
    prio.appendChild(optMed);
    prio.appendChild(optLow);
    prio.addEventListener("input", (event) => {
        task.prio = event.target.value;
    })

    details.style.display = "none";
    details.classList.add("details");
    showBtn.textContent = "Expand";
    showBtn.classList.add("showBtn");
    showBtn.addEventListener("click", () => {
        if (showBtn.textContent === "Expand") {
            showBtn.textContent = "Collapse";
            details.style.display = "flex";
        } else {
            showBtn.textContent = "Expand";
            details.style.display = "none";
        }
    });

    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
        proj.removeTask(task.id);
        taskList.removeChild(expandableTask);
    });

    expandableTask.classList.add("task");

    taskTitleLabel.appendChild(taskTitle);
    descLabel.appendChild(desc);
    dueDateLabel.appendChild(dueDate);
    prioLabel.appendChild(prio);
    expandableTask.appendChild(checkbox);
    expandableTask.appendChild(taskTitleLabel);
    expandableTask.appendChild(showBtn);
    expandableTask.appendChild(delBtn);
    details.appendChild(descLabel);
    details.appendChild(dueDateLabel);
    details.appendChild(prioLabel);
    expandableTask.appendChild(details);
    return expandableTask;
}

function createAddTaskDialog(proj, taskList) {
    const addTaskDialog = document.createElement("dialog");
    const form = document.createElement("form");
    addTaskDialog.classList.add("addTaskDialog");
    form.setAttribute("action", "");
    form.setAttribute("method", "dialog");
    form.addEventListener("submit", () => {
        const data = new FormData(form);
        const title = data.get("title");
        const desc = data.get("desc");
        const dueDate = data.get("dueDate");
        const prio = data.get("prio");
        proj.addTask(title, desc, dueDate, prio);
        const expandableTask = taskToDomElem(proj.tasks[proj.tasks.length - 1], taskList, proj);
        taskList.appendChild(expandableTask);
    })
    const titleLabel = document.createElement("label");
    const titleInput = document.createElement("input");
    const descLabel = document.createElement("label");
    const descInput = document.createElement("input");
    const dueDateLabel = document.createElement("label");
    const dueDateInput = document.createElement("input");
    const prioLabel = document.createElement("label");
    const prioSelect = document.createElement("select");
    const optHigh = document.createElement("option");
    const optMed = document.createElement("option");
    const optLow = document.createElement("option");
    const submitBtn = document.createElement("button");

    titleLabel.textContent = "Task Title ";
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("required", "");

    descLabel.textContent = "Description ";
    descInput.setAttribute("name", "desc");
    descInput.setAttribute("required", "");

    dueDateLabel.textContent = "Task Title ";
    dueDateInput.setAttribute("name", "dueDate");
    dueDateInput.setAttribute("type", "date");
    dueDateInput.setAttribute("required", "");

    prioLabel.textContent = "Priority ";
    prioSelect.setAttribute("name", "prio");
    optHigh.textContent = "High";
    optMed.textContent = "Med";
    optLow.textContent = "Low";
    optHigh.setAttribute("value", "High")
    optMed.setAttribute("value", "Med")
    optLow.setAttribute("value", "Low")

    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Submit";

    titleLabel.appendChild(titleInput);
    descLabel.appendChild(descInput);
    dueDateLabel.appendChild(dueDateInput);
    prioSelect.appendChild(optHigh);
    prioSelect.appendChild(optMed);
    prioSelect.appendChild(optLow);
    prioLabel.appendChild(prioSelect);
    form.appendChild(titleLabel);
    form.appendChild(descLabel);
    form.appendChild(dueDateLabel);
    form.appendChild(prioLabel);
    form.appendChild(submitBtn);
    addTaskDialog.appendChild(form);
    return addTaskDialog;
}

export function updateContent(project) {
    const content = document.querySelector(".content");
    const newContent = document.createElement("div");
    const title = document.createElement("p");
    title.textContent = project.name;
    title.classList.add("projectTitle");
    newContent.appendChild(title);
    displayTasks(newContent, project);
    content.replaceChildren();
    content.appendChild(newContent);
}
