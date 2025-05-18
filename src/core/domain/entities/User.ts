export interface Role {
  id: number;
  name: string;
}
export interface Team {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly name: string,
    public readonly roles: Role[],
    public readonly approvalStatus: "Pending" | "Approved" | "Rejected",
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly team: Team
  ) {}

  isSuperAdmin(): boolean {
    return this.roles.some((role) => role.name === "SUPER_ADMIN");
  }

  isAdmin(): boolean {
    return this.roles.some((role) => role.name === "ADMIN");
  }

  isApproved(): boolean {
    return this.approvalStatus === "Approved";
  }

  isPending(): boolean {
    return this.approvalStatus === "Pending";
  }

  isRejected(): boolean {
    return this.approvalStatus === "Rejected";
  }

  getTeamName(): string {
    return this.team.name;
  }
}
