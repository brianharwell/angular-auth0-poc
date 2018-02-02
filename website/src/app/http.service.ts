import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient) { }

    callApi(token: string) : Observable<string[]> {
        return this.httpClient.get('http://localhost:41135/api/values', { headers: { 'Authorization': `Bearer ${token}` }})
            .map(response => response as string[]);
    }
}
