import { Router, Request, Response } from 'express';
import { db } from '../config/firebase';
import { Match } from '../types/match';

const router = Router();

// @route   POST /match/create
// @desc    Create a new match
// @access  Public
router.post('/create', async (req: Request, res: Response) => {
  try {
    console.log('📥 Received match creation request');
    console.log('📦 Request body:', JSON.stringify(req.body, null, 2));

    const matchData: Match = req.body;

    const match = {
      ...matchData,
      date: matchData.date,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log('💾 Attempting to save to Firestore...');

    const docRef = await db.collection('matches').add(match);

    console.log('✅ Match created successfully with ID:', docRef.id);

    res.status(201).json({
      success: true,
      message: 'Match created successfully',
      matchId: docRef.id,
      data: match,
    });
  } catch (error: any) {
    console.error('❌ Error creating match:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({
      success: false,
      error: 'Failed to create match',
      message: error.message,
      details: error.toString(),
    });
  }
});

export default router;
