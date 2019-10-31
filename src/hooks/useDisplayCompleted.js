import {useContext} from 'react';
import {DisplayCompletedContext} from '../context/display-completed';

export default function useDisplayCompleted() {
  return useContext(DisplayCompletedContext);
}