"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const server_1 = require("next/server");
const neon_1 = require("@/lib/neon");
const audit_1 = require("@/lib/audit");
const path_1 = __importDefault(require("path"));
async function GET() {
    try {
        const sql = (0, neon_1.getNeonSql)();
        const rows = await sql `SELECT * FROM media_library ORDER BY id DESC`;
        return server_1.NextResponse.json({ media: rows });
    }
    catch (error) {
        return server_1.NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
    }
}
async function POST(req) {
    try {
        const sql = (0, neon_1.getNeonSql)();
        const formData = await req.formData();
        const file = formData.get('file');
        if (!file) {
            return server_1.NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const originalFilename = file.name;
        const extension = path_1.default.extname(originalFilename);
        const basename = path_1.default.basename(originalFilename, extension);
        const cleanBasename = basename.replace(/[^a-zA-Z0-9]/g, '_');
        // Generate a unique filename using timestamp
        const uniqueFilename = `${cleanBasename}_${Date.now()}${extension}`;
        const base64Data = buffer.toString('base64');
        const dataUrl = `data:${file.type};base64,${base64Data}`;
        const result = (await sql `
      INSERT INTO media_library (filename, mime_type, url, size_bytes)
      VALUES (${uniqueFilename}, ${file.type}, ${dataUrl}, ${file.size})
      RETURNING *
    `);
        await (0, audit_1.logAudit)({
            userId: (0, audit_1.getUserIdFromHeaders)(req),
            action: `UPLOAD file: ${uniqueFilename}`,
            targetTable: 'media_library',
            ...(0, audit_1.getAuditContext)(req),
        });
        return server_1.NextResponse.json({ item: result[0] }, { status: 201 });
    }
    catch (error) {
        console.error('Media upload error:', error);
        return server_1.NextResponse.json({ error: 'Failed to upload media file' }, { status: 500 });
    }
}
