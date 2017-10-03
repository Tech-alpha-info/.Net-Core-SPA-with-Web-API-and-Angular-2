import { DataService } from './../../services/todo.service';
import { TodoItem } from './../../models/todo.model';
import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';



@Component({
    templateUrl: './editgrid.component.html',
})
export class EditGridComponent implements OnInit, OnDestroy {

    rows = [];
    editing = {};
    public todoitem: TodoItem;
    private subscription: Subscription;
    private gearsDisplay: boolean = false;


    constructor(private dataservice: DataService, public toastr: ToastsManager, viewContainer: ViewContainerRef) {
        
        this.toastr.setRootViewContainerRef(viewContainer);
        this.refreshGridData();
        this.showInfo("To Edit records, just double click the field and edit it..");
    }

   

  

    ngOnInit() {

        // If a change event occurs somewhere else in the app (in our case it'll be in the 'addForm' component)
        // refresh the data in the grid...
        this.subscription = this.dataservice.notifyObservable$.subscribe((res) => {

            console.log("Event - Data was changed elsewhere...");

            if (res.hasOwnProperty('option') && res.option === 'onSubmit') {
                this.refreshGridData();
            }
        });
    }



    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


    refreshGridData() {
        this.dataservice.GetData().subscribe(data => {
            this.rows = data;
        });
    }



    delete(event, rowIndex) {
        this.gearsDisplay = true;
        this.todoitem = this.rows[rowIndex];
        var id = this.rows[rowIndex].id;

        console.log('inline delete rowIndex', rowIndex);

        this.dataservice.deleteTodoById(id).subscribe(data => {
            this.showSuccess("Your Record has been Removed.");
            this.gearsDisplay = false;
            this.refreshGridData();
        });
    }



     


    updateValue(event, cell, rowIndex) {

        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.todoitem = this.rows[rowIndex];

        var id = this.rows[rowIndex].id;
        var value = event.target.value;

      
        console.log('inline editing rowIndex', rowIndex)
        //this.rows = [...this.rows];
        console.log('UPDATED!', this.rows[rowIndex][cell]);
        console.log(this.rows[rowIndex]);
        console.log(id);
        console.log("cell - " + cell);
        console.log("value - " + value);
        console.log("todoitem - " + this.todoitem);
         

        switch (cell) {
            case "name":
                this.todoitem.name = value;
                break;

            case "details":
                this.todoitem.details = value;
                break;

            case "iscomplete":
                this.todoitem.iscomplete = (value == "true" ? true : false);   
                break;
        }

        this.dataservice.UpdateToDo(id, this.todoitem).subscribe(data => {
            this.refreshGridData();
            this.showSuccess("Your Record has been updated.");
        });
    }




    showSuccess(message: string) {
        this.toastr.success(message, 'Success');
    }

    showError(message: string) {
        this.toastr.error(message, 'Error');
    }

    showWarning(message: string) {
        this.toastr.warning(message, 'Alert');
    }

    showInfo(message: string) {
        this.toastr.info(message);
    }





}


