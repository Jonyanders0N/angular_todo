import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Todo } from "src/app/core/todo.model";
import { TodoService } from "src/app/core/todo.service";
import { TodoListComponent } from "src/app/shared/todo-list.component";

@Component({
    standalone: true,
    selector: 'todo-editor',
    templateUrl: 'todo-editor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, TodoListComponent, CommonModule]
})

export default class TodoEditorComponent {
    private todoService = inject(TodoService);
    todos: Todo[] = [];
    inputValue = '';

    testEmitter$ = new BehaviorSubject<Todo[]>(this.todos);
    ngOnInit() {
        this.todoService.getTodos().subscribe(todos => {
            this.todos = JSON.parse(JSON.stringify(todos));
            this.testEmitter$.next(todos);
        });
    }

    getTodos() {
        this.todoService.getTodos().subscribe(todos => {
            this.todos = JSON.parse(JSON.stringify(todos)); 
            this.testEmitter$.next(todos);
        })
    }

    addTodo(){
        this.todoService.addTodo(this.inputValue)
            .subscribe(res => {
                this.testEmitter$.next([...this.todos, res]);    
                this.getTodos();
                return res;
            })
    }

    deleteTodo(id: string) {
        this.todoService.deleteTodo(id)
            .subscribe(res => res)
    }
}