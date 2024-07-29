import { ReactNode } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoLibraryOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoCommentDiscussion } from "react-icons/go";
import { GrAchievement } from "react-icons/gr";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoIosGlobe } from "react-icons/io";
import { LuMailQuestion } from "react-icons/lu";




export const navLinks = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Discover',
    path: '/discover',
  },
  {
    title: 'About',
    path: '/about-us',
  },
  {
    title: 'Contact Us',
    Path: '/contact-us',
  }
];

export const sidebarLinks: any = [
  {
    title: 'Home',
    Path: '/',
    icon: IoHomeOutline
  },
  {
    title: 'My Modules',
    Path: '/my-modules',
    icon: IoLibraryOutline
  },
  {
    title: 'Leaderboard',
    Path: '/leaderboard',
    icon: GrAchievement
  },
  {
    title: 'Test History',
    Path: '/my-tests',
    icon: IoNewspaperOutline
  },
  {
    title: 'Settings',
    Path: '/settings/update-profile',
    icon: IoSettingsOutline
  },
  {
    title: 'Buy Modules',
    Path: '/buy-modules',
    icon: MdOutlineShoppingCart
  },
  {
    title: 'Community',
    Path: '/community',
    icon: GoCommentDiscussion
  },

];

export const infoLinks = [
  {
    title: 'Join Now',
    path: '/signup'
  },
  {
    title: 'About Us',
    path: '/about-us'
  },
  {
    title: 'contact Us',
    path: '/contact-us'
  },
]