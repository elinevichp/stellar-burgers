import { fetchFeed, selectFeed } from '@slices/feedSlice';
import { fetchIngredients } from '@slices/ingredientsSlice';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect } from 'react';

import { useDispatch, useSelector } from '@services/store';

export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector(selectFeed);

  useEffect(() => {
    void dispatch(fetchIngredients());
    void dispatch(fetchFeed());
  }, [dispatch]);

  const handleGetFeeds = (): void => {
    void dispatch(fetchFeed());
  };

  if (isLoading && !orders.length) return <Preloader />;
  if (error && !orders.length) return <p role="alert">{error}</p>;

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
