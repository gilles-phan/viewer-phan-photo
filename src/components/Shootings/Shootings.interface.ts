export interface ShootingProps {
  uuid: string;
  label: string;
  description: string;
  image_path: string;
  thumbnail: string;
  date: string;
  hidden?: number;
  tags: number | null;
  type: number | null;
  nb_photos: number |null;
}
export interface ShootingCardProps {
  shooting: ShootingProps
}