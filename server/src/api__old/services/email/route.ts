import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from './config';
import { emailSubscribed } from '../../export/emailSubscribed';

export default async function handler(req: NextRequest) {
    if (req.method === 'POST') {
        try{
            const {subject, text, html} = await req.json();

            const subsribed = await emailSubscribed();

            await Promise.all(subsribed.filter(to => to !== null).map(to => sendEmail(to, subject, text, html)));

            return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
        }catch{
            return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
        }
    }
    else{
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}