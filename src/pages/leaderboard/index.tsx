// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Card, CardBody, Divider, Link } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import { useAccount } from 'wagmi';

import ScrollIcon from '@mimir-wallet/assets/images/scroll.svg';
import { Address as AddressComponent, AddressIcon } from '@mimir-wallet/components';
import { serviceUrl } from '@mimir-wallet/config';
import { useMediaQuery } from '@mimir-wallet/hooks';
import { addressEq } from '@mimir-wallet/utils';

function Item({ rank, address, marks }: { rank: string | number; address: Address; marks: string }) {
  const is600 = useMediaQuery('(min-width: 600px)');
  const { address: account } = useAccount();

  return (
    <div
      key={address}
      className='px-2.5 sm:px-5 py-2.5 flex items-center gap-2.5 sm:gap-5 rounded-[10px] sm:rounded-[20px] bg-[#FFF1DE]'
    >
      <h4 className='font-bold sm:font-[900] text-[14px] sm:text-[30px]'>{Number(rank) < 10 ? `0${rank}` : rank}</h4>
      <AddressIcon address={address} size={is600 ? 40 : 20} />
      <p className='flex-1 font-bold sm:font-[800] text-[14px] sm:text-[20px]'>
        {addressEq(account, address) ? 'You' : <AddressComponent address={address} />}
      </p>
      <h4 className='font-bold sm:font-[900] text-[14px] sm:text-[30px]'>{Number(marks).toFixed(2)}</h4>
      <Link href={`https://safe.mimir.global?chainId=534352&address=${address}`} target='_blank' rel='noreferrer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='26'
          height='27'
          viewBox='0 0 26 27'
          fill='none'
          className='w-[13px] sm:w-[26px]'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M13 26.3C20.1797 26.3 26 20.4797 26 13.3C26 6.12035 20.1797 0.300049 13 0.300049C5.8203 0.300049 0 6.12035 0 13.3C0 20.4797 5.8203 26.3 13 26.3ZM6.5 18.2064C6.5 18.6282 6.66782 19.0326 6.96643 19.3304V19.3416C7.5889 19.9553 8.58885 19.9553 9.21132 19.3416L16.3247 12.2171V16.3258C16.3281 17.2003 17.0379 17.9074 17.9124 17.9074C18.7868 17.9074 19.4967 17.2003 19.5 16.3258V8.38769C19.5 7.51086 18.7892 6.80005 17.9124 6.80005H9.9742C9.09974 6.8034 8.39263 7.51322 8.39263 8.38768C8.39263 9.26214 9.09974 9.97196 9.9742 9.97531H14.0798L6.96643 17.0823C6.66782 17.3802 6.5 17.7846 6.5 18.2064Z'
            fill='#151F34'
          />
        </svg>
      </Link>
    </div>
  );
}

