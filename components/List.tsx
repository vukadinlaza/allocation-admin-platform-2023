'use client';
import { useAuthContext } from '@/app/context';
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import numeral from 'numeral';

export const getColor = (str: string) => {
  let color;
  switch (str) {
    case 'Completed':
      color = 'success';
      break;
    case 'Processing':
      color = 'warning';
      break;

    default:
      color = 'warning';
      break;
  }
  return color;
};

const generateCell = (item: any, column: any) => {
  const no_info = 'None';
  if (!item || !column || !column.key) {
    return no_info;
  }
  if (
    column.key === 'subscription_amount' ||
    column.key === 'capital_wired_amount'
  ) {
    if (!item[column.key]) return `$0`;
    return `$${numeral(item[column.key]).format('0,0') || 0}`;
  }
  if (column.key === 'status' || column.key === 'tax_status')
    return (
      <Chip
        label={item[column.key] || no_info}
        // color={getColor(item[column.key])}
        color="warning"
        className="text-white capitalize"
      />
    );
  if (
    column.key === 'sign_deadline' ||
    column.key === 'created_at' ||
    column.key === 'started_at'
  )
    return dayjs(item[column.key]).format('DD/MM/YYYY') || no_info;
  if (column.key === 'entities') {
    if (item[column.key] && column.sub_key) {
      return item.entities[column.sub_key];
    }
    return item[column.key] ? item[column.key].length : 0;
  }
  return <span>{item[column.key] ? item[column.key] : no_info}</span>;
};

export default function List({
  headers = null,
  type = null,
  data = null
}: {
  headers: any;
  type: any;
  data: any;
}) {
  const { setSlideOver } = useAuthContext();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {headers &&
              headers.map((x: any, i: any) => (
                <TableCell align="left" key={i}>
                  <span className="text-lg text-bold">{x.label}</span>
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((item: any, index: any) => (
              <TableRow
                key={index}
                className="transition cursor-pointer hover:bg-gray-50"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => {
                  if (type) setSlideOver(true, item, type);
                }}
              >
                {headers &&
                  headers.map((column: any, i: any) => {
                    return (
                      <TableCell align="left" key={i}>
                        {generateCell(item, column)}
                      </TableCell>
                    );
                  })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
