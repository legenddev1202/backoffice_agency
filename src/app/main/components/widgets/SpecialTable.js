import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React from "react";
import { ceil, formattedString } from "../../utils/Function";

function Widget10(props) {
  return (
    <Paper className="w-full rounded-8 shadow">
      <div className="flex items-center justify-between px-16 h-64 border-b-1">
        <Typography className="text-16">{props.data.title}</Typography>
      </div>
      <div className="table-responsive">
        <Table className="w-full min-w-full">
          <TableHead>
            <TableRow>
              {props.data.table.columns.map((column) => (
                <TableCell
                  key={column.id}
                  className="whitespace-nowrap"
                  align="center"
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.table.rows.map((row) => (
              <TableRow key={row.id}>
                {row.cells.map((cell) => {
                  switch (cell.id) {
                    case "left_title": {
                      return (
                        <TableCell key={cell.id} component="th" scope="row">
                          <Typography
                            className={clsx(
                              cell.classes,
                              "inline text-11 font-500 px-8 py-4 rounded-4"
                            )}
                          >
                            {cell.value === 0 ? "" : cell.value}
                          </Typography>
                        </TableCell>
                      );
                    }
                    case "total": {
                      return (
                        <TableCell
                          key={cell.id}
                          rowSpan={5}
                          className="border-l-1"
                          align="center"
                        >
                          {formattedString(cell.value)}
                        </TableCell>
                      );
                    }
                    default: {
                      return (
                        <TableCell
                          key={cell.id}
                          component="th"
                          scope="row"
                          align="center"
                        >
                          <Typography className={cell.classes}>
                            {(row.id === 2 || row.id === 5) && cell.value !== 0
                              ? props.noDolarSign?formattedString(cell.value):`$ ${formattedString(cell.value)}`
                              : formattedString(cell.value)}
                          </Typography>
                        </TableCell>
                      );
                    }
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}

export default React.memo(Widget10);
