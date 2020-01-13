import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const BasicTable = (props) => {

console.log(props.dataSet);
 const tableHeads = Object.keys(props.dataSet[0]).map((headTitle) => {
     return <th key={headTitle}>{headTitle.replace(/_/g, " ").toUpperCase()}</th>
 });
 const tableRows = props.dataSet.map((row => {
     return (
     <tr key={row["id"]}>
         {Object.keys(row).map((dataKey)=> <td key={dataKey} data={row[dataKey]}>{row[dataKey]}</td>)}
     </tr>
     )
 }))
  return (
      <div className="z-depth-1">
        <MDBTable
        className="z-depth-1" 
        striped 
        scrollY
        maxHeight="390px">
      <MDBTableHead color="elegant-color-dark"  textWhite>
        <tr>
          {tableHeads}
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {tableRows}
      </MDBTableBody>
    </MDBTable>
      </div>
    
  );
}

export default BasicTable;