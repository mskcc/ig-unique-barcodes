import FileSaver from 'file-saver';
import Excel from 'exceljs';

export const exportExcel = (columns) => {
    let workbook = new Excel.Workbook();
  
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
  
    today = mm + '-' + dd + '-' + yyyy;
    let fileName = `IGO-Unique-Barcodes-${today}`;
    workbook.creator = 'IGO';
    workbook.lastModifiedBy = 'IGO';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();
  
    let uniqueBarcodes = workbook.addWorksheet('UniquePlateBarcodes');
  
    let sheetColumns = [];
    // add columns first to be able to reference them by key during formatting step
    columns.forEach((columnDef) => {
      sheetColumns.push({
        //header: columnDef.columnHeader,
        key: columnDef.data,
        width: 20,
      });
    });
    uniqueBarcodes.columns = sheetColumns;
    let headerRow = "Generated Barcodes";
    headerRow.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true,
    };
    headerRow.height = 20;
    headerRow.font = { bold: true };
    // FILL
    columns.forEach((columnDef) => {
      // ADD EXISTING VALUES
      //  need to do this in the column loop because adding dataValidation to a cell creates new rows
      for (let i = 0; i < columns.length; i++) {
        let cell = uniqueBarcodes.getRow(i).getCell(`${columnDef.data}`);
        columns[i] && console.log(columns[i][columnDef.data]);
        if (columns[i]) {
          cell.value = columns[i][columnDef.data];
          // if (columnDef.type === 'numeric' && cell.value !== '') {
          //   cell.value = parseFloat(cell.value);
          // }
        } else {
          cell.value = '';
        }
      }
    });
    workbook.xlsx.writeBuffer().then(function (data) {
      var blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, `${fileName}.xlsx`);
    });
  };