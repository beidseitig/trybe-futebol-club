import { Model, INTEGER, STRING, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './team';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: STRING,
    allowNull: false,
  },
  awayTeam: {
    type: STRING,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: STRING,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
});

Matches.belongsTo(Team, { foreignKey: 'homeTeam', targetKey: 'id' });

Matches.belongsTo(Team, { foreignKey: 'awayTeam', targetKey: 'id' });

Matches.hasMany(Team, { foreignKey: 'id', sourceKey: 'homeTeam' });

Matches.hasMany(Team, { foreignKey: 'id', sourceKey: 'awayTeam' });

export default Matches;
