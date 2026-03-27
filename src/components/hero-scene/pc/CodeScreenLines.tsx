export type CodeLine = {
  y: number;
  width: number;
  x: number;
  color: string;
  height?: number;
};

export const MAIN_CODE_LINES: CodeLine[] = [
  { y: 0.29, width: 0.38, x: -0.27, color: '#d9b6b6' },
  { y: 0.235, width: 0.29, x: -0.315, color: '#98c379' },
  { y: 0.18, width: 0.33, x: -0.295, color: '#e5c07b' },
  { y: 0.125, width: 0.26, x: -0.33, color: '#d19a66' },
  { y: 0.07, width: 0.3, x: -0.31, color: '#7f848e' },
  { y: 0.015, width: 0.23, x: -0.345, color: '#c678dd' },
  { y: -0.04, width: 0.54, x: -0.19, color: '#d8b14c' },
  { y: -0.095, width: 0.28, x: -0.32, color: '#98c379' },
  { y: -0.15, width: 0.32, x: -0.3, color: '#e5c07b' },
  { y: -0.205, width: 0.23, x: -0.345, color: '#61afef' },
];
