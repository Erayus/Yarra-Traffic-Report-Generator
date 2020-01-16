  // Input: [{date_captured:"YYYY-MMM", volume_per_day: value<Number>}]
    // Output : [
    //  {"YYYY-MMM": {
    //      "volume_per_day": volume_per_day<Number>
    //      "no_of_records": value<Number>
    // }}]
export const aggregateData  = (data, keyDataName, aggregatingDataName) => {
    return data.reduce((aggregated, curData) => {
        let key = curData[keyDataName];
        aggregated[key] = aggregated[key] || {};
        aggregated[key][aggregatingDataName] =  aggregated[key][aggregatingDataName] ?  +aggregated[key][aggregatingDataName] + +curData[aggregatingDataName] : +curData[aggregatingDataName];
        aggregated[key]["no_of_data"] = ++aggregated[key]["no_of_data"] || 1;
        return aggregated;  
    },{});
}

// Input: aggregatedData
// Output: [{"date_captured": "YYYY-MMM", "volume_per_day": value<Number>}] 
export const averageData = (data, keyDataName, aggregatedDataName ) => {
    let averagedDataArray = [];
    let id = 0;
    for (let keyData of Object.keys(data)) {
        let averageDataObj = {};
        averageDataObj["id"] = ++id;
        averageDataObj[keyDataName] = keyData;
        averageDataObj[aggregatedDataName] =  (data[keyData][aggregatedDataName] / data[keyData]["no_of_data"]).toFixed(2);
        averagedDataArray.push(averageDataObj)
    } 

    return averagedDataArray
}