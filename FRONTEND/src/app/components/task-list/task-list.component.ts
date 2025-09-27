import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private _taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this._taskService.getTasks().subscribe((data: any) => {
      this.tasks = data;
    });
  }

  deleteTask(id: number) {
    this._taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  completeTask(task: Task) {
    this._taskService.updateTask(task.id!, { ...task, status: 'completed' }).subscribe(() => {
      this.loadTasks();
    });
  }
}
