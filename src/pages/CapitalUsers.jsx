import { Button, Input, Modal, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomTable from '../components/CustomTable'
import {MedicineBoxOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, LineOutlined } from '@ant-design/icons'
import { useAxios } from '../hooks/useAxios'
import toast, { Toaster } from 'react-hot-toast'

function CapitalUsers() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const columns = [
    {
      title: 'ID',
      dataIndex: 'index',

    },
    {
      title: 'Ismi',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Holati',
      dataIndex: 'status',
    },
    {
      title: 'Raqami',
      dataIndex: 'phone',
    },
    {
      title: 'Kasbi',
      dataIndex: 'job',
    },
    {
      title: 'Manzil',
      dataIndex: 'address',
    },
    {
      title: 'Batafsil',
      dataIndex: 'action',
    },
  ];



  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    }
  });
  function handleTableChange(page) {
    setTableParams({ ...tableParams, pagination: { ...tableParams.pagination, current: page.current } })
  }
 


  function handleSearch(e) {
    setIsLoading(true)
    if (e.target.value) {
      const fileredUsers = allUsers.filter(item => item.name.length > 0  ? item.name.toLowerCase().includes(e.target.value.toLowerCase()) : "");
      setTimeout(() => {
        setUsers(fileredUsers)
        setIsLoading(false)
      }, 1000)
    } else {
      setTimeout(() => {
        setUsers(allUsers)
        setIsLoading(false)
      }, 1000)
    }
  }
 

 
  const [deleteId, setDeleteId] = useState(null)
  function handleDeleteShow(id) {
    setDeleteModal(true)
    setDeleteId(id)
  }
  function handleDelete() {
    useAxios().delete(`/users/${deleteId}`).then(() => {
      setIsLoading(true)
      setDeleteModal(false)
      setTimeout(() => {
        setRefresh(!refresh)
        toast.success("foydalanuvchilari o'chirildi")
      }, 500)
    })
  }


  
  useEffect(() => {
    useAxios().get(`/users`).then(res => {
      setIsLoading(false)
      const formattedUsers = res.data.map((item, index) => {
        item.index = index + 1;
        item.address = <Popover placement="top" content={item.address}>
          <p className='text-ellipsis cursor-pointer whitespace-nowrap overflow-hidden w-[180px]'>{item.address}</p>
        </Popover>
        item.name = item.name ? item.name : <LineOutlined />
        item.email = item.email ? item.email : <LineOutlined />
        item.status = item.status ? "Faol" : "Faol emas"
        item.action = <div className='flex items-center space-x-6'>
          <EllipsisOutlined onClick={() => navigate(`${item.id}`)} className='scale-[1.5] duration-300 hover:scale-[1.8]' />
          <EditOutlined onClick={() => navigate(`${item.id}/edit`)} className='scale-[1.5] duration-300 hover:scale-[1.8]' />
          <DeleteOutlined onClick={() => handleDeleteShow(item.id)} className='scale-[1.5] duration-300 hover:scale-[1.8]' />
        </div>
        return item
      })
        setUsers(formattedUsers)
        setAllUsers(formattedUsers)
    })
  }, [refresh]);
  
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='p-5'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-[25px] font-bold'>Poytaxt foydalanuvchilari</h2>
            <span className='text-[15px] pl-1'>foydalanuvchilari ({allUsers.length})</span>
          </div>
          <Button onClick={() => navigate('add')} icon={<MedicineBoxOutlined />} size='large' type='primary'>Qo'shish</Button>
        </div>
        <div className='mt-6'>
          <Input onChange={handleSearch} className='w-[350px]' type='text' placeholder='Qidirish...' size='large' allowClear />
        </div>
        <div className='mt-5'>
          <CustomTable onChange={handleTableChange} tableParams={tableParams} isLoading={isLoading} columns={columns} data={users} />
        </div>
      </div>
      {deleteModal && <div className='backdrop-blur fixed inset-0 flex items-center justify-center' >   <Modal footer open={deleteModal} onCancel={() => setDeleteModal(false)}>
        <h3 className='text-[20px] text-center font-semibold'>Foydalanuvchi ochirish ...?</h3>
        <div className='flex items-center justify-between mt-5'>
          <Button onClick={() => setDeleteModal(false)} size='large' className='w-[48%]' type='default'>Yo'q</Button>
          <Button onClick={handleDelete} size='large' className='!bg-red-500 w-[48%]' type='primary'>Ochirish</Button>
        </div>
      </Modal> </div>}
    </>
  )
}

export default CapitalUsers
