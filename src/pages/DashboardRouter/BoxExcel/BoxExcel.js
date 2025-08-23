import Back from 'components/Back/Back'
import PaymentMethods from 'components/PaymentMethods/PaymentMethods'
import config from 'Constants/environment'
import React from 'react'

const BoxExcel = () => {
  return (
    <div className="w-full h-full bg-gray-100 p-2">
      <Back/>
    <PaymentMethods title="استعراض ملفات الصندوق" endPoint={`${config.boxExcel}`}/>
  
</div>
  )
}

export default BoxExcel