function Leaderboard() {
  const { address } = useAccount();
  const { data } = useQuery<{ address: Address; marks: string }[]>({
    queryKey: [`${serviceUrl}leaderboard`]
  });
  const { data: rankData } = useQuery<{ isMultisig: boolean; address: Address; marks: string; rank: string }>({
    queryHash: `${serviceUrl}rank/${address}`,
    queryKey: [address ? `${serviceUrl}rank/${address}` : null]
  });

  const is600 = useMediaQuery('(min-width: 600px)');
  const is500 = useMediaQuery('(min-width: 500px)');
  const is400 = useMediaQuery('(min-width: 400px)');
  const is300 = useMediaQuery('(min-width: 300px)');

  const leading1Size = is600 ? 60 : is500 ? 50 : is400 ? 40 : is300 ? 30 : 30;
  const leading2Size = is600 ? 46 : is500 ? 38.3 : is400 ? 30.6 : is300 ? 23 : 23;

  const leading2Mt = is600 ? -6.5 : is500 ? -5.5 : is400 ? -4.5 : is300 ? -3.5 : -3.5;
  const leading3Mt = is600 ? -8 : is500 ? -7 : is400 ? -6 : is300 ? -5 : -5;

  return (
    <>
      {is600 && rankData && rankData.isMultisig && (
        <div className='fixed top-[40%] left-[calc(50%+360px)] flex items-center gap-2.5 p-2.5 py-5 rounded-[20px] bg-white'>
          <span className='font-extrabold text-[20px]'>Your Rank</span>
          <b className='font-[900] text-[30px]'>{rankData.rank}</b>
          <Link
            href={`https://safe.mimir.global?chainId=534352&address=${rankData.address}`}
            target='_blank'
            rel='noreferrer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='26'
              height='27'
              viewBox='0 0 26 27'
              fill='none'
              className='w-[13px] sm:w-[26px]'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M13 26.3C20.1797 26.3 26 20.4797 26 13.3C26 6.12035 20.1797 0.300049 13 0.300049C5.8203 0.300049 0 6.12035 0 13.3C0 20.4797 5.8203 26.3 13 26.3ZM6.5 18.2064C6.5 18.6282 6.66782 19.0326 6.96643 19.3304V19.3416C7.5889 19.9553 8.58885 19.9553 9.21132 19.3416L16.3247 12.2171V16.3258C16.3281 17.2003 17.0379 17.9074 17.9124 17.9074C18.7868 17.9074 19.4967 17.2003 19.5 16.3258V8.38769C19.5 7.51086 18.7892 6.80005 17.9124 6.80005H9.9742C9.09974 6.8034 8.39263 7.51322 8.39263 8.38768C8.39263 9.26214 9.09974 9.97196 9.9742 9.97531H14.0798L6.96643 17.0823C6.66782 17.3802 6.5 17.7846 6.5 18.2064Z'
                fill='#151F34'
              />
            </svg>
          </Link>
        </div>
      )}

      <div
        className='z-0 h-[294px] opacity-30 sm:h-[350px]'
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 241, 222, 0.60) 0%, #FFF1DE 100%), url('/images/scroll-sessions.webp') lightgray 50% / cover no-repeat"
        }}
      />

      <div className='relative z-10 max-w-[600px] mx-auto px-5 mt-[-274px] sm:mt-[-310px] sm:px-0 pb-5'>
        <div className='flex items-center justify-center gap-2 font-extrabold text-[15px] sm:text-[26px]'>
          <img src={ScrollIcon} alt='scroll' className='w-[20px] sm:w-[34px]' />
          Scroll Sessions
        </div>

        <img src='/images/leaderboard.webp' alt='scroll sessions' className='mt-[20px] sm:mt-[30px]' />

        <div className='flex gap-5 items-end select-none'>
          <div className='relative flex items-center justify-center'>
            <img className='z-0' src='/images/leading-2.svg' alt='leading 2' />
            <div
              className='z-10 absolute transition-transform hover:scale-110 cursor-pointer'
              style={{ marginTop: leading2Mt }}
            >
              <AddressIcon address={data?.[1].address} size={leading2Size} />
            </div>
            <div className='z-20 absolute bottom-[7%] text-center leading-none'>
              <h6 className='font-[900] text-[12px] sm:text-[20px]'>{Number(data?.[1].marks).toFixed(0)}</h6>
              <p className='mt-0 sm:mt-[5px] text-[10px] sm:text-[14px] opacity-50'>
                <AddressComponent address={data?.[1].address} />
              </p>
            </div>
          </div>
          <div className='relative flex items-center justify-center'>
            <img className='z-0' src='/images/leading-1.svg' alt='leading 1' />
            <div className='z-10 absolute transition-transform hover:scale-110 cursor-pointer'>
              <AddressIcon address={data?.[0].address} size={leading1Size} />
            </div>
            <div className='z-20 absolute bottom-[12%] text-center leading-none'>
              <h6 className='font-[900] text-[12px] sm:text-[30px]'>{Number(data?.[0].marks).toFixed(0)}</h6>
              <p className='mt-0 sm:mt-[5px] text-[10px] sm:text-[17px] opacity-50'>
                <AddressComponent address={data?.[0].address} />
              </p>
            </div>
          </div>
          <div className='relative flex items-center justify-center'>
            <img className='z-0' src='/images/leading-3.svg' alt='leading 3' />
            <div
              className='z-10 absolute transition-transform hover:scale-110 cursor-pointer'
              style={{ marginTop: leading3Mt, marginLeft: 1 }}
            >
              <AddressIcon address={data?.[2].address} size={leading2Size} />
            </div>
            <div className='z-20 absolute bottom-[7%] text-center leading-none'>
              <h6 className='font-[900] text-[12px] sm:text-[20px]'>{Number(data?.[2].marks).toFixed(0)}</h6>
              <p className='mt-0 sm:mt-[5px] text-[10px] sm:text-[14px] opacity-50'>
                <AddressComponent address={data?.[2].address} />
              </p>
            </div>
          </div>
        </div>

        <Card className='mt-[20px] sm:mt-[30px]'>
          <CardBody className='space-y-2.5 sm:space-y-5'>
            {!is600 && rankData && rankData.isMultisig && (
              <>
                <Item
                  key={`my-${rankData.address}`}
                  address={rankData.address}
                  marks={rankData.marks}
                  rank={rankData.rank}
                />
                <Divider />
              </>
            )}
            {data
              ?.slice(3)
              ?.map(({ address, marks }, index) => (
                <Item key={address} address={address} marks={marks} rank={index + 3 + 1} />
              ))}
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Leaderboard;
