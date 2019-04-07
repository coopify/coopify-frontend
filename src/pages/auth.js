import LoginImage from '../resources/img/seo/login.png';
import { Login } from '../components/login'
import { Signup } from '../components/signup'
import{ FacebookSignUp } from '../components/facebookSignUp';
import { GoogleSignUp } from '../components/googleSignUp';
import {Profile} from '../components/profile';
import {CoopiesAccount} from '../components/coopiesAccount';
import {Offers} from '../components/offers';
import { OfferCreation } from '../components/offerCreation';
import { IndividualOffer } from '../components/individualOffer';
import { FilterOffers } from '../components/filterOffers';

export default [
  {
    path: '/login',
    exact: true,
    component: Login,
    seo: {
      title: 'User login',
      image: LoginImage,
    },
  },
  {
    path: '/signup',
    exact: true,
    component: Signup,
    seo: {
      title: 'Traditional signup',
      image: LoginImage,
    },
  },
  {
    path: '/facebook/signup',
    exact: true,
    component: FacebookSignUp,
    seo: {
      title: 'Facebook signup',
      image: LoginImage,
    },
  },
  {
    path: '/google/signup',
    exact: true,
    component: GoogleSignUp,
    seo: {
      title: 'Google signup',
      image: LoginImage,
    },
  },
  {
    path: '/user/profile',
    exact: true,
    component: Profile,
    seo: {
      title: 'Auth | ReactPWA Demo',
      description: 'Implementing Auth with ReactPWA is simple. Check out this fake auth example for more details',
      image: LoginImage,
    },
  },
  {
    path: '/user/coopiesAccount',
    exact: true,
    component: CoopiesAccount,
    seo: {
      title: 'Auth | ReactPWA Demo',
      description: 'User coopies',
      image: LoginImage,
    },
  },
  {
    path: '/offers',
    exact: true,
    component: Offers,
    seo: {
      title: 'Auth | ReactPWA Demo',
      description: 'Offers',
      image: LoginImage,
    },
  },
  {
    path: '/offers/:id',
    exact: true,
    component: IndividualOffer,
    seo: {
      title: 'Auth | ReactPWA Demo',
      description: 'Offers',
      image: LoginImage,
    },
  },
  {
    path: '/seeOffers',
    exact: true,
    component: FilterOffers,
    seo: {
      title: 'Auth | ReactPWA Demo',
      description: 'Offers',
      image: LoginImage,
    },
  },
  {
    path: '/offer/create',
    exact: true,
    component: OfferCreation,
    seo: {
      title: 'Auth | ReactPWA Demo',
      description: 'User coopies',
      image: LoginImage,
    },
  },
  {
    path: '/logout',
    exact: true,
    component: import('../components/logout'),
    seo: {
      title: 'Logging out...',
    },
  },
  {
    path: '/home',
    exact: true,
    component: import('../components/home'),
    seo: {
      title: 'User homerpage',
    },
  },
];
