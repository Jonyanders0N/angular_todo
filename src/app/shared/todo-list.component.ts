import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Todo } from "../core/todo.model";

@Component({
    standalone: true,
    selector: 'todo-list',
    templateUrl: 'todo-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, CommonModule]
})

export class TodoListComponent implements OnChanges {
    @Input() todo!: BehaviorSubject<Todo[]>;
    @Input() index!: number;
    @Output() onDelete = new EventEmitter();
    
    ngOnChanges(): void {
        // console.log("ngOnInit");
        this.todo.subscribe((value: Todo[]) => value);
    }

    checkBoxValue(event: any) {
        console.log(event.checked);
    }

}