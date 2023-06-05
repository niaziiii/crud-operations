type UserType = {
  email?: string;
  email_verified?: boolean;
  family_name?: string;
  given_name?: string;
  locale?: string;
  nickname?: string;
  name?: string;
  picture?: string;
  sid?: string;
  sub?: string;
  updated_at?: string;
};

type EntitiesDataType = {
  id: string;
  name: string;
  type: string;
  status: string;
  age: number;
  gender: string;
  phone: number;
  graduate: boolean | string;
  image: string;
  joining: string;
  coordinates: number[] | string;
  address: string | null;
};

export type { UserType, EntitiesDataType };
