import express, { Request, Response, NextFunction } from 'express';

export const indexFiles = async (req: Request, res: Response) => {
  try {
    console.log('📥 Received index request from Obsidian');
    
    const { indexVault } = await import('../indexer');
    
    // Responder inmediatamente (no bloqueante)
    res.json({
      success: true,
      message: 'Indexing started in background'
    });
    
    // Ejecutar en background con pequeño delay
    setTimeout(() => {
      indexVault()
        .then(() => {
          console.log('✅ Background indexing completed successfully');
        })
        .catch((error: Error) => {
          console.error('❌ Background indexing failed:', error);
        });
    }, 1000); // 1 segundo de delay para que Obsidian termine de escribir archivos
    
  } catch (error) {
    console.error('❌ Error starting indexing:', error);
    res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
}

export const doQuery= async (req: Request, res: Response) => {
  try {
    const { query: queryText, project, type, dateFrom, dateTo, limit } = req.body;
    
    if (!queryText) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing query parameter' 
      });
    }
    
    console.log(`📥 Query request: "${queryText}"`);
    
    const { query } = await import('../query');
    const result = await query(queryText, { project, type, dateFrom, dateTo, limit });
    
    res.json({
      success: true,
      query: queryText,
      answer: result.answer,
      sources: result.sources,
      totalChunksSearched: result.totalChunksSearched,
    });
    
  } catch (error) {
    console.error('❌ Query error:', error);
    res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
}