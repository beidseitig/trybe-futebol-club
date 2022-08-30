export default interface ITeam {
  id: number;
  teamName: string;
}

export interface Team {
  getAll(): Promise<ITeam[]>;
  getById(id: number): Promise<ITeam | null>;
}
