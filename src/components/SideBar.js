import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as SiIcons from "react-icons/si";
import * as BsIcons from "react-icons/bs";

export const SidebarData = [
  {
    title: 'Home',
    path: "/",
    icon: <AiIcons.AiFillHome/>
  },
  {
    title: 'Quản lý nhân khẩu',
    path: "/demographic",
    icon: <BsIcons.BsFillPersonLinesFill/>,
    subNav: [
      {
        title: 'Danh sách nhân khẩu',
        path: '/demographic',
        icon: <FaIcons.FaListAlt />
      },
      {
        title: 'Thêm nhân khẩu',
        path: '/demographic/demographic-add',
        icon: <AiIcons.AiFillPlusCircle />
      }
    ]
  },
  {
    title: 'Quản lý hộ khẩu',
    path: '/household',
    icon: <FaIcons.FaAddressBook />,
    subNav: [
      {
        title: 'Danh sách hộ khẩu',
        path: '/household',
        icon: <FaIcons.FaListAlt />
      },
      {
        title: 'Thêm hộ khẩu',
        path: '/household/household-add',
        icon: <AiIcons.AiFillPlusCircle />
      }
    ]
  },
  {
    title: 'Quản lý tạm trú',
    path: '/tabernacle',
    icon: <BsIcons.BsPersonPlusFill/>,

  },
  {
    title: 'Quản lý tạm vắng',
    path: '/absent',
    icon: <BsIcons.BsPersonDashFill />

  },
  {
    title: 'About',
    path: '/about',
    icon: <SiIcons.SiAboutdotme />
  }
];