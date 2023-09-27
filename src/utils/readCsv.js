const HEADERS = ["EmpId", "ProjectID", "DateFrom", "DateTo"];
const keys = ["employeeId", "projectId", "dateFrom", "dateTo"];

export function parseCsvFile(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const text = fileReader.result;
            
            const lines = text.split('\n');
            
            const containsHeaders = lines[0].split(',').every(element => {
                return HEADERS.includes(element);
              });
            containsHeaders && lines.shift();
            const csvData = lines.map((line) => {
                const data = line.split(',');
                const employeeObj = {};
                for (const [index, value] of data.entries()) {
                    employeeObj[keys[index]] = value.trim();
                  }
                return employeeObj;
            });

            resolve(csvData);
        };
        
        fileReader.onerror = () => {
            reject("Error reading file");
        };

        fileReader.readAsText(file);
    });
}