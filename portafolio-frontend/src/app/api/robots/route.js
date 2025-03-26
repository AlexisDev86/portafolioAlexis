import fs from 'fs';
import path from 'path';
import {NextResponse} from 'next/server';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'robots.txt');
        const fileContents = fs.readFileSync(filePath, 'utf8');

        return new NextResponse(fileContents, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    } catch (error) {
        console.error('Error al servir robots.txt:', error);
        return new NextResponse('Error al servir robots.txt', {
            status: 500,
        });
    }
}