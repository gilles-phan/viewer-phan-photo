import { ShootingProps } from "./Shootings.interface";

export const sortByShootingDate = (s1:ShootingProps, s2:ShootingProps) => new Date(s1.date).getTime() - new Date(s2.date).getTime()