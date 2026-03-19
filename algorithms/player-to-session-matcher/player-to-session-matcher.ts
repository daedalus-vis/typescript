import { v4 as uuidv4 } from "uuid";

type GameState = "lobby" | "ready" | "started" | "ended";

type GameDifficultly = 1 | 2 | 3 | 4 | 5;

type Player = {
  id: string;
  name: string;
  rank: number;
};

class Game {
  private session: string = uuidv4();
  static maxPlayers: number = 3;
  static difficultyLevels: Record<string, number> = {
    0: 1,
    2000: 2,
    3000: 3,
    4000: 4,
    5000: 5,
  };

  private state: GameState = "lobby";
  private players: Player[] = [];

  host: Player;
  difficulty: GameDifficultly;

  // Returns difficulty setting by player rank
  static difficultyByRank = (rank: number): GameDifficultly => {
    return Object.entries(Game.difficultyLevels).reduce((acc, level) => {
      return rank >= Number(level[0]) ? level[1] : acc;
    }, 1) as GameDifficultly;
  };

  // Add player to the session if there is space, and their rank is acceptable
  addPlayer(player: Player): Boolean {
    if (
      this.players.length < Game.maxPlayers &&
      Game.difficultyByRank(player.rank) === this.difficulty
    ) {
      this.players.push(player);
      console.log(`Added player #${player.name} (Rank ${player.rank})`);
      return true;
    }
    return false;
  }

  matchNextAvailablePlayers(pool: Player[]) {
    console.log(`Matching elgible players to join session...`);
    while (this.players.length < Game.maxPlayers && pool.length > 0) {
      const added = this.addPlayer(pool[0]);
      pool.shift();
      if (added) {
        console.log(
          `Players joined (${this.players.length}/${Game.maxPlayers})`,
        );
      }
    }
    if (this.players.length === Game.maxPlayers) this.state === "ready";
  }

  get gameState() {
    return {
      state: this.state,
      difficulty: this.difficulty,
      players: this.players,
    };
  }

  constructor(host: Player) {
    console.log(`Creating new game #${this.session}`);
    this.host = host;
    this.players.push(host);
    console.log(`Host ${host.name} joined (Rank ${host.rank})`);
    this.difficulty = Game.difficultyByRank(host.rank);
    console.log(`Difficulty: ${this.difficulty}`);
  }
}

const getPlayerPool = (): Player[] => {
  const pool = [];
  Array.from(Array(Math.floor(Math.random() * 50))).forEach((x, i) => {
    pool.push({
      id: uuidv4(),
      name: uuidv4(),
      rank: Math.floor(Math.random() * 10000),
    });
  });
  return pool;
};

// Create a player (ourself)
const playerSelf: Player = {
  id: uuidv4(),
  name: "Player 1",
  rank: 4300,
};

// Create a new game as the host
const session = new Game(playerSelf);
const playerPool = getPlayerPool();
session.matchNextAvailablePlayers(playerPool);

console.log(session.gameState);
