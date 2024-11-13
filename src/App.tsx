import { useState } from "react";
import * as XLSX from "xlsx";
import Button from "./components/FileUploader/FileUploader";
import Table from "./components/Table/Table";
import { TableRow, VacationData } from "./models/Table";

function App() {
  const [vacationData, setVacationData] = useState<VacationData[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json<TableRow>(sheet, {
        header: 0,
      });

      calculateVacationPay(sheetData);
    };
    reader.readAsBinaryString(file);
  };

  const calculateVacationPay = (data: TableRow[]) => {
    const vacationDataMap: { [key: string]: { totalIncome: number } } = {};
    let currentEmployee = "";

    data.forEach((row) => {
      const { ФИО: name, ЗП: income } = row;

      // Если в строке есть значение ФИО, обновляем текущего сотрудника
      if (name) {
        currentEmployee = name;
      }

      if (!currentEmployee) return;

      if (!vacationDataMap[currentEmployee]) {
        vacationDataMap[currentEmployee] = { totalIncome: 0 };
      }

      vacationDataMap[currentEmployee].totalIncome += income;
    });

    const vacationDataArray = Object.entries(vacationDataMap).map(
      ([name, { totalIncome }]) => {
        // Рассчитываем среднедневной заработок
        const averageDailyIncome = totalIncome / (12 * 29.3);
        const vacationPay = averageDailyIncome * 28; // 28 - количество дней отпуска
        return { name, totalIncome, vacationPay };
      }
    );

    setVacationData(vacationDataArray);
  };

  return (
    <main>
      <h1>Генерация таблицы из файла XLSX</h1>
      <Button handleFileUpload={handleFileUpload} />
      <Table tableData={vacationData} />
    </main>
  );
}

export default App;
