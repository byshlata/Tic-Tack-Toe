import React, { ReactElement } from 'react';

import style from './Cell.module.sass';

type CellType = {
  value: number | null;
  rowIndex: number;
  columnIndex: number;
  callback: (column: number, row: number) => void;
};

const CHECK_FOR_AN_EVEN = 2;
const border = '2px solid';
export const Cell = ({
  rowIndex,
  columnIndex,
  callback,
  value,
}: CellType): ReactElement => {
  const onChangeCell = (): void => {
    callback(rowIndex, columnIndex);
  };

  return (
    <div
      style={{
        borderRight: `${columnIndex < CHECK_FOR_AN_EVEN ? border : 'none'}`,
        borderLeft: `${columnIndex > 0 ? border : 'none'}`,
        borderBottom: `${rowIndex < CHECK_FOR_AN_EVEN ? border : 'none'}`,
        borderTop: `${rowIndex > 0 ? border : 'none'}`,
      }}
      className={style.cell}
    >
      <button className={style.button} type="button" onClick={onChangeCell}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {value === 1 ? 'x' : value === -1 ? 'o' : ''}
      </button>
    </div>
  );
};
