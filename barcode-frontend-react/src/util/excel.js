// import FileSaver from 'file-saver';
// import Excel from 'exceljs';
import axios from 'axios';
import {BACKEND} from '../configs/config';

export const exportCSV = (barcodeData, plateType) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    
  
    today = mm + '-' + dd + '-' + yyyy;
    // let fileName = `IGO-Unique-Barcodes-${plateType}-${today}.csv`;
    let fileName = 'IGO-Unique-barcodes.csv';
    const filePath =  `/mnt/mohibullahlab/Sample and Project Management/PlateBarcodePrinterFile/${fileName}`;

    // let csvContent = "data:text/csv;charset=utf-8,";
    let csvContent = "";
    barcodeData.forEach(function(rowArray) {
        let row = rowArray + ",";
        csvContent += row + "\r\n";
    });
  //   var client = require('scp2');
  //   client.scp('IGO-Unique-barcodes.csv', {
  //     host: 'example.com',
  //     username: 'admin',
  //     password: 'password',
  //     path: filePath
  // }, function(err) {});

    // let CSVFile = new Blob([csvContent], {
    //   type: "csv"
    // });
    var encodedUri = encodeURI(filePath);
    // window.open(encodedUri);
    var link = document.createElement("a");
    
    // var url = new URL(filePath);
    // link.href = URL.createObjectURL(CSVFile);
    // link.download = encodedUri;
    // link.style.display = "none";

    // link.setAttribute("href", filePath);
    // link.setAttribute("target", csvContent);
    // link.setAttribute("download", fileName);
    // document.body.appendChild(link);
    // fs.writeFile("IGO-Unique-barcodes.csv", csvContent);
    // link.click(); // Downloads the file
    //document.body.removeChild(link);

      const url = `${BACKEND}/api/getBarcode/writeToFile`;
      return axios
          .post(url, {
            fileName: filePath,
            fileData: csvContent,
          })
          .then((resp) => {
              console.log(resp);
              if (resp.status === 1) {
                alert('CSV file successfully exported to "//skimcs/MohibullahLab/Sample and Project Management/PlateBarcodePrinterFile/IGO-Unique-barcodes.csv"');
              }
              return resp;
          })
          .catch((error) => {
              throw error;
          })
          .then((resp) => {
              return resp;
          });

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