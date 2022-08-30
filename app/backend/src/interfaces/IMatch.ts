export default interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}

export interface MatchCreation {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}

export interface MatchGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface Match {
  getAll(): Promise<IMatch[]>;
  addMatch(teamsInfo: MatchCreation): Promise<MatchCreation | void>;
  finishMatch(id: number): Promise<void>;
  matchGoals(id: number, goals: MatchGoals): Promise<void>;
}
