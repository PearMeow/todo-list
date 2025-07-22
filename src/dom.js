export function updateSidebar(projects) {
    const sidebar = document.querySelector(".sidebar");
    const domProjects = document.createElement("div");
    for (const proj of projects) {
        const projBtn = document.createElement("button");
        projBtn.textContent = proj.name;
        projBtn.addEventListener("click", () => updateContent(proj));
        domProjects.appendChild(projBtn);
    }
    sidebar.replaceChildren();
    sidebar.appendChild(domProjects);
}

export function updateContent(project) {
    const content = document.querySelector(".content");
    const newContent = document.createElement("div");
    for (let i = 0; i < project.tasks.length; ++i) {
        const task = project.tasks[i];
        const domTask = document.createElement("p");
        domTask.textContent = task.title + " " + task.desc + " " + task.dueDate + " " + task.prio;
        newContent.appendChild(domTask);
    }
    content.replaceChildren();
    content.appendChild(newContent);
}
