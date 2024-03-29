import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { TodoInterface } from "../../types/todo.interface";
import { TodosService } from "../../services/todos.service";

@Component({
    selector: "app-todos-todo",
    templateUrl: "./todo.component.html",

})

export class TodoComponent implements OnInit, OnChanges {
    @Input('todo') todoProps!: TodoInterface
    @Input('isEditing') isEditingProps!: boolean;
    editingText: string = '';
    @Output('setEditingId') setEditingIdEvent: EventEmitter<
        string | null
    > = new EventEmitter();
    @ViewChild('textInput')
    textInput!: ElementRef;

    constructor(private todosService: TodosService) { }
    ngOnInit(): void {
        this.editingText = this.todoProps.text;
    }



    ngOnChanges(changes: SimpleChanges) {
        console.log('changes', changes);
        if (changes["isEditingProps"].currentValue) {
            setTimeout(() => {
                this.textInput.nativeElement.focus();
            }, 0);
        }
    }
   
    //click to enable editing
    setTodoInEditMode(): void {
        console.log('setTodoInEditMode');
        this.setEditingIdEvent.emit(this.todoProps.id);
    }

    //delete task
    removeTodo(): void {
        console.log('removeTodo');
        this.todosService.removeTodo(this.todoProps.id);
    }

    //mark task as completed
    toggleTodo(): void {
        console.log('toggleTodo');
        this.todosService.toggleTodo(this.todoProps.id);
    }


    changeText(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.editingText = value;
        console.log('changeText');
    }

    changeTodo(): void {
        console.log('change todo', this.editingText);
        this.todosService.changeTodo(this.todoProps.id, this.editingText);
        this.setEditingIdEvent.emit(null);
    }
}