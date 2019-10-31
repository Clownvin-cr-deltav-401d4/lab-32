import {useContext} from 'react';
import {ItemCountContext} from '../context/item-count';

export default function useItemCount() {
  return useContext(ItemCountContext);
}