import { Model, INTEGER, STRING, BOOLEAN } from 'sequelize';
import db from '.';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'Team',
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
      model: 'Team',
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

export default Match;
