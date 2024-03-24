export interface WeatherHour {
    dt: number;
    humidity: number;
    temp: number;
    weather: WeatherCondition[];
}

export interface WeatherCondition {
  description: string;
  icon: string;
}
