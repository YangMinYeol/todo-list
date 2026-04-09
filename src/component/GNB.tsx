"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * 전역 상단 내비게이션 바
 */
export default function GNB() {
  const pathname = usePathname();

  const handleLogoClick = () => {
    if (pathname === "/") {
      window.location.href = "/";
    }
  };

  return (
    <header className="h-25 md:h-15 border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="h-full w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center">
        <Link href="/" onClick={handleLogoClick} className="flex items-center">
          <Image
            src="/img/logo.svg"
            alt="홈으로 이동"
            width={107}
            height={40}
            className="md:hidden"
            priority
          />
          <Image
            src="/img/logo_web.svg"
            alt="홈으로 이동"
            width={151}
            height={40}
            className="hidden md:block"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
