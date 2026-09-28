import { fetchIngredients } from '@slices/ingredientsSlice';
import { fetchProfileOrders, selectProfileOrders } from '@slices/profileOrdersSlice';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';

import { useDispatch, useSelector } from '@services/store';

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector(selectProfileOrders);

  useEffect(() => {
    void dispatch(fetchIngredients());
    void dispatch(fetchProfileOrders());
  }, [dispatch]);

  if (isLoading && !orders.length) return <Preloader />;
  if (error && !orders.length) return <p role="alert">{error}</p>;

  return <ProfileOrdersUI orders={orders} />;
};
