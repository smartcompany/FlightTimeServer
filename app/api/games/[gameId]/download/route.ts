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

    // Flutter는 동적 코드 로딩을 지원하지 않으므로,
    // 다운로드는 게임 메타데이터만 반환합니다.
    // 실제 게임 코드는 클라이언트에 미리 구현되어 있어야 합니다.
    return NextResponse.json(
      {
        message: 'Game metadata downloaded',
        gameId: gameId,
        gameType: gameData.gameType,
        config: gameData.config,
        note: 'Flutter does not support dynamic code loading. The game must be pre-implemented in the client.'
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error('Error downloading game:', error);
    return NextResponse.json(
      { error: 'Failed to download game' },
      { status: 500 }
    );
  }
}

