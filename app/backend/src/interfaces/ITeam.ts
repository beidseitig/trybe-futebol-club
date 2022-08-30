export default interface ITeam {
  id: number;
  teamName: string;
}

export interface Team {
  getAll(): Promise<ITeam[]>;
  getById(id: number): Promise<ITeam | null>;
}

export interface TeamData {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}
