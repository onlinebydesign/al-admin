import { FlashMessagesService, FlashMessagesModule } from 'angular2-flash-messages';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

import { FormComponent } from './form.component';
import { DataFormsService } from '../data-forms.service';
import { AlDataService } from '../../al-data.service';

const simpleData = {
  id: 'string',
  formId: 'formString',
  formVersion: 1,
  data: {
    data: 'data',
    toSum: 1,
    toConcat: 'line 1'
  },
  created: new Date()
};

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [
        ReactiveFormsModule,
        FormlyModule.forRoot(),
        // FormlyBootstrapModule,
        FormsModule,
        FlashMessagesModule.forRoot()
      ],
      providers: [
        DataFormsService,
        AlDataService,
        FlashMessagesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the data included as a data property when submit is called', () => {
    expect(component.submit(simpleData).data).toBe(simpleData);
  });

  it('should return an empty object from loadData if no for or data has been set', () => {
    expect((component as any).loadData()).toEqual({});
  });

  it('should return an empty object from loadData if no for or data has been set', () => {
    component.formId = simpleData.formId;
    component.dataId = component.submit(simpleData).id
    expect((component as any).loadData()).toEqual(simpleData);
  });

});
