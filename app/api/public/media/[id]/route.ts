import { NextResponse } from 'next/server';
import { getNeonSql } from '@/lib/neon';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const sql = getNeonSql();
    const rows = (await sql`SELECT * FROM media_library WHERE id = ${params.id}`) as any[];
    
    if (rows.length === 0) {
      return new NextResponse('Not found', { status: 404 });
    }
    
    const media = rows[0];
    
    // If it's a data URL, decode it and return as binary
    if (media.url && media.url.startsWith('data:')) {
      const matches = media.url.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      
      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, 'base64');
        
        return new NextResponse(buffer, {
          headers: {
            'Content-Type': mimeType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    }
    
    // If it's not a data URL (e.g. an old physical file URL), redirect to it
    return NextResponse.redirect(new URL(media.url, req.url));
  } catch (error) {
    console.error('Media public route error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
