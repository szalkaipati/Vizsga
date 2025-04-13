// app/profiles/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { profiles, User } from '../../admin/page';



export default function ProfilePage() {
  const params = useParams();
  const userId = params.id;

  const profile: User | undefined = profiles.find((user) => user.id === userId);

  if (!profile) {
    return <div className="p-8 text-center text-red-600 text-xl">User not found</div>;
  }

  return (
    <div style={{ color: 'black' }} className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Profile: {profile.name}</h1>
      <div>
        <p className="text-lg mb-2"><strong>Email:</strong> {profile.email}</p>
        <p className="text-lg mb-4"><strong>Videos:</strong></p>
        <ul className="list-disc list-inside">
            {profile.videos.map((video, index) => (
            <li key={index}>{video}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}
