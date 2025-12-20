import { NextResponse } from "next/server";

const gamesMap: Record<string, any> = {
  sudoku: {
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

