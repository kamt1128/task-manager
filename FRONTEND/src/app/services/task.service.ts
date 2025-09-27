import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get('http://localhost:3000/tasks');
  }

  createTask(task: { title: string; description: string }) {
    return this.http.post('http://localhost:3000/tasks', task);
  }

  updateTask(id: number, task: { title: string; description: string; status: string }) {
    return this.http.put(`http://localhost:3000/tasks/${id}`, task);
  }
  
  deleteTask(id: number) {
    return this.http.delete(`http://localhost:3000/tasks/${id}`);
  }
}
