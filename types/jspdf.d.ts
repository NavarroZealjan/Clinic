/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "jspdf" {
  export default class jsPDF {
    constructor(
      orientation?: string,
      unit?: string,
      format?: string | number[]
    );

    internal: {
      pageSize: {
        width: number;
        height: number;
      };
      pages: any[];
    };

    setFillColor(r: number, g: number, b: number): void;
    rect(
      x: number,
      y: number,
      width: number,
      height: number,
      style?: string
    ): void;
    setTextColor(r: number, g: number, b: number): void;
    setFontSize(size: number): void;
    setFont(fontName: string, fontStyle?: string): void;
    text(text: string, x: number, y: number): void;
    addPage(): void;
    setPage(page: number): void;
    save(filename: string): void;

    autoTable: (options: any) => void;
    lastAutoTable: {
      finalY: number;
    };
  }
}

declare module "jspdf-autotable" {
  // This module extends jsPDF
}
