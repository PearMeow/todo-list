import { format } from "date-fns";

export function updateSidebar(projectList) {
    const sidebar = document.querySelector(".sidebar");
    const domProjects = document.createElement("div");
    const allBtn = document.createElement("button");
    const addBtn = document.createElement("button");
    const addDialog = createAddProjDialog(projectList);
    allBtn.textContent = "All Projects";
    allBtn.addEventListener("click", () => showAll(projectList));
    domProjects.appendChild(allBtn);
    for (const proj of projectList.projects) {
        const projBtn = document.createElement("button");
        projBtn.textContent = proj.name;
        projBtn.addEventListener("click", () => updateContent(proj));
        domProjects.appendChild(projBtn);
    }
    addBtn.addEventListener("click", () => addDialog.showModal());
    addBtn.textContent = "Add Project";
    domProjects.appendChild(addBtn);
    domProjects.appendChild(addDialog);
    sidebar.replaceChildren();
    sidebar.appendChild(domProjects);
}

function createAddProjDialog(projectList) {
    const addDialog = document.createElement("dialog");
    const form = document.createElement("form");
    const inputLabel = document.createElement("label");
    const input = document.createElement("input");
    const submitBtn = document.createElement("button");
    form.setAttribute("action", "");
    form.setAttribute("method", "dialog");
    form.addEventListener("submit", () => {
        const data = new FormData(form);
        projectList.addProject(data.get("projName"));
        updateSidebar(projectList);
    })
    input.setAttribute("name", "projName");
    input.setAttribute("id", "projName");
    input.setAttribute("required", "");
    inputLabel.setAttribute("for", "projName");
    inputLabel.textContent = "Project Name";
    submitBtn.textContent = "Add Project";
    submitBtn.setAttribute("type", "submit");
    addDialog.classList.add("addDialog");
    form.appendChild(inputLabel);
    form.appendChild(input);
    form.appendChild(submitBtn);
    addDialog.appendChild(form);
    return addDialog;
}

function showAll(projectList) {
    const content = document.querySelector(".content");
    const newContent = document.createElement("div");
    for (const proj of projectList.projects) {
        const title = document.createElement("p");
        title.textContent = proj.name;
        newContent.appendChild(title);
        displayTasks(newContent, proj);
    }
    content.replaceChildren();
    content.appendChild(newContent);
}

function displayTasks(domParent, proj) {
    const taskList = document.createElement("div");
    for (let i = 0; i < proj.tasks.length; ++i) {
        const expandableTask = taskToDomElem(proj.tasks[i], taskList);
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

function taskToDomElem(task, taskList) {
    const expandableTask = document.createElement("div");
    const showBtn = document.createElement("button");
    const taskTitle = document.createElement("input");
    const taskTitleLabel = document.createElement("label");
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

    taskTitleLabel.textContent = "Task "
    taskTitle.value = task.title;
    taskTitle.addEventListener("change", (event) => {
        if (event.target.value.length > 0) {
            task.title = event.target.value;
        } else {
            taskTitle.value = task.title;
        }
    })

    descLabel.textContent = "Description ";
    descLabel.style.display = "block";
    desc.value = task.desc
    desc.addEventListener("change", (event) => {
        if (event.target.value.length > 0) {
            task.desc = event.target.value;
        }
    })

    dueDateLabel.textContent = "Due ";
    dueDateLabel.style.display = "block";
    dueDate.setAttribute("type", "date");
    dueDate.value = task.dueDate;
    dueDate.addEventListener("input", (event) => {
        task.dueDate = event.target.value;
        console.log(task.dueDate);
    })

    prioLabel.textContent = "Priority ";
    prioLabel.style.display = "block";
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
        optLow.setAttribute("selected", "")
    }
    prio.appendChild(optHigh);
    prio.appendChild(optMed);
    prio.appendChild(optLow);
    prio.addEventListener("input", (event) => {
        task.prio = event.target.value;
    })

    details.style.display = "none";
    showBtn.textContent = "+";
    showBtn.classList.add("showBtn");
    showBtn.addEventListener("click", () => {
        if (showBtn.textContent === "+") {
            showBtn.textContent = "-";
            details.style.display = "block";
        } else {
            showBtn.textContent = "+";
            details.style.display = "none";
        }
    });

    delBtn.textContent = "Delete Task";
    delBtn.addEventListener("click", () => {
        for (let i = 0; i < proj.tasks.length; ++i) {
            if (proj.tasks[i].id === task.id) {
                proj.tasks.splice(i, 1);
            }
        }
        taskList.removeChild(expandableTask);
    });

    taskTitleLabel.appendChild(taskTitle);
    descLabel.appendChild(desc);
    dueDateLabel.appendChild(dueDate);
    prioLabel.appendChild(prio);
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
    form.setAttribute("action", "");
    form.setAttribute("method", "dialog");
    form.addEventListener("submit", () => {
        const data = new FormData(form);
        const title = data.get("title");
        const desc = data.get("desc");
        const dueDate = data.get("dueDate");
        const prio = data.get("prio");
        proj.addTask(title, desc, dueDate, prio);
        const expandableTask = taskToDomElem(proj.tasks[proj.tasks.length - 1], taskList);
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
    newContent.appendChild(title);
    displayTasks(newContent, project);
    content.replaceChildren();
    content.appendChild(newContent);
}
