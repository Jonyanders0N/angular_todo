import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map } from "rxjs";
import { Todo } from "./todo.model";

const apiData = 'http://localhost:3000/';

@Injectable({
    providedIn: 'root',
})
export class TodoService {

    private httpClient = inject(HttpClient);

    getTodos(){
        return this.httpClient.get<Todo[]>(`${apiData}todos`);
    }

    getTodos2(){
        return this.httpClient.get<Todo[]>(`${apiData}todos`)
            .pipe(map((todos: Todo[]) => todos));
    }

    addTodo(todo: string) {
        return this.httpClient.post<Todo>(`${apiData}todos`, {
            title: todo,
            done: false
        }).pipe(map((res: Todo) => res))
    }

    deleteTodo(id: string) {
        return this.httpClient.delete<Todo>(`${apiData}todos/${id}`)
            .pipe(map((res: any) => res));
    }
}