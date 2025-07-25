import { format } from "date-fns";

export function updateSidebar(projectList) {
    const sidebar = document.querySelector(".sidebar");
    const domProjects = document.createElement("div");
    const allBtn = document.createElement("button");
    const addBtn = document.createElement("button");
    const addModal = createAddModal(projectList);
    allBtn.textContent = "All Projects";
    allBtn.addEventListener("click", () => showAll(projectList));
    domProjects.appendChild(allBtn);
    for (const proj of projectList.projects) {
        const projBtn = document.createElement("button");
        projBtn.textContent = proj.name;
        projBtn.addEventListener("click", () => updateContent(proj));
        domProjects.appendChild(projBtn);
    }
    addBtn.addEventListener("click", () => addModal.showModal());
    addBtn.textContent = "Add Project";
    domProjects.appendChild(addBtn);
    domProjects.appendChild(addModal);
    sidebar.replaceChildren();
    sidebar.appendChild(domProjects);
}

function createAddModal(projectList) {
    const addModal = document.createElement("dialog");
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
    addModal.classList.add("addModal");
    form.appendChild(inputLabel);
    form.appendChild(input);
    form.appendChild(submitBtn);
    addModal.appendChild(form);
    return addModal;
}

function showAll(projectList) {
    const content = document.querySelector(".content");
    const newContent = document.createElement("div");
    for (const proj of projectList.projects) {
        const title = document.createElement("p");
        title.textContent = proj.name;
        newContent.appendChild(title);
        addTasks(newContent, proj);
    }
    content.replaceChildren();
    content.appendChild(newContent);
}

function addTasks(domParent, proj) {
    for (let i = 0; i < proj.tasks.length; ++i) {
        const task = proj.tasks[i];
        const expandableTask = document.createElement("div");
        const showBtn = document.createElement("button");
        const taskTitle = document.createElement("input");
        const taskTitleLabel = document.createElement("label");
        const desc = document.createElement("input");
        const descLabel = document.createElement("label")
        const dueDate = document.createElement("input");
        const dueDateLabel = document.createElement("label");
        const prio = document.createElement("select");
        const prioLabel = document.createElement("label");
        const optHigh = document.createElement("option");
        const optMed = document.createElement("option");
        const optLow = document.createElement("option");

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
        desc.value = task.desc
        desc.addEventListener("change", (event) => {
            if (event.target.value.length > 0) {
                task.desc = event.target.value;
            }
        })

        dueDateLabel.textContent = "Due ";
        dueDate.setAttribute("type", "date");
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
            optLow.setAttribute("selected", "")
        }
        prio.appendChild(optHigh);
        prio.appendChild(optMed);
        prio.appendChild(optLow);
        prio.addEventListener("input", (event) => {
            task.prio = event.target.value;
        })

        descLabel.style.display = "none";
        dueDateLabel.style.display = "none";
        prioLabel.style.display = "none";

        showBtn.textContent = "+";
        showBtn.classList.add("showBtn");
        showBtn.addEventListener("click", () => {
            if (showBtn.textContent === "+") {
                showBtn.textContent = "-";
                descLabel.style.display = "block";
                dueDateLabel.style.display = "block";
                prioLabel.style.display = "block";
            } else {
                showBtn.textContent = "+";
                descLabel.style.display = "none";
                dueDateLabel.style.display = "none";
                prioLabel.style.display = "none";
            }
        });

        taskTitleLabel.appendChild(taskTitle);
        descLabel.appendChild(desc);
        dueDateLabel.appendChild(dueDate);
        prioLabel.appendChild(prio);
        expandableTask.appendChild(taskTitleLabel);
        expandableTask.appendChild(showBtn);
        expandableTask.appendChild(descLabel);
        expandableTask.appendChild(dueDateLabel);
        expandableTask.appendChild(prioLabel);
        domParent.appendChild(expandableTask);
    }

}

export function updateContent(project) {
    const content = document.querySelector(".content");
    const newContent = document.createElement("div");
    const title = document.createElement("p");
    title.textContent = project.name;
    newContent.appendChild(title);
    addTasks(newContent, project);
    content.replaceChildren();
    content.appendChild(newContent);
}
