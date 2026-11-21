export interface Hero {
  _id: string;
  FirstName: string;
  LastName: string;
  jobTitle: string;
}

export interface HeroCopy {
  description: string;
  skills: readonly string[];
}
