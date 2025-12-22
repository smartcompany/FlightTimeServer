import { NextResponse } from "next/server";

const gamesMap: Record<string, any> = {
  airplane: {
    id: "airplane",
    gameType: "webview",
    config: {},
  },
  asteroids: {
    id: "asteroids",
    gameType: "webview",
    config: {},
  },
  breakout: {
    id: "breakout",
    gameType: "webview",
    config: {},
  },
  flappy: {
    id: "flappy",
    gameType: "webview",
    config: {},
  },
  space_shooter: {
    id: "space_shooter",
    gameType: "webview",
    config: {},
  },
  match3: {
    id: "match3",
    gameType: "webview",
    config: {},
  },
  runner: {
    id: "runner",
    gameType: "webview",
    config: {},
  },
  puzzle: {
    id: "puzzle",
    gameType: "webview",
    config: {},
  },
  tetris: {
    id: "tetris",
    gameType: "webview",
    config: {},
  },
  game2048: {
    id: "game2048",
    gameType: "webview",
    config: {},
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

