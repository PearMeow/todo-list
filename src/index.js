console.log("This is some template text");
import * as dom from "./dom.js";

const projects = [];

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
