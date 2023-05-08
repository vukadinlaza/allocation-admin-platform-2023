'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

interface LogoProps {
  url: string;
}

export default function Logo({ url }: LogoProps) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Image
      src={url}
      alt="Allocations.com"
      width={128}
      height={50}
      className="cursor-pointer h-full"
      onClick={() => router.push('/')}
    />
  );
}
