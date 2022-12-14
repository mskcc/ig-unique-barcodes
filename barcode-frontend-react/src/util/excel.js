import FileSaver from 'file-saver';
import Excel from 'exceljs';

export const exportExcel = (barcodeData, plateType) => {
    let workbook = new Excel.Workbook();
  
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
  
    today = mm + '-' + dd + '-' + yyyy;
    let fileName = `IGO-Unique-Barcodes-${plateType}-${today}`;
    workbook.creator = 'IGO';
    workbook.lastModifiedBy = 'IGO';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();
  
    let uniqueBarcodes = workbook.addWorksheet('UniquePlateBarcodes');
  
    let sheetColumns = [];
    // add columns first to be able to reference them by key during formatting step
    barcodeData.forEach((columnDef) => {
      sheetColumns.push({
        header: columnDef.columnHeader,
        key: columnDef.data,
        width: 20,
      });
      console.log("columnDef.data = " + columnDef.data);
    });
    uniqueBarcodes.columns = sheetColumns;
    let headerRow = uniqueBarcodes.getRow(1);
    headerRow.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true,
    };
    headerRow.height = 20;
    headerRow.font = { bold: true };
    uniqueBarcodes.addRows(barcodeData);

    barcodeData.forEach((columnDef) => {
      // ADD EXISTING VALUES
      //  need to do this in the column loop because adding dataValidation to a cell creates new rows
      console.log("barcodeData.length = " + barcodeData.length);
      for (let i = 0; i < barcodeData.length + 2; i++) {
        let cell = uniqueBarcodes.getRow(i+2).getCell(1);
        if (barcodeData[i]) {
          cell.value = barcodeData[i][1];
        } else {
          cell.value = '';
        }
        console.log(cell);
      }
    });
    workbook.xlsx.writeBuffer().then(function (data) {
      var blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, `${fileName}.xlsx`);
    });
  };