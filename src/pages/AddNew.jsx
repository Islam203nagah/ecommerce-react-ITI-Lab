import NewCategory from '@/components/ui/CreateCategory';
import NewProduct from '@/components/ui/NewProduct';
import CreateUser from '@/components/ui/CreateUser';
import React from 'react'
import { useLocation } from 'react-router';

const AddNew = () => {
    const location = useLocation();
    const [, urlnew,] = location.pathname.split('/');
  return (
    <div>
      {urlnew==="products"?<NewProduct></NewProduct>:urlnew==="categories"?<NewCategory></NewCategory>:<CreateUser></CreateUser>}
    </div>
  )
}

export default AddNew
