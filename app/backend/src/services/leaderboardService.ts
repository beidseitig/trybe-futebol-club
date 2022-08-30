import { MatchCreation } from '../interfaces/IMatch';
import ITeam, { TeamData } from '../interfaces/ITeam';
import MatcheService from './matchService';
import TeamService from './teamService';

const infoTable = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

export default class LeaderBoardService {
  static async getLeaderboard() {
    const teams = await TeamService.getAll();
    const finishedMatches = await MatcheService.getFinished();

    const teamData: TeamData[] = teams.map((team: ITeam) => {
      this.resetTable();
      infoTable.name = team.teamName;
      this.statisticCalculator(team, finishedMatches);
      return { ...infoTable };
    });

    teamData.sort((next, prev) => prev.totalPoints - next.totalPoints);

    const ordenatedMatches = LeaderBoardService.leaderboard(teamData);
    return ordenatedMatches;
  }

  static resetTable() {
    infoTable.name = '';
    infoTable.totalGames = 0;
    infoTable.totalVictories = 0;
    infoTable.totalDraws = 0;
    infoTable.totalLosses = 0;
    infoTable.totalPoints = 0;
    infoTable.goalsFavor = 0;
    infoTable.goalsOwn = 0;
    infoTable.goalsBalance = 0;
    infoTable.efficiency = 0;
  }

  static statisticCalculator(times: ITeam, finishedMatches: MatchCreation[]) {
    finishedMatches.forEach((match: MatchCreation) => {
      if (times.id === match.homeTeam) {
        infoTable.totalGames += 1;
        infoTable.totalVictories += match.homeTeamGoals > match.awayTeamGoals ? 1 : 0;
        infoTable.totalDraws += match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
        infoTable.totalLosses += match.homeTeamGoals < match.awayTeamGoals ? 1 : 0;
        infoTable.totalPoints = (infoTable.totalVictories * 3) + infoTable.totalDraws;
        infoTable.goalsFavor += match.homeTeamGoals;
        infoTable.goalsOwn += match.awayTeamGoals;
        infoTable.goalsBalance = infoTable.goalsFavor - infoTable.goalsOwn;
        infoTable.efficiency = Number(((infoTable.totalPoints / (infoTable.totalGames * 3)) * 100)
          .toFixed(2));
      }
    });
  }

  static leaderboard = async (teamData: TeamData[]) =>
    teamData.sort((prev, next) => {
      if (next.totalPoints === prev.totalPoints) {
        if (next.totalVictories === prev.totalVictories && next.goalsBalance === prev.goalsBalance
          && next.goalsFavor === prev.goalsFavor) {
          return prev.goalsOwn - next.goalsOwn;
        }
        if (next.totalVictories === prev.totalVictories
           && next.goalsBalance === prev.goalsBalance) {
          return next.goalsFavor - prev.goalsFavor;
        }
        if (next.totalVictories === prev.totalVictories) {
          return next.goalsBalance - prev.goalsBalance;
        }
      }
      return next.totalVictories - prev.totalVictories;
    });
}
