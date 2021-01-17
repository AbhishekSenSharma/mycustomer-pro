import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-checkbox-list",
  templateUrl: "./checkbox-list.component.html",
  styleUrls: ["./checkbox-list.component.css"],
})
export class CheckboxListComponent implements OnInit, OnChanges {
  @Input() items: any[];
  @Input() form: FormGroup;
  @Input() label: string;
  @Input() value: [];
  @Input() controlName: string;
  @Input() isObject: boolean;
  checkedArray = [];
  formCreated: boolean;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value && changes.value.currentValue) {
      this.createForm();
      this.fillValues();
    }
  }

  private createForm() {
    if (this.formCreated) {
      return;
    }
    this.form.addControl(this.controlName, this.formBuilder.array([]));
    this.items.map((x) => this.checkedArray.push(false));
    this.formCreated = true;
  }

  onChange(event) {
    const interests = (<FormArray>this.form.get(this.controlName)) as FormArray;

    if (event.checked) {
      interests.push(new FormControl(event.source.value));
    } else {
      const i = interests.controls.findIndex(
        (x) => x.value === event.source.value
      );
      interests.removeAt(i);
    }
  }

  private fillValues() {
    const interests = (<FormArray>this.form.get(this.controlName)) as FormArray;
    let items = this.items;
    if(this.isObject && this.items.length){
      items = this.items.map(x => {
            return x._id;
      } );
    }
    for (let i of this.value) {
      interests.push(new FormControl(i));
      const item = items.indexOf(i);
      this.checkedArray[item] = true;
    }
  }
}
