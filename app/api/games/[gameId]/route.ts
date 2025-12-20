import { NextResponse } from "next/server";
// @ts-ignore
import sudokuGame from "../../../games/sudoku.json";
// @ts-ignore
import tetrisGame from "../../../games/tetris.json";
// @ts-ignore
import game2048 from "../../../games/game2048.json";
// @ts-ignore
import webviewExample from "../../../games/webview_example.json";

const gamesMap: Record<string, any> = {
  sudoku: sudokuGame,
  tetris: tetrisGame,
  game2048: game2048,
  webview_example: webviewExample,
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

