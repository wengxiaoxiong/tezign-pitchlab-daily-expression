import React from 'react';
import { ResultData } from '@/lib/types';

interface QRCodeProps {
  size?: number;
  dark?: boolean;
  label?: string;
}

export const QRCode: React.FC<QRCodeProps> = ({ size = 48, dark = false, label }) => (
  <div className="flex flex-col items-center gap-1.5">
    <div
      style={{ width: size, height: size }}
      className={`${dark ? 'bg-black/20 text-white' : 'bg-gray-100 text-black'} p-1.5 flex flex-col items-center justify-center rounded-lg border ${dark ? 'border-white/20' : 'border-gray-200'} backdrop-blur-sm shadow-sm`}
    >
      <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-full h-full opacity-80">
        {[...Array(9)].map((_, i) => (
          <div key={i} className={`${dark ? 'bg-white' : 'bg-black'} ${Math.random() > 0.3 ? 'opacity-100' : 'opacity-0'}`} />
        ))}
      </div>
    </div>
    {label && <span className={`text-[7px] font-bold ${dark ? 'text-white/40' : 'text-black/30'} whitespace-nowrap`}>{label}</span>}
  </div>
);

interface UserInfoProps {
  data: ResultData;
  dark?: boolean;
  compact?: boolean;
}

export const UserInfo: React.FC<UserInfoProps> = ({ data, dark = false, compact = false }) => (
  <div className={`flex items-center gap-2 ${dark ? 'text-white' : 'text-gray-800'}`}>
    <div className={`rounded-full overflow-hidden border ${dark ? 'border-white/30' : 'border-gray-200'} bg-white/10 flex items-center justify-center ${compact ? 'w-6 h-6' : 'w-10 h-10'}`}>
      <span className={compact ? 'text-[10px]' : 'text-base'}>{data.userAvatar}</span>
    </div>
    <div>
      <p className={`${compact ? 'text-[9px]' : 'text-xs'} font-bold`}>{data.userName}</p>
      <p className={`${compact ? 'text-[7px]' : 'text-[8px]'} opacity-40 font-mono tracking-tighter`}>INSIGHT #{data.checkInDays}</p>
    </div>
  </div>
);
