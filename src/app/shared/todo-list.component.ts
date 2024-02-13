import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { Todo } from "../core/todo.model";

@Component({
    standalone: true,
    selector: 'todo-list',
    templateUrl: 'todo-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, CommonModule]
})

export class TodoListComponent {
    @Input() todo!: BehaviorSubject<Todo[]>;
    @Input() index!: number;
    @Output() onDelete = new EventEmitter<void[]>();
    
    ngOnInit(): void {
        this.todo.subscribe((value: Todo[]) => value);
    }

}