export interface LineChartData {
  labels: string[],
  datasets: {
    label: string;
    data: number[];
    fill?: boolean;
    borderColor?: string;
    tension?: number;
  }[];
}

export interface ScatterChartData {
  datasets: {
    label: string,
    data: {
      x: number;
      y: number;
    },
    backgroundColor?: string,
  }[];
}

export interface BarChartData {
  labels: string[],
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
}

export interface PieChartData {
  labels: string[],
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    hoverOffset: number;
  }
}