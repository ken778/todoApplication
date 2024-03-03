import { Component } from "@angular/core";
import { TodosService } from "../../services/todos.service";

@Component({
    selector: "app-todos-header",
    templateUrl: "./header.component.html",

})

export class HeaderComponent {

    text: string = ""
    isInputValid: boolean = false

    constructor(private todoService: TodosService) { 
       
    }
    changeText(event: Event): void {
        const target = event.target;

        if (target instanceof HTMLInputElement) {
            this.text = target.value;
        }
    }
    addTodo(): void {
        if(this.text==''){
            alert("can not submit an empty task, please enter a task name");
        }else{
            this.todoService.addTodo(this.text)
            this.text = "";
        }
       
       
    }
}