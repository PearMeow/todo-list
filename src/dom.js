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
        const taskTitle = document.createElement("p");
        const desc = document.createElement("p");
        const dueDate = document.createElement("p");
        const prio = document.createElement("p");

        showBtn.textContent = ">";
        showBtn.classList.add("showBtn");
        taskTitle.classList.add("taskTitle");
        taskTitle.textContent = task.title;
        desc.textContent = task.desc
        dueDate.textContent = "Due " + format(task.dueDate, "yyyy/MM/dd")
        prio.textContent = task.prio + " priority";
        showBtn.addEventListener("click", () => {
            if (showBtn.textContent === ">") {
                showBtn.textContent = "<";
                expandableTask.appendChild(desc);
                expandableTask.appendChild(dueDate);
                expandableTask.appendChild(prio);
            } else {
                showBtn.textContent = ">";
                expandableTask.removeChild(desc);
                expandableTask.removeChild(dueDate);
                expandableTask.removeChild(prio);
            }
        });
        expandableTask.appendChild(showBtn);
        expandableTask.appendChild(taskTitle);
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
