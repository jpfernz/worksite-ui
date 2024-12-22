import {
  ColumnSortState,
  CsvExportParams,
  ExcelExportParams,
} from 'ag-grid-community';

export interface StatusBarSettings {
  exportSettings?: () => ExcelExportParams | CsvExportParams;
  defaultState?: {
    defaultColumns: () => ColumnSortState[];
  };
}
