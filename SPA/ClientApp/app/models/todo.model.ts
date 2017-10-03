export class TodoItem {
    id: number;
    name: string;
    details: string;
    iscomplete: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
     
    }
}  

