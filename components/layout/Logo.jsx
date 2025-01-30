import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo.svg';

const Logo = () => {
  return (
    <Link href="/" className="flex justify-center z-10">
      <Image
        src={logo}
        height="250"
        width="250"
        quality={100}
        alt="The Achievers Focus logo"
        priority={true}
      />
    </Link>
  );
};
export default Logo;
