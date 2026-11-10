import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  Sun,
} from 'lucide-react';
import { describeWeatherCode, type WeatherKind } from '../../lib/weather';

const ICONS: Record<WeatherKind, typeof Sun> = {
  clear: Sun,
  'partly-cloudy': CloudSun,
  cloudy: Cloud,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  thunderstorm: CloudLightning,
};

// Icon for a WMO weather code from Open-Meteo.
export default function WeatherIcon({
  code,
  className,
}: {
  code: number;
  className?: string;
}) {
  const Icon = ICONS[describeWeatherCode(code).kind];
  return <Icon className={className} aria-hidden="true" />;
}
