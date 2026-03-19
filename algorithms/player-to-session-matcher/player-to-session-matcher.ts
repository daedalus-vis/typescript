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
  static difficultyLevels: Record<string, GameDifficultly> = {
    0: 1,
    2000: 2,
    3000: 3,
    4000: 4,
    5000: 5,
  };

  #state: GameState = "lobby";
  private players: Player[] = [];

  readonly host: Player;
  readonly difficulty: GameDifficultly;

  // Returns difficulty setting by player rank
  static difficultyByRank = (rank: number): GameDifficultly => {
    return Object.entries(Game.difficultyLevels).reduce((acc, level) => {
      return rank >= Number(level[0]) ? level[1] : acc;
    }, 1) as GameDifficultly;
  };

  // Add player to the session if there is space, and their rank is acceptable
  addPlayer(player: Player): boolean {
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

  // Identifies elgible players from a given pool and adds them to the game session
  // 0(1) approach to iteration, no mutation
  matchNextAvailablePlayers(pool: Player[]) {
    console.log(`Matching elgible players to join session...`);
    let i = 0;
    while (this.players.length < Game.maxPlayers && i < pool.length) {
      const added = this.addPlayer(pool[i]);
      i++;
      if (added) {
        console.log(
          `Players joined (${this.players.length}/${Game.maxPlayers})`,
        );
      }
    }
    if (this.players.length === Game.maxPlayers) this.#state = "ready";
  }

  set state(newState: GameState) {
    this.#state = newState;
    if (newState === "started")
      console.log(
        `Starting game session #${this.session} with ${this.players.length} players, difficulty ${this.difficulty}`,
      );
  }

  get gameState() {
    return {
      state: this.#state,
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

// Create a random pool of players
const getPlayerPool = (): Player[] => {
  const count = Math.random() * 50;
  const pool = Array.from({ length: count }, () => ({
    id: uuidv4(),
    name: uuidv4(),
    rank: Math.floor(Math.random() * 10000),
  }));
  console.log(`Got latest available player pool`);
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

// Wait until game is ready
while (session.gameState.state === "lobby") {
  const playerPool = getPlayerPool();
  session.matchNextAvailablePlayers(playerPool);
}

session.state = "started";

console.log(session.gameState);
