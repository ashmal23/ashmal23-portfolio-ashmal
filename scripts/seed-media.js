"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverless_1 = require("@neondatabase/serverless");
const dotenv = __importStar(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv.config({ path: '.env.local' });
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    console.error('DATABASE_URL is not defined');
    process.exit(1);
}
const sql = (0, serverless_1.neon)(databaseUrl);
async function seedMedia() {
    console.log('🚀 Seeding media library with public images...');
    try {
        const publicDir = path_1.default.join(process.cwd(), 'public');
        const files = fs_1.default.readdirSync(publicDir);
        for (const file of files) {
            if (!file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.svg')) {
                continue;
            }
            const filePath = path_1.default.join(publicDir, file);
            const stat = fs_1.default.statSync(filePath);
            if (stat.isDirectory())
                continue;
            const url = `/${file}`;
            let mimeType = 'image/png';
            if (file.endsWith('.jpg'))
                mimeType = 'image/jpeg';
            if (file.endsWith('.svg'))
                mimeType = 'image/svg+xml';
            // Check if exists
            const existing = await sql `
        SELECT id FROM media_library WHERE url = ${url}
      `;
            if (existing.length === 0) {
                console.log(`Inserting ${file}...`);
                await sql `
          INSERT INTO media_library (filename, mime_type, url, size_bytes)
          VALUES (${file}, ${mimeType}, ${url}, ${stat.size})
        `;
            }
        }
        console.log('✅ Media seeding completed successfully!');
    }
    catch (error) {
        console.error('❌ Media seeding failed:', error);
        process.exit(1);
    }
}
seedMedia();
