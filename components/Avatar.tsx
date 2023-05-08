import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  src: string | null;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  size: number;
  className?: string;
  placeholder?: 'blur' | 'empty' | undefined;
  blurDataURL?: string;
}

function getAvatarPictureAltText({
  firstName,
  lastName
}: {
  firstName: string;
  lastName?: string | null;
}): string {
  return lastName
    ? `${firstName} ${lastName}'s profile picture`
    : firstName
    ? `${firstName}'s profile picture`
    : 'Profile Picture';
}

const PlaceholderImage = ({
  first_name,
  last_name,
  size
}: {
  first_name: string | null | undefined;
  last_name: string | null | undefined;
  size: number;
}) => {
  const firstLetterOfFirstName = first_name?.charAt(0);
  const firstLetterOfLastName = last_name?.charAt(0);

  let textSize = 'text-xs';
  let borderWidth = 'border';
  if (size >= 192) {
    textSize = 'text-5xl';
    borderWidth = 'border-[3px]';
  }
  if (size >= 128 && size < 192) {
    textSize = 'text-4xl';
    borderWidth = 'border-[3px]';
  }
  if (size >= 96 && size < 128) {
    textSize = 'text-3xl';
    borderWidth = 'border-[3px]';
  }
  if (size >= 64 && size < 96) {
    textSize = 'text-2xl';
    borderWidth = 'border-[3px]';
  }
  if (size >= 48 && size < 64) {
    textSize = 'text-xl';
    borderWidth = 'border-2';
  }
  if (size >= 32 && size < 48) {
    textSize = 'text-xs';
    borderWidth = 'border';
  }
  if (size > 24 && size < 32) {
    textSize = 'text-xs';
    borderWidth = 'border';
  }
  if (size >= 16 && size <= 24) {
    textSize = 'text-xxs';
    borderWidth = 'border';
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        maxWidth: size,
        maxHeight: size,
        minWidth: size,
        minHeight: size
      }}
      className={classNames(
        'flex items-center justify-center border-dashed rounded-full border-blueGray-300 bg-transparent w-full h-full',
        borderWidth
      )}
    >
      <div
        className={classNames(
          `leading-none font-semibold uppercase text-blueGray-400`,
          textSize
        )}
      >
        {firstLetterOfFirstName || firstLetterOfLastName ? (
          <>
            <span>{firstLetterOfFirstName}</span>
            <span>{firstLetterOfLastName}</span>
          </>
        ) : (
          <span>?</span>
        )}
      </div>
    </div>
  );
};

const Avatar = ({
  src,
  firstName,
  lastName,
  size,
  className,
  placeholder,
  blurDataURL
}: AvatarProps) => {
  return (
    <>
      {src ? (
        <Image
          src={src}
          alt={getAvatarPictureAltText({
            firstName: firstName || 'first name',
            lastName: lastName! || 'last name'
          })}
          width={size}
          height={size}
          className={classNames(
            'rounded-full object-cover flex-shrink-0',
            className
          )}
          placeholder={placeholder!}
          blurDataURL={blurDataURL!}
          style={{
            width: size,
            height: size
          }}
        />
      ) : (
        <PlaceholderImage
          size={size}
          first_name={firstName}
          last_name={lastName}
        />
      )}
    </>
  );
};

export default Avatar;
