export interface KudosCategory {
  id: number;
  name: string;
}

export interface KudosTeam {
  id: number;
  name: string;
}

export interface KudosRecipient {
  id: number;
  name: string;
}

export interface KudosCreator {
  id: number;
  name: string;
}

export class Kudos {
  constructor(
    public readonly id: number,
    public readonly message: string,
    public readonly createdBy: KudosCreator,
    public readonly recipients: KudosRecipient[],
    public readonly team: KudosTeam,
    public readonly category: KudosCategory,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
