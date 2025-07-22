console.log("This is some template text");
import * as dom from "./dom.js";

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(title, desc, dueDate, prio) {
        this.tasks.push(Task(title, desc, dueDate, prio));
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

const projects = [];

projects.push(new Project("i am projec"));
projects.push(new Project("i am projec"));
projects.push(new Project("i am projec"));
dom.updateSidebar(projects);
