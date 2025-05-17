export interface Recipient {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Media {
  id: number;
  url: string;
  type: string;
}

export interface Creator {
  id: number;
  name: string;
}

export class Kudos {
  constructor(
    public readonly id: number,
    public readonly message: string,
    public readonly createdBy: Creator,
    public readonly recipients: Recipient[],
    public readonly team: Team,
    public readonly category: Category,
    public readonly tags: Tag[] = [],
    public readonly media: Media[] = [],
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
