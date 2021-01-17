import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/customer/";

@Injectable({ providedIn: "root" })
export class AddressService {


  constructor(private http: HttpClient, private router: Router) {}

  getCountries(){
    return this.http.get<{message:String,result:[]}>(environment.apiUrl + '/util/countries')
  }

  getStates(country:string){
    return this.http.get<{message:String,result:[]}>(environment.apiUrl + '/util/states/' + country)
  }

  getCities(state:string){
    return this.http.get<{message:String,result:[]}>(environment.apiUrl + '/util/cities/' + state)
  }
}
