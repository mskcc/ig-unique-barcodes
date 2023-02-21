// import FileSaver from 'file-saver';
// import Excel from 'exceljs';

export const exportCSV = (barcodeData, plateType) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    
  
    today = mm + '-' + dd + '-' + yyyy;
    let fileName = 'IGO-Unique-barcodes.csv';
    const filePath =  'smb://skimcs/MohibullahLab/Sample and Project Management/PlateBarcodePrinterFile/IGO-Unique-barcodes.csv';

    let csvContent = "";
    barcodeData.forEach(function(rowArray) {
        let row = rowArray + ",";
        csvContent += row + "\r\n";
    });
 
    var encodedUri = encodeURI(filePath);
    var link = document.createElement("a");

    link.setAttribute("href", filePath);
    var fs = require('fs');
    fs.open(filePath, 'rs+', function (err, f) {
      console.log('Saved!');
    });
    link.setAttribute("download", csvContent);
    document.body.appendChild(link);
    link.click(); // Downloads the file
    document.body.removeChild(link);
  };

  /** Below is a working code for export xlsx */
    // let workbook = new Excel.Workbook();
    // workbook.creator = 'IGO';
    // workbook.lastModifiedBy = 'IGO';
    // workbook.created = new Date();
    // workbook.modified = new Date();
    // workbook.lastPrinted = new Date();
    // let uniqueBarcodes = workbook.addWorksheet('UniquePlateBarcodes');

    // console.log("barcodeData.length = " + barcodeData.length);
    // let header = uniqueBarcodes.getRow(1).getCell(1);
    // header.alignment = {
    //   vertical: 'middle',
    //   horizontal: 'center',
    //   wrapText: true,
    // };
    // header.value = "Generated Barcodes";
    // header.font = { bold: true };
    // header.width = 25;
    // header.height = 20;
    
    //for (let i = 0; i < barcodeData.length + 2; i++) {
      // let cell = uniqueBarcodes.getRow(i+2).getCell(1);
      // if (barcodeData[i]) {
      //   cell.value = barcodeData[i];
      // } else {
      //   cell.value = '';
      // }
    //}
    // workbook.xlsx.writeBuffer().then(function (data) {
    //   var blob = new Blob([data], {
    //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //   });
    //   FileSaver.saveAs(blob, `${fileName}.xlsx`);
    // });