import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Logo from './Logo';
import WaitlistModal from './WaitlistModal';

const Header = () => {
  const router = useRouter();
  const [enableWaitlist, setEnableWaitlist] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data?.enableWaitlist) setEnableWaitlist(true);
      })
      .catch(() => {
        // If config can't be fetched, keep the waitlist button hidden.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Logo />
        </div>
        {enableWaitlist && <WaitlistModal />}
      </div>
    </div>
  );
};

export default Header;
