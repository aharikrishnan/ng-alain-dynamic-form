import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { STColumn } from '@delon/abc';
import { SFSchema, SFComponent } from '@delon/form';
// import { SFRadioWidgetSchema } from '@delon/form';


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
    properties: {
      type:{
        type: "string",
        title: "Type of bid",
        enum: [
          { label: 'Limited', value: 'limited' },
          { label: 'Single', value: 'single' }
        ],
        default: 'limited',
      },
      sub_type:{
        type: "string",
        title: "Type of bid",
        enum: [
          { label: 'RFP (Single Stage Bidding)', value: 'single_stage_bidding' },
          { label: 'RFP (Multi Stage Bidding)', value: 'multi_stage_bidding' },
        ],
        default: 'single_stage_bidding',
      },
      title:{
        type: "string",
        title: "Title/ Name of the Bid",
      },
      sector:{
        type: "string",
        title: "Choose sector of the Bid",
        enum: [
          { label: 'Consulting', value: 'consulting' }
        ],
        default: 'consulting',
      },
      validity_days:{
        type: "number",
        title: "Duration of the Bid (Days)",
      },
      bid_value:{
        type: "object",
        title: "Duration of the Bid (Days)",
        properties: {
            type: { 
              type: 'string',
              enum: [
                { label: 'Absolute (Lakhs)', value: 'absolute' },
                { label: 'Commission (%)', value: 'comission' }
              ],
            },
            value: { type: 'number' },
            // currency: { type: 'string', default: 'INR' }
        }
      },
    },
    required: [ 'type', 'sub_type' ],
    ui: {
      spanLabel: 4,
      spanControl: 5
    }

  };

  constructor(public msg: NzMessageService) { }

  ngAfterViewInit(): void { }

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