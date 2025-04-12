export interface UserCardProps{
u: {
    id?: string;
    name?: string; // <-- ezt lássa az admin és a teacher
    email?: string; //<-- ezt lássa az admin és a teacher
    emailVerified?: Date;
    image?: number;
    createdAt?: Date;
    updatedAt?: Date;
    role_id: number;
    subscribe: boolean; // <-- ezt lássa az admin és a teacher (ezt még nem döntöttem el h meghagyjuk-e)
    }[];
}