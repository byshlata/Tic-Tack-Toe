// x = 1, o = -1

import { SymbolEnum } from 'enums';
import { Nullable, PlayMatrixType } from 'types';

class CheckWin {
  protected matrix: PlayMatrixType = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  readonly winX = 3;

  readonly winO = -3;

  readonly lastMovie = 8;

  protected counter = 1;

  static sumLine = (lines: Nullable<number>[]): Nullable<number> =>
    lines.reduce((ac, el) => (el ? Number(ac) + el : null), 0);

  public check = (newMatrix: PlayMatrixType): Nullable<SymbolEnum> => {
    this.counter += 1;

    this.matrix = newMatrix;
    let data = this.checkMatrixRow(this.matrix);

    if (data) {
      return data;
    }

    data = this.checkMatrixColumn();

    if (data) {
      return data;
    }

    data = this.checkRow(this.nonPrincipalDiagonal());

    if (data) {
      return data;
    }

    data = this.checkRow(this.principalDiagonal());

    if (data) {
      return data;
    }

    if (this.counter > this.lastMovie) {
      return SymbolEnum.Tie;
    }

    return null;
  };

  public resetCounter = (): void => {
    this.counter = 0;
  };

  private checkMatrixColumn = (): Nullable<SymbolEnum> => {
    for (let i = 0; i < this.matrix.length; i += 1) {
      const column = [];
      for (let j = 0; j < this.matrix[0].length; j += 1) {
        column.push(this.matrix[j][i]);
      }
      const win = CheckWin.sumLine(column);

      if (win === this.winX) {
        return SymbolEnum.X;
      }

      if (win === this.winO) {
        return SymbolEnum.O;
      }
    }
    return null;
  };

  private nonPrincipalDiagonal = (): Nullable<number>[] =>
    this.matrix.map((_, index) => this.matrix[index][this.matrix.length - index - 1]);

  private principalDiagonal = (): Nullable<number>[] =>
    this.matrix.map((_, index) => this.matrix[index][index]);

  private checkMatrixRow = (newMatrix: PlayMatrixType): Nullable<SymbolEnum> => {
    for (let i = 0; i < newMatrix.length; i += 1) {
      const win = CheckWin.sumLine(newMatrix[i]);

      if (this.checkOne(win)) {
        return this.checkOne(win);
      }
    }

    return null;
  };

  private checkRow = (row: Nullable<number>[]): Nullable<SymbolEnum> => {
    const win = CheckWin.sumLine(row);

    return this.checkOne(win);
  };

  private checkOne = (win: Nullable<number>): Nullable<SymbolEnum> => {
    if (win === this.winX) {
      return SymbolEnum.X;
    }

    if (win === this.winO) {
      return SymbolEnum.O;
    }

    return null;
  };
}

export const check = new CheckWin();
