const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const{path} = require('path');
const fs = require('fs')

const download = async(req, res) => {
    const {id, month} = req.body
    try{    
        const response = await prisma.Trips.findMany({
        where:{
            employeeId: id
        }
    });

      var downloadRecords = response?.filter((record) => {
      const extractedMonth = record.departureTime[3];
      return extractedMonth == month && (record.adminApproval == 1  && record.supApproval == 1 && record.dirApproval ==1) ;
    });
  }
    catch(err){
        res.status(500).json({"error in getting records from db": err})
    }
    
    
    const headers = Object.keys(downloadRecords[0]);
    const rows = []; 

    for (const record of downloadRecords) {
      const row = []; 
      for (const header of headers) {
        row.push(record[header] ?? "null"); 
      }
      rows.push(row.join(",")); 
    }
    try{
    const csvContent = [headers.join(","), ...rows].join("\n");

    
    const filePath = `${__dirname}/trip_${month}.csv`
    console.log(filePath,csvContent)
    fs.writeFileSync(filePath, csvContent, "utf-8");

    res.status(200).json({ message: "File downloaded successfully!", filePath });
    } 
  catch (error) {
    console.error("Error downloading records:", error);
    res.status(500).json({ error: "Failed to download records." });
  }
}

module.exports = {download}
