console.log("This is some template text");

// sidebar first
// what do we want to store the projects in?
// array probably
// Array that contains each project
// Project object that contains an array of todos

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


