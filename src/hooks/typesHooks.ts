import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector 
  } from 'react-redux';
import { TRootState } from '../services/store';
import type { AppDispatch } from '../services/store';

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector; 
export const  useAppDispatch = () => useDispatch<AppDispatch>();