import { NextResponse } from "next/server";
import sudokuGame from "../../../../games/sudoku.json";
import tetrisGame from "../../../../games/tetris.json";
import game2048 from "../../../../games/game2048.json";

const gamesMap: Record<string, any> = {
  sudoku: sudokuGame,
  tetris: tetrisGame,
  game2048: game2048,
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

    if (!gameData.dartCode) {
      return NextResponse.json(
        { error: 'Game code not found' },
        { status: 404 }
      );
    }

    return new NextResponse(gameData.dartCode, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="${gameId}.dart"`,
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error('Error downloading game:', error);
    return NextResponse.json(
      { error: 'Failed to download game' },
      { status: 500 }
    );
  }
}

