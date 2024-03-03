import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from "../types/filter.enum";

@Injectable()
export class TodosService {
    todos$ = new BehaviorSubject<TodoInterface[]>([]);
    filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);


    constructor() {
        // Load todos from local storage when the service is created
        this.loadTodosFromLocalStorage();
    }
    private loadTodosFromLocalStorage(): void {
        const storedTodosJson = JSON.parse(<any>localStorage.getItem('todos'));
        const storedTodos = JSON.parse(JSON.stringify(storedTodosJson)) || [];
        this.todos$.next(storedTodos);
    }
    //add a new task
    addTodo(text: string): void {
        const newTodo: TodoInterface = {
            text,
            isCompleted: false,
            id: Math.random().toString(16)
        }
        const updatedTodos = [...this.todos$.getValue(), newTodo]



        const todosArr = JSON.stringify(updatedTodos);
        localStorage.setItem('todos', todosArr);
        console.log('added ', updatedTodos)
        this.loadTodosFromLocalStorage();
    }

    //mark a task as completed
    toggleAll(isCompleted: boolean): void {
        console.log('isCompleted', isCompleted);
        const updatedTodos = this.todos$.getValue().map((todo) => {
            return {
                ...todo,
                isCompleted,
            };
        });
        this.todos$.next(updatedTodos);
    }

    //changing filter
    changeFilter(filterName: FilterEnum): void {
        this.filter$.next(filterName);
    }

    //edit a task
    changeTodo(id: string, text: string): void {
        const updatedTodos = this.todos$.getValue().map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    text,
                };
            }

            return todo;
        });
        // Update local storage
        this.saveTodosToLocalStorage(updatedTodos);

        // Update the BehaviorSubject
        this.todos$.next(updatedTodos);
    }

    //save to local storage
    private saveTodosToLocalStorage(todos: TodoInterface[]): void {
        const todosJson = JSON.stringify(todos);
        localStorage.setItem('todos', todosJson);
    }
    //delete a task
    removeTodo(id: string): void {
        const updatedTodos = this.todos$
            .getValue()
            .filter((todo) => todo.id !== id);

        // Update local storage data
        this.saveTodosToLocalStorage(updatedTodos);

        // Update the BehaviorSubject
        this.todos$.next(updatedTodos);
    }

    toggleTodo(id: string): void {
        const updatedTodos = this.todos$.getValue().map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted,
                };
            }
            return todo;
        });
         // Update local storage
         this.saveTodosToLocalStorage(updatedTodos);

         // Update the BehaviorSubject
         this.todos$.next(updatedTodos);
    }


}