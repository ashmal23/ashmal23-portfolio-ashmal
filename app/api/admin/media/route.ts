import { NextResponse } from 'next/server';
import { getNeonSql } from '@/lib/neon';
import { logAudit, getAuditContext, getUserIdFromHeaders } from '@/lib/audit';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sql = getNeonSql();
    const rows = (await sql`SELECT * FROM media_library ORDER BY id DESC`) as any[];
    
    // Replace base64 data URLs with friendly short URLs
    const processedRows = rows.map((row: any) => {
      if (row.url && row.url.startsWith('data:')) {
        return { ...row, url: `/api/public/media/${row.id}` };
      }
      return row;
    });

    return NextResponse.json({ media: processedRows });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const sql = getNeonSql();
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalFilename = file.name;
    const extension = path.extname(originalFilename);
    const basename = path.basename(originalFilename, extension);
    const cleanBasename = basename.replace(/[^a-zA-Z0-9]/g, '_');
    
    // Generate a unique filename using timestamp
    const uniqueFilename = `${cleanBasename}_${Date.now()}${extension}`;
    
    const base64Data = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64Data}`;

    const result = (await sql`
      INSERT INTO media_library (filename, mime_type, url, size_bytes)
      VALUES (${uniqueFilename}, ${file.type}, ${dataUrl}, ${file.size})
      RETURNING *
    `) as any[];

    await logAudit({
      userId: getUserIdFromHeaders(req),
      action: `UPLOAD file: ${uniqueFilename}`,
      targetTable: 'media_library',
      ...getAuditContext(req),
    });

    const insertedItem = result[0];
    const friendlyItem = {
      ...insertedItem,
      url: insertedItem.url.startsWith('data:') ? `/api/public/media/${insertedItem.id}` : insertedItem.url
    };

    return NextResponse.json({ item: friendlyItem }, { status: 201 });
  } catch (error) {
    console.error('Media upload error:', error);
    return NextResponse.json({ error: 'Failed to upload media file' }, { status: 500 });
  }
}
