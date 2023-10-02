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

const newMatch = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true,
};

const updateMatchBody = {
  homeTeamGoals: 5,
  awayTeamGoals: 1,
};

const updatedMatch = {
  ...newMatch,
  homeTeamGoals: 5,
  awayTeamGoals: 1,
};

const finishedMessage = { message: "Finished" };

const notFoundMessage = { message: "No match found." };

const matchWithSameTeamId = {
  ...newMatch,
  homeTeamId: 16,
  awayTeamId: 16,
};

const matchWithInvalidTeamId = {
  ...newMatch,
  homeTeamId: 500,
}

const invalidIdMessage = {
  message: "There is no team with such id!",
};

const equalTeamsMessage = {
  message: "It is not possible to create a match with two equal teams",
};

export {
  matches,
  newMatch,
  updatedMatch,
  finishedMessage,
  updateMatchBody,
  notFoundMessage,
  matchWithSameTeamId,
  invalidIdMessage,
  equalTeamsMessage,
  matchWithInvalidTeamId,
};
