import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BadInput } from '../errors/bad-input';
import { NotFoundError } from '../errors/not-found-error';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { AppError } from '../errors/app-error';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
@Injectable()
export class DataService {

  constructor(@Inject(String) private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url)
      .pipe(catchError(this.handleError));
  }

  getPerAction(action) {
    return this.http.get(this.url + action)
      .pipe(catchError(this.handleError));
  }

  create(resource) {
    return this.http.post(this.url, resource)
      .pipe(catchError(this.handleError));
  }

  postPerAction(action, resource) {
    return this.http.post(this.url + action, resource)
      .pipe(catchError(this.handleError));
  }

  update(id, resource) {
    return this.http.put(this.url + '/' + id, resource)
      .pipe(catchError(this.handleError));
  }

  putPerAction(action, id, resource) {
    return this.http.put(this.url + action + '/' + id, resource)
      .pipe(catchError(this.handleError));
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .pipe(catchError(this.handleError));
  }

  deletePerAction(action, id) {
    return this.http.delete(this.url + action + '/' + id)
      .pipe(catchError(this.handleError));
  }

  public handleError(errorObj: HttpErrorResponse) {
    console.log('service', errorObj);
    if (errorObj.status === 400) {
      return throwError(new BadInput(errorObj.error));
    }
    if (errorObj.status === 404) {
      return throwError(new NotFoundError());
    }
    if (errorObj.status === 403) {
      return throwError(new NotAuthorizedError());
    }
    if (errorObj.status === 401) {
      return throwError(new NotAuthorizedError());
    }
    return throwError(new AppError(errorObj));
  }

  downloadObjectAsJson(exportObj, exportName) {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', exportName + '.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  ExportTOExcel(reportName, table) {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, reportName + '.xlsx');
  }

  public ExportJsonAsExcelFile(excelFileName: string, json: any[]): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { Sheet1: worksheet }, SheetNames: ['Sheet1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '.xlsx');
  }
}
