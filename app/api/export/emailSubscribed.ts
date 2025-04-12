import {prisma} from '../auth/[...nextauth]/route';

export async function emailSubscribed() {
    const users = await prisma.user.findMany({
        where: {
            subsribed: true
        },
        select: {
            email: true
        }
    });
    return users.map(user => user.email);
}