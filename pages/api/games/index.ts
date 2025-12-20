import type { NextApiRequest, NextApiResponse } from 'next';
import sudokuGame from '../../games/sudoku.json';
import tetrisGame from '../../games/tetris.json';
import game2048 from '../../games/game2048.json';

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameMetadata[] | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const allGames = [
      sudokuGame,
      tetrisGame,
      game2048,
    ] as GameMetadata[];

    // 로컬 개발 환경에서는 localhost 사용
    const games = allGames.map((gameData) => {
      const gameId = gameData.id;
      
      return {
        ...gameData,
        downloadUrl: `/api/games/${gameId}/download`,
        fileSize: gameData.dartCode ? Buffer.byteLength(gameData.dartCode, 'utf8') : 0,
        gameType: gameData.gameType || 'unknown',
      };
    });

    res.status(200).json(games);
  } catch (error) {
    console.error('Error reading games:', error);
    res.status(500).json({ error: 'Failed to read games' });
  }
}

