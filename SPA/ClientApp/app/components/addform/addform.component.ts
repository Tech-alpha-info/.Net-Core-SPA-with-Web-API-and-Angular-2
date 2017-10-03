import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './../../services/todo.service';
import { TodoItem } from './../../models/todo.model';
import { Subscription } from 'rxjs/Subscription';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';



@Component({

    selector: 'add-form',
    templateUrl: './addform.component.html',
    animations: [
        trigger('SliderAnimation', [
            state('hidden', style({ height: '0px' })),
            state('shown', style({ height: '480px' })),
            transition('* => *', animate(300))
        ])]

})


export class AddFormComponent {

    public newRecord: TodoItem;
    expanded: boolean = false;
    addForm: FormGroup;
    formFields: any;                    
    requiredAlert: string = 'This field is required';
    state: string = 'hidden';


    constructor(private fb: FormBuilder, private dataservice: DataService, public toastr: ToastsManager, viewContainer: ViewContainerRef) {

        this.toastr.setRootViewContainerRef(viewContainer);

        // Set up the fields validation...
        this.addForm = fb.group({
            'name': [null, Validators.required],
            'complete': '',
            'details': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(500)])],
         
        });

    }

    clickCancel() {
        this.expanded = false;
        this.state = 'hidden';
    }

    clickAddNew() {
        this.expanded = true;
        this.state = 'shown';
    }


    // Add a record...
    addPost(formFields) {

        this.newRecord = new TodoItem();
        this.newRecord.name = formFields.name;
        this.newRecord.details = formFields.details;
        this.newRecord.iscomplete = this.addForm.get('complete').value;

        if (!this.newRecord.iscomplete) {
            this.newRecord.iscomplete = false;
        }
      
        console.log(" before - " + JSON.stringify(this.newRecord));

        this.dataservice.CreateToDo(this.newRecord).subscribe(data => {
            this.newRecord = data;
            this.dataservice.notifyOther({ option: 'onSubmit', value: 'Create' });
            this.clickCancel();
            this.showSuccess("The record has been created.");
        });


        console.log(" after - " + JSON.stringify(this.newRecord));



    }



    showSuccess(message: string) {
        this.toastr.success(message, 'Success');
    }



}




