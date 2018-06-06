import { TestBed, inject } from '@angular/core/testing';

import { AlDataService } from './al-data.service';

import { Data } from '../../../al-data/src/lib/data';
import { ReportData } from '../../../al-data/src/lib/al-reports/report-data';
import { Report } from '../../../al-data/src/lib/al-reports/report';

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

const simpleData1 = {
  id: 'string1',
  formId: 'formString',
  formVersion: 2,
  data: {
    data: '',
    toSum: 2,
    toConcat: 'line 2'
  },
  created: new Date()
};

const simpleData2 = {
  id: 'string2',
  formId: 'formString2',
  formVersion: 1,
  data: { data: 'data' },
  created: new Date()
};

const simpleData3 = {
  id: 'string3',
  formId: 'formString',
  formVersion: 2,
  data: {
    toSum: 3,
    toConcat: 'line 3'
  },
  created: new Date()
};


const fieldCount = {
  id: 'fieldCount',
  fieldId: 'data',
  name: 'Count',
  type: 'count',
  data: {
    source: 'form',
    id: 'formString'
  }
};

const fieldSum = {
  id: 'fieldCount',
  fieldId: 'toSum',
  name: 'Sum',
  type: 'sum',
  data: {
    source: 'form',
    id: 'formString'
  }
};

const fieldConcat = {
  id: 'fieldCount',
  fieldId: 'toConcat',
  name: 'Concat',
  type: 'concat',
  data: {
    source: 'form',
    id: 'formString'
  }
};

const fieldCountResults = {
  label: 'Count',
  value: '1'
};

const fieldSumResults = {
  label: 'Sum',
  value: '6'
};

const fieldConcatResults = {
  label: 'Concat',
  value: 'line 1line 2line 3'
};

const report = {
  id: 'report-id',
  version: 1,
  sources: [{
    source: 'form',
    id: 'formString'
  }],
  name: 'Report',
  fields: [
    fieldCount,
    fieldSum,
    fieldConcat
  ],
};

const reportResults = [
  fieldCountResults,
  fieldSumResults,
  fieldConcatResults
];


describe('AlDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlDataService]
    });
  });

  it('should be created', inject([AlDataService], (service: AlDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should add data', inject([AlDataService], (service: AlDataService) => {
    (service as any).add(simpleData);

    // This is testing at the source with the knowledge of how the class works.
    // Not ideal.
    expect((service as any).data[0]).toBe(simpleData);
  }));

  it('should be able to get data by id', inject([AlDataService], (service: AlDataService) => {
    (service as any).add(simpleData);

    expect(service.getById('string')).toBe(simpleData);
  }));

  it('should be able to get data by form id', inject([AlDataService], (service: AlDataService) => {
    (service as any).add(simpleData);

    expect(service.getByFormId('formString')).toContain(simpleData);
  }));

  it('should get one result when getting by form id', inject([AlDataService], (service: AlDataService) => {
    service.save(simpleData);
    service.save(simpleData2);

    expect(service.getByFormId('formString').length).toBe(1);
  }));

  it('should get two results when getting by form id', inject([AlDataService], (service: AlDataService) => {
    service.save(simpleData);
    service.save(simpleData1);
    service.save(simpleData2);

    expect(service.getByFormId('formString').length).toBe(2);
  }));

  it('should add data when saving data', inject([AlDataService], (service: AlDataService) => {
    service.save(simpleData);

    expect(service.getByFormId('formString')).toContain(simpleData);
  }));

  it('should edit data when saving data', inject([AlDataService], (service: AlDataService) => {
    const localSimpleData = Object.assign({}, simpleData);
    service.save(localSimpleData);

    const localSimpleData2 = Object.assign({}, localSimpleData);
    (localSimpleData2 as any).data = { data: 'updated data' };
    service.save(localSimpleData2);

    expect(service.getById('string')).not.toBe(localSimpleData2);
    expect(service.getById('string').data.data).toBe('updated data');
  }));

  it('should edit formVersion when saving data', inject([AlDataService], (service: AlDataService) => {
    const localSimpleData = Object.assign({}, simpleData);
    service.save(localSimpleData);

    const localSimpleData2 = Object.assign({}, localSimpleData);
    localSimpleData2.formVersion = 2;
    service.save(localSimpleData2);

    expect(service.getById('string')).not.toBe(localSimpleData2);
    expect(service.getById('string').formVersion).toBe(2);
  }));

  it('should not edit formId or created when saving data', inject([AlDataService], (service: AlDataService) => {
    const localSimpleData = Object.assign({}, simpleData);
    service.save(localSimpleData);

    const localSimpleData2 = Object.assign({}, localSimpleData);
    localSimpleData2.formId = 'string2';
    localSimpleData2.created = new Date(localSimpleData.created.getTime() + 60 * 1000);
    service.save(localSimpleData2);

    expect(service.getById('string').formId).not.toBe('string2');
    expect(service.getById('string').created).not.toBe(localSimpleData2.created);
  }));

  it('should get a count of 1 from a count request', inject([AlDataService], (service: AlDataService) => {
    service.save(simpleData);
    service.save(simpleData1);
    service.save(simpleData2);
    service.save(simpleData3);
    const data = {};
    data[fieldCount.data.id] = service.getByFormId(fieldCount.data.id);

    expect((service as any).processField(fieldCount, data)).toEqual(fieldCountResults);
  }));

  it('should get a count of 1 from a sum request', inject([AlDataService], (service: AlDataService) => {
    service.save(simpleData);
    service.save(simpleData1);
    service.save(simpleData2);
    service.save(simpleData3);
    const data = {};
    data[fieldSum.data.id] = service.getByFormId(fieldSum.data.id);

    expect((service as any).processField(fieldSum, data)).toEqual(fieldSumResults);
  }));

  it('should get a \'line 1line 2line 3\' from a concat request', inject([AlDataService], (service: AlDataService) => {
    service.save(simpleData);
    service.save(simpleData1);
    service.save(simpleData2);
    service.save(simpleData3);
    const data = {};
    data[fieldConcat.data.id] = service.getByFormId(fieldConcat.data.id);

    expect((service as any).processField(fieldConcat, data)).toEqual(fieldConcatResults);
  }));

  it('should get a \'line 1line 2line 3\' from generating a report', inject([AlDataService], (service: AlDataService) => {
    service.save(simpleData);
    service.save(simpleData1);
    service.save(simpleData2);
    service.save(simpleData3);

    expect(service.generateReport(report)).toEqual(reportResults);
  }));

});
