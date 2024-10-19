import { ArrowLeftOutlined, LoadingOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import CustomSelect from '../components/CustomSelect'
import { useAxios } from '../hooks/useAxios'
import toast, { Toaster } from 'react-hot-toast'
import dayjs from 'dayjs'

function OrganizationAdd() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const dateFormat = 'YYYY-MM-DD';
  const { $y, $M, $D } = dayjs()
  const location = (useLocation())
  const isUser = location.pathname.includes("capital-users")

  const usersStatus = [
    {
      value: '1',
      label: 'Faol',
    },
    {
      value: '2',
      label: 'Faol emas',
    },
  ]

  const statusData = [
    {
      value: '1',
      label: 'Faol',
    },
    {
      value: '2',
      label: 'Faol emas',
    },
    {
      value: '3',
      label: 'Jarayonda',
    }
  ]
  const regoinsData = [
    {
      value: '1',
      label: 'Toshkent shahri',
    },
    {
      value: '1',
      label: 'Xorazm viloyati',
    },
    {
      value: '2',
      label: 'Samarqand viloyati',
    },
    {
      value: '3',
      label: 'Andijon viloyati',
    }
  ]
  const [companyName, setCompanyName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [job, setJob] = useState(null)
  const [inn, setInn] = useState(null)
  const [statusId, setStatusId] = useState(null)
  const [statusName, setStatusName] = useState(null)
  const [regionId, setRegionId] = useState(null)
  const [regionName, setRegionName] = useState(null)
  const [address, setAddress] = useState(null)
  const [createdDate, setCreatedDate] = useState(null)
  const handlePicker = (date, dateString) => {
    setCreatedDate(dateString);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      key: Math.round(Math.random() * 100),
      companyName,
      inn,
      status: statusId,
      regionId: regionId,
      regionName,
      address,
      createdDate: createdDate ? createdDate : $y + "-" + ($M + 1) + "-" + $D
    }
    const user = {
      key: Math.round(Math.random() * 100),
      name: companyName,
      email: email,
      status: statusId,
      phone: phoneNumber,
      job: job,
      address,
    }
    if (isUser) {
      if (id) {
        useAxios().put(`/users/${id}`, user).then(() => {
          setIsLoading(true)
          toast.success("Foydalanuvchi tahrirlandi")
          setTimeout(() => {
            setIsLoading(false)
            navigate(-1)
          }, 1000)
        })
      }
      else {
        useAxios().post('/users', user).then(res => {
          setIsLoading(true)
          toast.success("Faoydalanuvchi qoshildi")
          setTimeout(() => {
            setIsLoading(false)
            navigate(-1)
          }, 500)
        })
      }
    }
    else {
      if (id) {
        useAxios().put(`/organization/${id}`, data).then(() => {
          setIsLoading(true)
          toast.success("Tashkilot tahrirlandi")
          setTimeout(() => {
            setIsLoading(false)
            navigate(-1)
          }, 1000)
        })
      }
      else {
        useAxios().post('/organization', data).then(res => {
          setIsLoading(true)
          toast.success("Tashkilot qoshildi")
          setTimeout(() => {
            setIsLoading(false)
            navigate(-1)
          }, 500)
        })
      }

    }

  }

  useEffect(() => {
    if (id) {
      useAxios().get(isUser ? `/users/${id}` : `/organization/${id}`).then(res => {
        if (isUser) {
          setCompanyName(res.data.name)
          setEmail(res.data.email)
          setStatusId(res.data.status)
          setPhoneNumber(res.data.phone)
          setJob(res.data.job)
          setAddress(res.data.address)
        }
        else{
          setCompanyName(res.data.companyName)
          setInn(res.data.inn)
          setStatusId(res.data.status ? "1" : "2")
          setRegionId(res.data.regionId)
          setRegionName(res.data.regionName)
          setAddress(res.data.address)
          if (res.data.createdDate.includes(".")) {
            setCreatedDate(res.data.createdDate.split(".").reverse().join("-"))
          }
          else {
            setCreatedDate(res.data.createdDate)
          }
        }
      })
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className='p-5'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <button type='button' onClick={() => navigate(-1)}><ArrowLeftOutlined className='scale-150' /></button>
          <h2 className='text-[25px] font-bold'>{id ? (isUser ? "Foydalanuvchi tahrirlash" :   "Tashkilot tahrirlash") : (isUser ? "Foydalanuvchi yaratish" :   "Tashkilot yaratish")}</h2>
        </div>
        <Button htmlType='submit' icon={isLoading ? <LoadingOutlined /> : <UserAddOutlined />} size='large' type='primary'>Saqlash</Button>
      </div>
      <div className='w-[70%] mt-10 flex justify-between'>
        <div className='w-[49%] space-y-4'>
          <label className='space-y-2 flex flex-col'>
            <span className='text-[15px]'>{isUser ? "Foydalanuvchi nomi kiriting" : "Tashkilot nomi kiriting"}</span>
            <Input className='text-[20px]' required allowClear size='large' placeholder={isUser ?'Foydalanuvchi nomini kiriting' : 'Tashkilot nomini kiriting'} type='text' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </label>
          <label className='space-y-2 flex flex-col'>
            <span className='text-[15px]'>{isUser ? "Email kiriting" : "INN kiriting"}</span>
           {isUser ? <Input  className='text-[20px]' required allowClear size='large' placeholder='email kiriting' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
           : <Input maxLength={9} className='text-[20px]' required allowClear size='large' placeholder='INN kiriting' type='number' value={inn} onChange={(e) => setInn(e.target.value)} />}
          </label>
          <label className='space-y-2 flex flex-col'>
            <span className='text-[15px]'>Holat turini tanlang</span>
            <CustomSelect setLabelValue={setStatusName} value={statusId} placeholder={"Holat turini tanlang"} options={isUser ? usersStatus : statusData } setChooseId={setStatusId} width={"100%"} />
          </label>
          <label className='space-y-2 flex flex-col'>
            <span className='text-[15px]'>{isUser ? "Kasb/Soha kiriting" : "Hudud tanlang"}</span>
            {isUser ? <Input className='text-[20px]' required allowClear size='large' placeholder='Kasb kiriting' type='text' value={job} onChange={(e) => setJob(e.target.value)} />
            : <CustomSelect value={regionName} setLabelValue={setRegionName} placeholder={"Hudud tanlang"} options={regoinsData} setChooseId={setRegionId} width={"100%"} />}
          </label>
        </div>
        <div className='w-[49%] space-y-4'>
          <label className='space-y-2 flex flex-col'>
            <span className='text-[15px]'>Manzil kiriting</span>
            <Input className='text-[20px]' required allowClear size='large' placeholder='Manzil kiriting' type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
          <label className='space-y-2 flex flex-col'>
            <span className='text-[15px]'>{isUser ? "Telefon raqamingiz" : "Vaqt kiriting"}</span>
            {isUser ? <Input className='text-[20px]' required allowClear size='large' placeholder='Raqam kiriting' type='number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            : <DatePicker allowClear={false} value={createdDate ? dayjs(createdDate, dateFormat) : dayjs()} onChange={handlePicker} className='py-[10px]' size='large' />}
          </label>
        </div>
      </div>
    </form>
  )
}

export default OrganizationAdd
