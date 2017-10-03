import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { TodoItem } from './../models/todo.model';
import { AppConfig } from './../app.config';


// REST calls to webapi service...
@Injectable()
export class DataService {
    public todoitem: TodoItem;
    public headers: Headers;
    public apiurl: string;
    public data: any;
    public error: string;
    private notify = new Subject<any>();

    notifyObservable$ = this.notify.asObservable();


    public notifyOther(data: any) {
        console.log("notifyOther");
        this.notify.next(data);
    }

 
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string, private config: AppConfig) {
        
     
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.apiurl = config.getConfig('api-host') + "api/todo/";  

        console.log(this.apiurl);
    }


    GetData(): Observable<TodoItem[]> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(this.apiurl, options)
            .map(response => response.json())
            .catch(this.handleError);
    }

   

    GetById(id: number): Observable<TodoItem> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(this.apiurl + id, options)
            .map(response => {
              
                return new TodoItem(response.json());
            })
            .catch(this.handleError);
    }





   CreateToDo(item: TodoItem): Observable<TodoItem> {

       let headers = new Headers();
       headers.append('Content-Type', 'application/json');

       let options = new RequestOptions({ headers: headers });
       let body = JSON.stringify(item);

       console.log(body);


       return this.http.post(this.apiurl, body, options)
            .map((Response) => {
                return new TodoItem(Response.json());
            })
            .catch(this.handleError);
    }





   UpdateToDo(id: number, item: TodoItem): Observable<TodoItem> {

       let headers = new Headers();
       headers.append('Content-Type', 'application/json');

       let options = new RequestOptions({ headers: headers });
       let body = JSON.stringify(item);


       return this.http
           .put(this.apiurl + id, body, options)
           .map(response => {
               return new TodoItem(response.json());
           })
           .catch(this.handleError);

   }



   public deleteTodoById(id: number): Observable<null> {
       return this.http
           .delete(this.apiurl + id)
           .map(response => null)
           .catch(this.handleError);
   }


       private handleError(error: Response | any) {
           console.error('ApiService::handleError', error);
           return Observable.throw(error);
       }



}  

