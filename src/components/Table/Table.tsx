import { VacationData } from "../../models/Table";
import style from "./style.module.css";

export interface TableProps {
  tableData: VacationData[];
}

export default function Table({ tableData }: TableProps) {
  if (!tableData.length) return null;

  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th>ФИО</th>
          <th>Общий заработок</th>
          <th>Размер отпускных</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.totalIncome}</td>
            <td>{row.vacationPay.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
