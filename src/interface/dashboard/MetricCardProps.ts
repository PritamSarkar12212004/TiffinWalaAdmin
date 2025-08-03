export interface MetricCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
  gradient?: boolean;
  subtitle?: string;
}

export interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  icon: string;
  iconColor?: string;
}