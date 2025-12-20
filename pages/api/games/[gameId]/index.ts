import type { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import sudokuGame from '../../../games/sudoku.json';
// @ts-ignore
import tetrisGame from '../../../games/tetris.json';
// @ts-ignore
import game2048 from '../../../games/game2048.json';

const gamesMap: Record<string, any> = {
  sudoku: sudokuGame,
  tetris: tetrisGame,
  game2048: game2048,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { gameId } = req.query;

    if (!gameId || typeof gameId !== 'string') {
      return res.status(400).json({ error: 'Invalid game ID' });
    }

    const gameData = gamesMap[gameId];

    if (!gameData) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // 다운로드 URL 추가
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://flight-time-server.vercel.app';
    const gameWithUrl = {
      ...gameData,
      downloadUrl: `${baseUrl}/api/games/${gameId}/download`,
    };

    res.status(200).json(gameWithUrl);
  } catch (error) {
    console.error('Error reading game:', error);
    res.status(500).json({ error: 'Failed to read game' });
  }
}

