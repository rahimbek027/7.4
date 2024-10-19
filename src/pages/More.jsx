import React, { useEffect, useState } from 'react'
import { useAxios } from '../hooks/useAxios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftOutlined, EditOutlined, LineOutlined } from '@ant-design/icons'
import { Button } from 'antd'

function More() {
  const navigate = useNavigate()
  const [singleData, setSingleData] = useState({})
  const location = useLocation()

  const { id } = useParams()

  useEffect(() => {
    if (location.pathname.includes("capital-users")) {
      useAxios().get(`/users/${id}`).then(res =>
        setSingleData(res.data)
      )
    }
    else {
      useAxios().get(`/organization/${id}`).then(res =>
        setSingleData(res.data)
      )
    }
  }, [])

  return (
    <div className='p-5'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-5'>
          <ArrowLeftOutlined onClick={() => navigate(-1)} className='scale-[1.5]' />
          <h2 className='text-[25px] font-bold'>{singleData?.companyName ? singleData.companyName : singleData.name ? singleData.name : <LineOutlined />}</h2>
        </div>
        <Button onClick={() => navigate(`edit`)} icon={<EditOutlined />} size='large' type='primary'>Tahrirlash</Button>
      </div>
      <ul className='mt-10 border-gray-400 flex  border-[2px] rounded-lg shadow p-4 w-[50%]'>
        <li className='space-y-4 w-[50%]'>
          <div className='flex flex-col space-y-2'>
            <span className='text-[15px] leading-[18px] text-gray-400'>ID</span>
            <strong className='text-[20px] leading-[22px] font-semibold'>{singleData?.id}</strong>
          </div>
          <div className='flex flex-col space-y-2'>
            <span className='text-[15px] leading-[18px] text-gray-400'>{singleData.name ? "Foydalanuvchi Nomi" : "Tashkilot Nomi"}</span>
            <strong className='text-[20px] leading-[22px] font-semibold'>{singleData?.companyName ? singleData.companyName : singleData.name ? singleData.name : <LineOutlined />}</strong>
          </div>
          <div className='flex flex-col space-y-2'>
            <span className='text-[15px] leading-[18px] text-gray-400'>{singleData.email ? "Email" : "INN"}</span>
            <strong className='text-[20px] leading-[22px] font-semibold'>{singleData?.inn ? singleData.inn : singleData.email ? singleData.email : <LineOutlined />}</strong>
          </div>
          <div className='flex flex-col space-y-2'>
            <span className='text-[15px] leading-[18px] text-gray-400'>Holati</span>
            <strong className='text-[20px] leading-[22px] font-semibold'>
              {singleData?.status == 1 ? "Faol" : singleData?.status == "2" ? "Faol emas" : singleData?.status == "3" ? "Jarayonda" :
              singleData?.status ? "Faol" : "Faol emas"}
            </strong>
          </div>
        </li>
        <li className='space-y-4 w-[50%]'>
          <div className='flex flex-col space-y-2'>
            <span className='text-[15px] leading-[18px] text-gray-400'>{singleData.job ? "Kasbi" : "Hudud"}</span>
            <strong className='text-[20px] leading-[22px] font-semibold'>{singleData?.regionName ? singleData?.regionName : singleData.job}</strong>
          </div>
          <div className='flex flex-col space-y-2'>
            <span className='text-[15px] leading-[18px] text-gray-400'>Manzil</span>
            <strong className='text-[20px] leading-[22px] font-semibold'>{singleData?.address}</strong>
          </div>
          <div className='flex flex-col space-y-2'>
            <span className='text-[15px] leading-[18px] text-gray-400'>{singleData.phone ? "Raqami" : "Yaratilgan vakt"}</span>
            <strong className='text-[20px] leading-[22px] font-semibold'>{singleData?.createdDate ? singleData?.createdDate : singleData.phone}</strong>
          </div>
        </li>
      </ul>
    </div >
  )
}

export default More
