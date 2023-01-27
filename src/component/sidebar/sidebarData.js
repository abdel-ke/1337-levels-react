import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Khouribga',
    path: '/Khouribga',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: '1st 10/2018',
        path: '/Khouribga/1st',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: '2nd 04/2019',
        path: '/Khouribga/2nd',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: '3rd 10/2019',
        path: '/Khouribga/3rd',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: '4th 10/2021',
        path: '/Khouribga/4th',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: '5th 10/2022',
        path: '/Khouribga/5th',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },
  {
    title: 'BenGuerir',
    path: '/BenGuerir',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: '1st 10/2019',
        path: '/BenGuerir/1st',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: '2nd 10/2021',
        path: '/BenGuerir/2nd',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: '3rd 10/2022',
        path: '/BenGuerir/3rd',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },
  {
    title: 'Tétouan',
    path: '/Tétouan',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: '1st 10/2022',
        path: '/Tétouan/1st',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },
];
