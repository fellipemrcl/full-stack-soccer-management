const matches = [
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo",
    },
    awayTeam: {
      teamName: "Internacional",
    },
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "Ferroviária",
    },
    awayTeam: {
      teamName: "Avaí/Kindermann",
    },
  },
];

const match = {
  id: 41,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 9,
  awayTeamGoals: 0,
  inProgress: true,
  homeTeam: {
    teamName: "São Paulo",
  },
  awayTeam: {
    teamName: "Internacional",
  },
};

const inProgressTrueMatch = {
  id: 42,
  homeTeamId: 6,
  homeTeamGoals: 1,
  awayTeamId: 1,
  awayTeamGoals: 0,
  inProgress: true,
  homeTeam: {
    teamName: "Ferroviária",
  },
  awayTeam: {
    teamName: "Avaí/Kindermann",
  },
};

const inProgressTrueMatches = [inProgressTrueMatch];

export { match, matches, inProgressTrueMatch, inProgressTrueMatches };