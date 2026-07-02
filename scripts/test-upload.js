"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("../app/api/admin/media/route");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function run() {
    const filePath = path_1.default.join(process.cwd(), 'public', 'window.svg');
    const fileBuffer = fs_1.default.readFileSync(filePath);
    const blob = new Blob([fileBuffer], { type: 'image/svg+xml' });
    const file = new File([blob], 'window.svg', { type: 'image/svg+xml' });
    const formData = new FormData();
    formData.append('file', file);
    const req = new Request('http://localhost:3000/api/admin/media', {
        method: 'POST',
        body: formData,
        headers: {
            'x-user-id': '1'
        }
    });
    console.log('Calling POST...');
    try {
        const res = await (0, route_1.POST)(req);
        console.log('Status:', res.status);
        console.log('Body:', await res.json());
    }
    catch (e) {
        console.error('Exception calling POST:', e);
    }
}
run();
