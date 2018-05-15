import { Component, ViewChild, OnInit, forwardRef, Inject, DoCheck, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { TbTemplateComponent } from '../../tb-template.component';
import { TempBuilderService } from '../../temp-builder.service'
import { SharedDataService } from '../../../shared-data.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, DoCheck {
  @Input() data: any;
  @Input() autofocus: boolean;
  @Input() disabled = false;
  @Input() editable = false;
  public itemClick: boolean;
  value: any;
  tableData = [];
  showItem = true;
  inComponent = false;
  guid = '';
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  @Output() onFocus: EventEmitter<any> = new EventEmitter();

  @Output() onBlur: EventEmitter<any> = new EventEmitter();
  hover: boolean;

  focus: boolean;
  tblcols = [
    { field: 'Column0', header: '' },
    { field: 'Column1', header: 'Column1' },
    { field: 'Column2', header: 'Column2' }];
  tbldata = [
    { 'Column0': 'Row0', 'Column1': '', 'Column2': '' },
    { 'Column0': 'Row1', 'Column1': '', 'Column2': '' }
  ];
  onModelChange: Function = () => { };

  onModelTouched: Function = () => { };


  @HostListener('focusout', ['$event.target'])
  onFocusout(target) {

    this.setData();
  }

  constructor( @Inject(forwardRef(() => TempBuilderService)) private tbService: TempBuilderService,
    private sharedData: SharedDataService) { }

  ngOnInit() {
    this.guid = this.data.guid;
    this.inComponent = this.data.inComponent;
    this.setData();
  }

  setData() {
    this.tableData = [];

    this.editable = false;
    if (!this.inComponent) {
      this.tableData.push(this.tblcols);
      this.tableData.push(this.tbldata);
      this.data.value = this.tableData;
    }
    else {
      this.tableData = this.data.value;
      this.tblcols = this.data.value['0'];
      this.tbldata = this.data.value['1'];
      this.inComponent = false;
    }
    this.sharedData.setDataToTemplateItem('table', this.data.value);
  }

  delRow(rowIndex) {
    const tempData = this.tbldata;
    const item = tempData.splice(rowIndex, 1);
    this.tbldata = tempData.filter(function (el) {
      return el['Column0'] !== item['Column0'];
    });
    this.setDataForTable();
  }

  setDataForTable() {
    this.tableData = [];
    this.tableData.push(this.tblcols);
    this.tableData.push(this.tbldata);
    this.data.value = this.tableData;
    this.sharedData.setDataToTemplateItem('table', this.data.value);
  }

  addCol() {
    const num = this.tblcols.length;
    this.tblcols = [...this.tblcols, { field: 'Column' + num.toString(), header: 'Column' + num.toString() }];
    this.tbldata.forEach(function (el) {
      return el['Column' + num.toString()] = '';
    });
    this.setDataForTable();
  }
  ngDoCheck() {
    // console.log(this.cars);
  }
  addRow() {
    let stringBuilder = '{';
    for (let i = 0; i < this.tblcols.length; i++) {
      if (this.tblcols[i]['field'] === 'Column0') {
        stringBuilder = stringBuilder + '\"' + this.tblcols[i]['field'].toString() +
          '\":' + '\"Row' + (this.tbldata.length).toString() + '\"';
      }
      else {
        stringBuilder = stringBuilder + ','
        stringBuilder = stringBuilder + '\"' + this.tblcols[i]['field'].toString() + '\":\"\"';
      }
    }
    stringBuilder = stringBuilder + '}';
    const dataRow = JSON.parse(stringBuilder);
    this.tbldata = [...this.tbldata, dataRow];
    this.setDataForTable();
  }
  delcol(header) {
    for (let i = 0; i < this.tbldata.length; i++) {
      delete this.tbldata[i][header];
    }
    for (let i = 0; i < this.tblcols.length; i++) {
      if (this.tblcols[i]['field'] === header) {
        this.tblcols.splice(i, 1);
      }
    }
    this.setDataForTable();
  }

  onEditableInputClick(event) {
    this.itemClick = true;
    // this.bindDocumentClickListener();
  }

  onEditableInputFocus(event) {
    this.focus = true;
    // this.hide();
  }

  onInputFocus(event) {
    this.focus = true;
    this.editable = false;
    // this.onFocus.emit(event);
  }

  onInputBlur(event) {
    this.focus = false;
    this.onModelTouched();
    this.onBlur.emit(event);
  }

  onKeydown(event) {
    this.editable = false;
  }

  deleteItem(guid) {
    this.showItem = false;
    const index = this.sharedData.templateData.findIndex(el => el.id === 'table' && el.guid === guid);

    this.sharedData.templateData.splice(index, 1);

  }

  openSettings(data) {
    this.tbService.emitChangeNav(data);
  }
  onEditableInputChange(event) {
    this.value = event.target.value;
    // this.updateSelectedOption(this.value);
    this.onModelChange(this.value);
    this.onChange.emit({
      originalEvent: event,
      value: this.value
    });
  }
}
