import { StatusCodes } from 'http-status-codes';
import Team from '../database/models/team';
import Matches from '../database/models/matches';
import ErrorHandler from '../helpers/errorHandler';
import { MatchCreation, MatchGoals } from '../interfaces/IMatch';

export default class MatchService {
  static async getAll(): Promise<Matches[]> {
    const matches = await Matches.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches as Matches[];
  }

  static async addMatch(teamsInfo: MatchCreation): Promise<MatchCreation> {
    if (teamsInfo.homeTeam === teamsInfo.awayTeam) {
      throw new ErrorHandler(
        StatusCodes.UNAUTHORIZED,
        'It is not possible to create a match with two equal teams',
      );
    }

    const homeTeam = await Team.findOne({ where: { id: teamsInfo.homeTeam } });

    const awayTeam = await Team.findOne({ where: { id: teamsInfo.awayTeam } });

    if (!homeTeam || !awayTeam) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }

    const newMatch = await Matches.create({ ...teamsInfo, inProgress: 1 });

    return newMatch;
  }

  static async finishMatch(id: number): Promise<void> {
    await Matches.update({ inProgress: false }, { where: { id } });
  }

  static async matchGoals(id: number, goals: MatchGoals): Promise<void> {
    await Matches.update({ ...goals }, { where: { id } });
  }
}
