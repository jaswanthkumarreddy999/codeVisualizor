import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LandingPage } from '@/components/LandingPage';

export default async function Home() {
  const session = await auth();

  // If user is already logged in, take them to the visualizer
  if (session) {
    redirect('/visualizer');
  }

  // Otherwise, show the premium landing page
  return <LandingPage />;
}
