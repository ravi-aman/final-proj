import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <div className='flex p-5 justify-between w-full'>
        <div className='flex flex-col '>
          <div className='font-bold text-2xl'>Home</div>
          <div>Snipets</div>
        </div>
        <div>
          <Link href='/snippet/new'>
            <button className='bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl transition duration-300'>
              New Snippet
            </button>
          </Link>
        </div>
      </div>
    </div >
  )
}

export default page
