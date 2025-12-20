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
  res: NextApiResponse<string | { error: string }>
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

    if (!gameData.dartCode) {
      return res.status(404).json({ error: 'Game code not found' });
    }

    // Dart 코드를 반환
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename="${gameId}.dart"`);
    res.status(200).send(gameData.dartCode);
  } catch (error) {
    console.error('Error downloading game:', error);
    res.status(500).json({ error: 'Failed to download game' });
  }
}

