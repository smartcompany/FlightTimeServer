import { NextResponse } from "next/server";

const gamesMap: Record<string, any> = {
  airplane: {
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
  snake: {
    id: "snake",
    name: "Snake Game",
    description: "Classic snake game",
    version: "1.0.0",
    iconUrl: "https://example.com/icons/snake.png",
    fileSize: 0,
    isBuiltIn: false,
    categories: ["액션", "클래식"],
    lastUpdated: "2024-01-15T00:00:00Z",
    gameType: "webview",
    config: {},
    htmlUrl: "/api/games/snake/game.html"
  },
  breakout: {
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
  flappy: {
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
  space_shooter: {
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
  match3: {
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
  runner: {
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
  puzzle: {
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
  tetris: {
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
  game2048: {
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
};

export async function GET(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { gameId } = params;

    if (!gameId) {
      return NextResponse.json(
        { error: 'Invalid game ID' },
        { status: 400 }
      );
    }

    const gameData = gamesMap[gameId];

    if (!gameData) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }

    const gameWithUrl = {
      ...gameData,
      downloadUrl: `/api/games/${gameId}/download`,
    };

    return NextResponse.json(gameWithUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error('Error reading game:', error);
    return NextResponse.json(
      { error: 'Failed to read game' },
      { status: 500 }
    );
  }
}

