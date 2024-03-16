import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, EventEmitter } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Todo } from "src/app/core/todo.model";
import { TodoService } from "src/app/core/todo.service";
import { TodoListComponent } from "src/app/shared/todo-list.component";

@Component({
    standalone: true,
    selector: 'todo-editor',
    templateUrl: 'todo-editor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, TodoListComponent, CommonModule, ReactiveFormsModule]
})

export default class TodoEditorComponent {
    private todoService = inject(TodoService);
    todos: Todo[] = [];
    inputValue = new FormControl('', Validators.required);

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
        if(!this.inputValue.valid) return;
        if(!this.inputValue.value) return;
        this.todoService.addTodo(this.inputValue.value)
            .subscribe(res => {
                this.todos.push(res);
                this.testEmitter$.next([...this.todos]); // update the view without calling again the json-server   
                this.inputValue.setValue('');
                console.log("add", res);
                // this.getTodos();
            })
    }

    deleteTodo(id: string) {
        this.todoService.deleteTodo(id)
            .subscribe((res) => {
                console.log("deleted", res);
                this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1); // update the view without calling again the json-server
                this.testEmitter$.next([...this.todos]);
                // this.getTodos();
            })
    }
}