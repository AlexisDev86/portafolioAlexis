import fs from 'fs';
import path from 'path';
import {NextResponse} from 'next/server';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'sitemap-0.xml');
        const fileContents = fs.readFileSync(filePath, 'utf8');

        return new NextResponse(fileContents, {
            headers: {
                'Content-Type': 'application/xml',
            },
        });
    } catch (error) {
        console.error('Error al servir el sitemap-0:', error);
        return new NextResponse('Error al servir el sitemap', {
            status: 500,
        });
    }
}