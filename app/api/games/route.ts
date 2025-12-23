import { NextResponse } from "next/server";

interface GameMetadata {
  id: string;
  name: string;
  description: string;
  version: string;
  iconUrl: string;
  downloadUrl?: string;
  fileSize: number;
  isBuiltIn: boolean;
  categories: string[];
  lastUpdated?: string;
  gameType?: string;
  config?: any;
  htmlUrl?: string;
  dartCode?: string;
}

const games: GameMetadata[] = [
  {
    id: "airplane",
    name: "Airplane Game",
    description: "Fly and avoid obstacles",
    version: "1.0.0",
    iconUrl: "https://example.com/icons/airplane.png",
    fileSize: 0,
    isBuiltIn: false,
    categories: ["액션", "아케이드"],
    lastUpdated: "2024-01-15T00:00:00Z",
    gameType: "webview",
    config: {},
    htmlUrl: "/api/games/airplane/game.html"
  },
  {
    id: "asteroids",
    name: "Asteroids",
    description: "Classic space shooter",
    version: "1.0.0",
    iconUrl: "https://example.com/icons/asteroids.png",
    fileSize: 0,
    isBuiltIn: false,
    categories: ["액션", "슈팅", "클래식"],
    lastUpdated: "2024-01-15T00:00:00Z",
    gameType: "webview",
    config: {},
    htmlUrl: "/api/games/asteroids/game.html"
  },
  {
    id: "breakout",
    name: "Breakout",
    description: "Break the bricks",
    version: "1.0.0",
    iconUrl: "https://example.com/icons/breakout.png",
    fileSize: 0,
    isBuiltIn: false,
    categories: ["액션", "아케이드"],
    lastUpdated: "2024-01-15T00:00:00Z",
    gameType: "webview",
    config: {},
    htmlUrl: "/api/games/breakout/game.html"
  },
  {
    id: "flappy",
    name: "Flappy Bird",
    description: "Tap to fly",
    version: "1.0.0",
    iconUrl: "https://example.com/icons/flappy.png",
    fileSize: 0,
    isBuiltIn: false,
    categories: ["액션", "캐주얼"],
    lastUpdated: "2024-01-15T00:00:00Z",
    gameType: "webview",
    config: {},
    htmlUrl: "/api/games/flappy/game.html"
  },
  {
    id: "space_shooter",
    name: "Space Shooter",
    description: "Shoot the enemies",
    version: "1.0.0",
    iconUrl: "https://example.com/icons/space_shooter.png",
    fileSize: 0,
    isBuiltIn: false,
    categories: ["액션", "슈팅"],
    lastUpdated: "2024-01-15T00:00:00Z",
    gameType: "webview",
    config: {},
    htmlUrl: "/api/games/space_shooter/game.html"
  },
  {
    id: "match3",
    name: "Match 3",
    description: "Match gems to score",
    version: "1.0.0",
    iconUrl: "https://example.com/icons/match3.png",
    fileSize: 0,
    isBuiltIn: false,
    categories: ["퍼즐", "매칭"],
    lastUpdated: "2024-01-15T00:00:00Z",
    gameType: "webview",
    config: {},
    htmlUrl: "/api/games/match3/game.html"
  },
  {
    id: "runner",
    name: "Runner",
    description: "Run and jump over obstacles",
    version: "1.0.0",
    iconUrl: "https://example.com/icons/runner.png",
    fileSize: 0,
    isBuiltIn: false,
    categories: ["액션", "러너"],
    lastUpdated: "2024-01-15T00:00:00Z",
    gameType: "webview",
    config: {},
    htmlUrl: "/api/games/runner/game.html"
  },
  {
    id: "puzzle",
    name: "Puzzle",
    description: "Slide puzzle game",
    version: "1.0.0",
    iconUrl: "https://example.com/icons/puzzle.png",
    fileSize: 0,
    isBuiltIn: false,
    categories: ["퍼즐", "논리"],
    lastUpdated: "2024-01-15T00:00:00Z",
    gameType: "webview",
    config: {},
    htmlUrl: "/api/games/puzzle/game.html"
  },
  {
    id: "tetris",
    name: "테트리스",
    description: "클래식한 블록 퍼즐 게임",
    version: "1.0.0",
    iconUrl: "https://example.com/icons/tetris.png",
    fileSize: 0,
    isBuiltIn: false,
    categories: ["퍼즐", "액션", "클래식"],
    lastUpdated: "2024-01-15T00:00:00Z",
    gameType: "webview",
    config: {},
    htmlUrl: "/api/games/tetris/game.html"
  },
  {
    id: "game2048",
    name: "2048",
    description: "숫자 합치기 퍼즐 게임",
    version: "1.0.0",
    iconUrl: "https://example.com/icons/2048.png",
    fileSize: 0,
    isBuiltIn: false,
    categories: ["퍼즐", "전략"],
    lastUpdated: "2024-01-15T00:00:00Z",
    gameType: "webview",
    config: {},
    htmlUrl: "/api/games/game2048/game.html"
  },
  {
    id: "solitaire",
    name: "Solitaire",
    description: "Classic card game",
    version: "1.0.0",
    iconUrl: "https://example.com/icons/solitaire.png",
    fileSize: 0,
    isBuiltIn: false,
    categories: ["카드", "클래식"],
    lastUpdated: "2024-01-15T00:00:00Z",
    gameType: "webview",
    config: {},
    htmlUrl: "/api/games/solitaire/game.html"
  },
  {
    id: "tower_defense",
    name: "Tower Defense",
    description: "Build towers to defend against enemies",
    version: "1.0.0",
    iconUrl: "https://example.com/icons/tower_defense.png",
    fileSize: 0,
    isBuiltIn: false,
    categories: ["전략", "타워 디펜스"],
    lastUpdated: "2024-01-15T00:00:00Z",
    gameType: "webview",
    config: {},
    htmlUrl: "/api/games/tower_defense/game.html"
  }
];

export async function GET() {
  try {
    const gamesWithDownloadUrl = games.map((gameData) => {
      const gameId = gameData.id;
      
      return {
        ...gameData,
        downloadUrl: `/api/games/${gameId}/download`,
        fileSize: 0,
        gameType: gameData.gameType || 'unknown',
      };
    });

    return NextResponse.json(gamesWithDownloadUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error('Error reading games:', error);
    return NextResponse.json(
      { error: 'Failed to read games' },
      { status: 500 }
    );
  }
}

