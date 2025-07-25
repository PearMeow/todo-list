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
        const desc = document.createElement("input");
        const dueDate = document.createElement("input");
        const prio = document.createElement("input");

        showBtn.textContent = ">";
        showBtn.classList.add("showBtn");
        taskTitle.classList.add("taskTitle");
        taskTitle.value = task.title;
        desc.value = task.desc
        dueDate.value = "Due " + format(task.dueDate, "yyyy/MM/dd")
        prio.value = task.prio + " priority";
        desc.style.display = "none";
        dueDate.style.display = "none";
        prio.style.display = "none";
        showBtn.addEventListener("click", () => {
            if (showBtn.textContent === ">") {
                showBtn.textContent = "<";
                desc.style.display = "block";
                dueDate.style.display = "block";
                prio.style.display = "block";
            } else {
                showBtn.textContent = ">";
                desc.style.display = "none";
                dueDate.style.display = "none";
                prio.style.display = "none";
            }
        });
        expandableTask.appendChild(showBtn);
        expandableTask.appendChild(taskTitle);
        expandableTask.appendChild(desc);
        expandableTask.appendChild(dueDate);
        expandableTask.appendChild(prio);
        domParent.appendChild(expandableTask);
    }
}

// function editTask(input) {
//     input.addEventListener("input", (event) => {
//         input.value = event.target.value;
//     })
// }

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
