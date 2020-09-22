import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json' , })
};

const httpheader = {
  headers: new HttpHeaders({'Content-Type': 'multipart/form-data' ,  })
};

const httpOptionNew = {
  headers: new HttpHeaders({'Content-Type': 'application/json' , 'Access-Control-Allow-Origin': '*' })
};
@Injectable({
  providedIn: 'root'
})
export class AppService {
  id;
  url = "http://127.0.0.1:8000/"
  img;
  constructor(private http:HttpClient) { }

  public login(e): Observable<any>{
    return this.http.post(this.url + 'login/',JSON.stringify(e) , httpOptions);

  }

  public getProfile():Observable<any>{
    return this.http.get(this.url + 'profile/');

  }



  public getProfileId(e):Observable<any>{
    this.id = e
    return this.http.get(this.url + 'profile/?id=' + this.id);

  }

  public postProfile(e):Observable<any>{
    return this.http.post(this.url + 'profile/' , JSON.stringify(e), httpOptions);

  }

  public putProfile(e):Observable<any>{
    return this.http.put(this.url + 'profile/' , JSON.stringify(e), httpOptions);

  }




  public deleteProfile(e):Observable<any>{
    this.id = e
    return this.http.delete(this.url + 'profile/?id=' + this.id, httpOptions);

  }


  public ImageUpload(e):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/upload/',e );

  }

  public getImageUpload(e):Observable<any>{
    this.img =e
    return this.http.get('http://127.0.0.1:8000/upload/?mobile_number=' + this.img );

  }


}
