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
    id: "sudoku",
    name: "스도쿠",
    description: "숫자 퍼즐 게임",
    version: "1.0.0",
    iconUrl: "https://example.com/icons/sudoku.png",
    fileSize: 0,
    isBuiltIn: false,
    categories: ["퍼즐", "논리"],
    lastUpdated: "2024-01-15T00:00:00Z",
    gameType: "webview",
    config: {},
    htmlUrl: "/api/games/sudoku/game.html"
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

