console.log("This is some template text");
import * as dom from "./dom.js";
import "./style.css"
import { format } from "date-fns";

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

const projects = [];

projects.push(new Project("i am projec"));
projects.push(new Project("i am projec"));
projects.push(new Project("i am projec"));

projects[0].addTask("Lock in", "Do some work", new Date(2025, 7, 22), "high");
projects[0].addTask("Lock in", "Do some work", new Date(2025, 7, 22), "high");
projects[0].addTask("Lock in", "Do some work", new Date(2025, 7, 22), "high");
projects[1].addTask("Lock in", "Do some work", new Date(2025, 7, 22), "high");
projects[1].addTask("Lock in", "Do some work", new Date(2025, 7, 22), "high");
projects[1].addTask("Lock in", "Do some work", new Date(2025, 7, 22), "high");
projects[1].addTask("Lock in", "Do some work", new Date(2025, 7, 22), "high");
projects[2].addTask("Lock in", "Do some work", new Date(2025, 7, 22), "high");

dom.updateSidebar(projects);
