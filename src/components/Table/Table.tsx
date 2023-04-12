import {
  useTable,
  useFilters,
  useSortBy,
  useGlobalFilter,
  Cell,
} from "react-table";
import "./table.scss";
import { Link } from "react-router-dom";

interface Props {
  columns: any;
  data: any;
}

export default function Table({ columns, data }: Props) {
  const tableInstance = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={
                  column.isSorted
                    ? column.isSortedDesc
                      ? "sort-desc"
                      : "sort-asc"
                    : ""
                }
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>
                    <Link to={`/products/${cell.row.original.id}`}>
                      {cell.render("Cell")}
                    </Link>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
