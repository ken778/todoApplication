import { Component } from "@angular/core";
import { TodoInterface } from "../../types/todo.interface";
import { Observable, map } from "rxjs";
import { combineLatest } from 'rxjs';
import { TodosService } from "../../services/todos.service";
import { FilterEnum } from "../../types/filter.enum";


@Component({
    selector: 'app-todos-main',
    templateUrl: './main.component.html',
})

export class MainComponent {
    visibleTodos$: Observable<TodoInterface[]>;
    editingId: string | null = null;
    noTodoClass$!: Observable<boolean>;

    constructor(private todosService: TodosService) {

        this.noTodoClass$ = this.todosService.todos$.pipe(
            map((todos) => todos.length === 0)
        );

        this.visibleTodos$ = combineLatest(
            [this.todosService.todos$, this.todosService.filter$]
        ).pipe(
            map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
                if (filter === FilterEnum.active) {
                    return todos.filter((todo) => !todo.isCompleted);
                } else if (filter === FilterEnum.completed) {
                    return todos.filter((todo) => todo.isCompleted);
                }
                return todos;
            })
        );
    }


} 