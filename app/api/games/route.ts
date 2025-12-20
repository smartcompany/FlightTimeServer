import { NextResponse } from "next/server";
import sudokuGame from "../../games/sudoku.json";
import tetrisGame from "../../games/tetris.json";
import game2048 from "../../games/game2048.json";

interface GameMetadata {
  id: string;
  name: string;
  description: string;
  version: string;
  iconUrl: string;
  downloadUrl: string;
  fileSize: number;
  isBuiltIn: boolean;
  categories: string[];
  lastUpdated?: string;
  gameType?: string;
  config?: any;
  dartCode?: string;
}

export async function GET() {
  try {
    const allGames = [
      sudokuGame,
      tetrisGame,
      game2048,
    ] as GameMetadata[];

    const games = allGames.map((gameData) => {
      const gameId = gameData.id;
      
      return {
        ...gameData,
        downloadUrl: `/api/games/${gameId}/download`,
        fileSize: gameData.dartCode ? Buffer.byteLength(gameData.dartCode, 'utf8') : 0,
        gameType: gameData.gameType || 'unknown',
      };
    });

    return NextResponse.json(games, {
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

