import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";

import { CustomerService } from "../customer.service";
import { Customer } from "../customer.model";
import { mimeType } from "./mime-type.validator";
import { AuthService } from "../../auth/auth.service";
import { AddressService } from "src/app/shared/services/address.service";
import { ProductsService } from "src/app/shared/services/products.service";
import { Product } from "src/app/shared/models/product.model";

@Component({
  selector: "app-customer-create",
  templateUrl: "./customer-create.component.html",
  styleUrls: ["./customer-create.component.css"]
})
export class CustomerCreateComponent implements OnInit, OnDestroy {
  enteredTitle = "";
  enteredContent = "";
  post: Customer;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  uploadImage ="assets/image-upload-crop.png";
  countries:[];
  states:[];
  cities:[];
  mode = "create";
  private postId: string;
  private authStatusSub: Subscription;
  hobbiesList = ['Cricket', 'Badminton'];
  public hobbisetValues = [];
  public productsSetValues = [];
  public products: Product[];

  constructor(
    public customerService: CustomerService,
    public route: ActivatedRoute,
    private authService: AuthService,
    private fb:FormBuilder,
    private addressService: AddressService,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.initializeComponent();

  }

  private initializeComponent() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
      this.routeSubscription();
    this.createForm();
    this.getCountries();
    this.getProducts();

  }

  private getCountries(){
    this.addressService.getCountries().subscribe(data=>{
    this.countries = data.result;
    })
  }

  private createForm() {
    this.form = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3)] ],
      email: ['',[Validators.required, Validators.email] ],
      address: ['',Validators.required ],
      city: ['',Validators.required],
      state: ['',Validators.required],
      country:['',Validators.required],

      image:[null,Validators.required,mimeType
      ]
    });
  }

  private routeSubscription() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.customerService.getCustomer(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.form.patchValue(postData);
          this.getStates(this.form.get('country') as FormControl);
          this.getCities(this.form.get('state')  as FormControl);
          this.form.get('image').setValue(postData.imagePath);
          this.hobbisetValues = postData.hobbies;
          this.productsSetValues = postData.products;
          this.imagePreview = this.form.get('image').value;
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });

  }

  onCountryChange(country) {
    if(country) {
      this.states = undefined;
      this.cities = undefined;
      this.form.get('state').setValue(undefined);
      this.form.get('city').setValue(undefined);
      this.getStates(country);
    }

  }

  getStates(country: FormControl){
    this.addressService.getStates(country.value).subscribe(data=>{
      this.states = data.result;
      });
  }

  onStateChange(state: FormControl) {
    if(state) {
      this.cities = [];
      this.form.get('city').setValue(undefined);
      this.getCities(state);
    }

  }

  getCities(state: FormControl){
    this.addressService.getCities(state.value).subscribe(data=>{
      this.cities = data.result;
      });
  }

  getProducts() {
    this.productService.getProducts().subscribe((x) => (this.products = x));
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveCustomer() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.customerService.addcustomer(
        this.form.value
      );
    } else {
      this.customerService.updateCustomer(
        this.postId,
        this.form.value
      );
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
