export interface ShootingProps {
  uuid: string;
  label: string;
  description?: string;
  imagePath?: string;
  hidden?: boolean;
  date: string;
}
export interface ShootingCardProps {
  shooting: ShootingProps
}