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
  position: 0,
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
    component.submit(simpleData).then(data => {
      expect(data.data).toBe(simpleData);
    });
  });

  it('should return an empty object from loadData if no data has been set', () => {
    expect((component as any).loadData()).toEqual({});
  });

  it('should return the simpleData object from loadData if thes formId and dataId are set', () => {
    component.formId = simpleData.formId;
    component.submit(simpleData).then(data => {
      component.dataId = data.id
      expect((component as any).loadData()).toEqual(simpleData);
    });
  });

});
