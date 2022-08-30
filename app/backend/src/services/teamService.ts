import Team from '../database/models/team';
import ITeam from '../interfaces/ITeam';

export default class TeamService {
  static async getAll(): Promise<ITeam[]> {
    const teams = await Team.findAll();
    return teams;
  }

  static async getById(id: string): Promise<ITeam | null> {
    const team = await Team.findOne({ where: { id } });
    return team;
  }
}
