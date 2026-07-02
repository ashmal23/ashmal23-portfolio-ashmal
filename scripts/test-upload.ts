import { POST } from '../app/api/admin/media/route';
import fs from 'fs';
import path from 'path';

async function run() {
  const filePath = path.join(process.cwd(), 'public', 'window.svg');
  const fileBuffer = fs.readFileSync(filePath);
  
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
    const res = await POST(req);
    console.log('Status:', res.status);
    console.log('Body:', await res.json());
  } catch (e) {
    console.error('Exception calling POST:', e);
  }
}

run();
