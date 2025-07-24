import * as dom from "./dom.js";
import "./style.css"

class ProjectList {
    constructor() {
        this.projects = [];
    }

    addProject(name) {
        this.projects.push(new Project(name));
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(title, desc, dueDate, prio) {
        this.tasks.push(new Task(title, desc, dueDate, prio));
    }
};

class Task {
    constructor(title, desc, dueDate, prio) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.prio = prio;
    }
}

const projectList = new ProjectList();

projectList.addProject("Chores");
projectList.addProject("Homework");
projectList.addProject("Projects");

projectList.projects[0].addTask("Lock in", "Do some work", new Date(2025, 7, 22), "high");
projectList.projects[1].addTask("Lock in", "Do some work", new Date(2025, 7, 22), "high");
projectList.projects[1].addTask("Lock in", "Do some work", new Date(2025, 7, 22), "high");
projectList.projects[2].addTask("Lock in", "Do some work", new Date(2025, 7, 22), "high");
projectList.projects[2].addTask("Lock in", "Do some work", new Date(2025, 7, 22), "high");
projectList.projects[2].addTask("Lock in", "Do some work", new Date(2025, 7, 22), "high");

dom.updateSidebar(projectList);
