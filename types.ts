
export enum AppView {
  HOME = 'home',
  ADVISOR = 'advisor',
  DIAGNOSIS = 'diagnosis',
  MARKET = 'market',
  DASHBOARD = 'dashboard'
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface CropAnalysisResult {
  status: string;
  confidence: number;
  diagnosis: string;
  recommendations: string[];
}

export interface MarketPrice {
  crop: string;
  price: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}
