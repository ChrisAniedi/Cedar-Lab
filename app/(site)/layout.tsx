import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

// Chrome (nav + footer) for the main marketing site. Standalone landing pages
// (e.g. /local-business) live outside this group and render without it.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
