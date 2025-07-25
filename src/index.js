import * as dom from "./dom.js";
import "./style.css"

class ProjectList {
    constructor() {
        this.projects = [];
    }

    addProject(name) {
        this.projects.push(new Project(name));
        storage.setItem("projectList", JSON.stringify(projectList));
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(title, desc, dueDate, prio, completed = false, id = null) {
        this.tasks.push(new Task(title, desc, dueDate, prio, completed, id));
        storage.setItem("projectList", JSON.stringify(projectList));
    }

    removeTask(id) {
        for (let i = 0; i < this.tasks.length; ++i) {
            if (this.tasks[i].id === id) {
                this.tasks.splice(i, 1);
            }
        }
        storage.setItem("projectList", JSON.stringify(projectList));
    }
};

class Task {
    constructor(title, desc, dueDate, prio, completed = false, id = null) {
        this._title = title;
        this._desc = desc;
        this._dueDate = dueDate;
        this._prio = prio;
        this._completed = completed;
        if (id === null) {
            this.id = crypto.randomUUID();
        } else {
            this.id = id;
        }
    }
    get title() {
        return this._title;
    }
    get desc() {
        return this._desc;
    }
    get dueDate() {
        return this._dueDate;
    }
    get prio() {
        return this._prio;
    }
    get completed() {
        return this._completed;
    }
    set title(newTitle) {
        this._title = newTitle;
        storage.setItem("projectList", JSON.stringify(projectList));
    }
    set desc(newDesc) {
        this._desc = newDesc;
        storage.setItem("projectList", JSON.stringify(projectList));
    }
    set dueDate(newDueDate) {
        this._dueDate = newDueDate;
        storage.setItem("projectList", JSON.stringify(projectList));
    }
    set prio(newPrio) {
        this._prio = newPrio;
        storage.setItem("projectList", JSON.stringify(projectList));
    }
    set completed(newCompleted) {
        this._completed = newCompleted;
        storage.setItem("projectList", JSON.stringify(projectList));
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

let storage = null;

if (storageAvailable("localStorage")) {
    console.log("Local storage available");
    storage = window["localStorage"];
} else {
    console.log("Local storage unavailable");
}

const projectList = new ProjectList();
if (storage !== null && storage.getItem("projectList") !== null) {
    console.log(storage.getItem("projectList"));
    const storageProjList = JSON.parse(storage.getItem("projectList"));
    for (const project of storageProjList.projects) {
        projectList.addProject(project.name);
        const currProj = projectList.projects[projectList.projects.length - 1];
        for (const task of project.tasks) {
            currProj.addTask(task._title, task._desc, task._dueDate, task._prio, task._completed, task.id);
        }
    }
}

dom.updateSidebar(projectList);
dom.showAll(projectList);

storage.setItem("projectList", JSON.stringify(projectList));
