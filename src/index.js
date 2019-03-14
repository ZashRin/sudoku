module.exports = function solveSudoku(matrix) {
  // your solution
  solve(matrix, 0, 0);
  return matrix;
}

function solve(grid, row, col) {
  let cell = findUnassignedLocation(grid, row, col);
  row = cell[0];
  col = cell[1];

  if (row == -1) return true;

  for (let num = 1; num <= 9; num++) {
    if ( noConflicts(grid, row, col, num) ) {   
      grid[row][col] = num;
      if ( solve(grid, row, col) ) return true;
      grid[row][col] = 0;
    }
  }

  return false;
}

function findUnassignedLocation(grid, row, col) {
  for (; row < 9; col = 0, row++)
    for (; col < 9; col++)
      if (grid[row][col] == 0) 
        return [row, col];

  return [-1, -1];
}

function noConflicts(grid, row, col, num) {
  return isRowOk(grid, row, num) && isColOk(grid, col, num) && isBoxOk(grid, row, col, num);
}

function isRowOk(grid, row, num) {
  for (let col = 0; col < 9; col++)
      if (grid[row][col] == num)
          return false;

  return true;
}

function isColOk(grid, col, num) {
  for (let row = 0; row < 9; row++)
    if (grid[row][col] == num)
      return false;

  return true;    
}

function isBoxOk(grid, row, col, num) {
  row = Math.floor(row / 3) * 3;
  col = Math.floor(col / 3) * 3;

  for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++)
          if (grid[row + r][col + c] == num)
              return false;

  return true;
}