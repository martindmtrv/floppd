export interface IEventApi {
  date: Date;
  location: string;
  title: string;
  description: string;
  organizer: string;
  hasAnswered: string[];
  attending: string[];
  flopping: string[];
  __v: number;
  _id: string;
}

export interface Error {
  msg: string;
}

export interface UserProfile {
  name: string;
  darkMode: boolean;
}
