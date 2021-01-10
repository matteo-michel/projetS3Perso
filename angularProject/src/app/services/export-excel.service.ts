import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }

  exportExcel(excelData): void {
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(title);


    worksheet.addRow([]);

    const headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' }
      };
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      };
    });

    data.forEach(d => {
        const row = worksheet.addRow(d);
      }
    );

    worksheet.getColumn(3).width = 15;
    worksheet.addRow([]);

    // let footerRow = worksheet.addRow(['Employee Sales Report Generated from example.com at ' + date]);
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFB050' }
    // };

    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, title + '.xlsx');
    });


  }
}
