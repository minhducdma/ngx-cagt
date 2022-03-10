import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import 'ckeditor';
import { config } from '../ckeditor-config/ckeditor.config';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'ckeditor-custom',
  templateUrl: './ckeditor-custom.component.html',
  styleUrls: ['./ckeditor-custom.component.scss']
})
export class CKEditorCustomComponent implements ControlValueAccessor, OnInit  {

  @Input() data: number;

  @Output() onComplete = new EventEmitter();

  public countdown: string;


  private ngValue: string;
  ckConfig = config.basicOption;

  constructor() { }
  writeValue(obj: any): void {
    this.ngValue = obj;
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.writeValue(this.data);
  }



}
