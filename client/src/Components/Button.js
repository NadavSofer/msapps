import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Button = ({text, pageNumber, action}) => {
  const dispatch = useDispatch();
  const maxPage = useSelector(state => state.data.lastPage)

  useEffect(()=> {

  },[maxPage])

  
  return (
    <button 
    disabled={(pageNumber === 1 && text === 'Prev') || (pageNumber === maxPage && text === 'Next')} 
    className={`bg-cyan-400 text-slate-100 text-3xl m-5 px-5 py-3 w-40 rounded-xl 
    ${(pageNumber === 1 && text === 'Prev') || 
    (pageNumber === Number(maxPage) && text === 'Next') ? 'opacity-50': '' }`} 
    onClick={()=> dispatch(action)}>
      {text}
    </button>
  )
}

export default Button