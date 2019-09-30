import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { STColumn } from '@delon/abc';
import { SFSchema, SFComponent } from '@delon/form';

@Component({
  selector: 'my-app',
  template: `<sf #sf  [schema]="schema"  [formData]="formData"
    (formSubmit)="submit($event)"
    (formChange)="change($event)"></sf>
    <button (click)="formValid($event)" type="button" nz-button>formValid</button>
    `,
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('sf') sf: SFComponent;

  formData: any = {};
  schema: SFSchema = {
    properties: {},
    ui: {}
  };

  liveValidate = true;
  firstVisual = true;

  constructor(public msg: NzMessageService) { }

  ngAfterViewInit(): void {
    let tempSchema: SFSchema = {
      properties: {
        field_str: {
          type: 'string',
        },
        date: {
          type: 'string',
          title: '时间',
          format: 'date'
        },
        product: {
          type: 'array',
          title: '产品清单',
          maxItems: 4,
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                title: '名称'
              },
              date: {
                type: 'string',
                title: '时间',
                format: 'date'
              }
            },
            required: ['name', 'date']
          },
          ui: { grid: { arraySpan: 12 } }
        }
      },
      required: [],
      ui: {
        spanLabel: 4
      }
    }

    this.sf.refreshSchema(tempSchema);
    let productdata = {};
    productdata['name'] = '名称';
    productdata['date'] = '2018-11-12';
    this.sf.rootProperty['properties']['product'].widget.formProperty.add(productdata);
    this.sf.rootProperty['properties']['date'].setValue('2011-11-11',false);
    this.sf.rootProperty['properties']['date'].resetValue('2011-11-11',false);
  }

  formValid() {
    this.msg.info('valid : ' + this.sf.valid);
  }

  ngOnInit(): void {
  }

  submit(value: any) {
    console.log(JSON.stringify(value))
  }

  change(value: any) {
    console.log('change', value);
  }

}