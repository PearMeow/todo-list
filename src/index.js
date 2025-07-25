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
        this.completed = false;
        this.id = crypto.randomUUID();
    }
}

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

if (storageAvailable("localStorage")) {
    console.log("Local storage available");
} else {
    console.log("Local storage unavailable");
}

const projectList = new ProjectList();

projectList.addProject("Chores");
projectList.addProject("Homework");
projectList.addProject("Projects");

projectList.projects[0].addTask("Lock in", "Do some work", "2025-07-22", "High");
projectList.projects[1].addTask("Lock in", "Do some work", "2025-07-22", "High");
projectList.projects[1].addTask("Lock in", "Do some work", "2025-07-22", "High");
projectList.projects[2].addTask("Lock in", "Do some work", "2025-07-22", "High");
projectList.projects[2].addTask("Lock in", "Do some work", "2025-07-22", "High");
projectList.projects[2].addTask("Lock in", "Do some work", "2025-07-22", "High");

dom.updateSidebar(projectList);
dom.showAll(projectList);

console.log(JSON.stringify(projectList));
