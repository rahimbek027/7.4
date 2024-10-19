import { Button, Input, Modal, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import CustomSelect from '../components/CustomSelect'
import CustomTable from '../components/CustomTable'
import {MedicineBoxOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, LineOutlined } from '@ant-design/icons';
import { useAxios } from '../hooks/useAxios';
import { useNavigate } from 'react-router-dom'

function Organization() {
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState(false)
  const [regionId, setRegionId] = useState("")
  const [allData, setAllData] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)
  const regionList = [
    {
      value: 1,
      label: 'Toshkent shahar'
    },
    {
      value: 2,
      label: 'Samarqand viloyati'
    },
    {
      value: 3,
      label: 'Andijon viloyati'
    },
    {
      value: 4,
      label: 'Xorazm viloyati'
    },
    {
      value: 5,
      label: 'Jizzax viloyati'
    },
    {
      value: 6,
      label: 'Qoqon viloyati'
    },
  ]

  //  Pagination start
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    }
  });
  function handleTableChange(page) {
    setTableParams({ ...tableParams, pagination: { ...tableParams.pagination, current: page.current } })
  }
  // pagination end

  const columns = [
    {
      title: 'ID',
      dataIndex: 'index',

    },
    {
      title: 'Tashkilot Nomi',
      dataIndex: 'companyName',
    },
    {
      title: 'INN',
      dataIndex: 'inn',
    },
    {
      title: 'Holati',
      dataIndex: 'status',
    },
    {
      title: 'FIlial',
      dataIndex: 'regionName',
    },
    {
      title: 'Manzil',
      dataIndex: 'address',
    },
    {
      title: 'Yaratilgan vakt',
      dataIndex: 'createdDate',
    },
    {
      title: 'Batafsil',
      dataIndex: 'action',
    },
  ];
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Saerch start
  function handleSearch(e) {
    setIsLoading(true)
    if (e.target.value) {
      const fileredData = allData.filter(item => item.companyName.length > 0 ? item.companyName.toLowerCase().includes(e.target.value.toLowerCase()) : "");
      setTimeout(() => {
        setData(fileredData)
        setIsLoading(false)
      }, 1000)
    } else {
      setTimeout(() => setData(allData), 1000)
    }
  }
  // Search end

  // Delete start 
  const [deleteId, setDeleteId] = useState(null)
  function handleDeleteShow(id) {
    setDeleteModal(true)
    setDeleteId(id)
  }
  function handleDelete() {
    useAxios().delete(`/organization/${deleteId}`).then(() => {
      setIsLoading(true)
      setDeleteModal(false)
      setTimeout(() => {
        setRefresh(!refresh)
      }, 500)

    })
  }
  // Delete end


  // request get all start
  useEffect(() => {
    useAxios().get(`/organization?regionId=${regionId}`).then(res => {
      setIsLoading(false)
       const formattedData = res.data.map((item, index) => {
        item.index = index + 1;
        item.address = <Popover placement="top" content={item.address}>
          <p className='text-ellipsis cursor-pointer whitespace-nowrap overflow-hidden w-[180px]'>{item.address}</p>
        </Popover>
        item.companyName = item.companyName ? item.companyName : <LineOutlined />
        item.inn = item.inn ? item.inn : <LineOutlined />
        switch (item.status) {
          case "1":
            item.status = "Faol"
            break;
          case "2":
            item.status = "Faol emas"
            break;
          case "3":
            item.status = "Jarayonda"
            break;
        }
        item.action = <div className='flex items-center space-x-6'>
          <EllipsisOutlined onClick={() => navigate(`${item.id}`)} className='scale-[1.5] duration-300 hover:scale-[1.8]' />
          <EditOutlined onClick={() => navigate(`${item.id}/edit`)} className='scale-[1.5] duration-300 hover:scale-[1.8]' />
          <DeleteOutlined onClick={() => handleDeleteShow(item.id)} className='scale-[1.5] duration-300 hover:scale-[1.8]' />
        </div>
        return item
      })
      setData(formattedData)
      setAllData(formattedData)
    })
  }, [refresh, regionId]);
  // request end

  return (
    <>
      <div className='p-5'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-[25px] font-bold'>Tashkilotlar</h2>
            <span className='text-[15px] pl-1'>tashkilotlar ({allData.length})</span>
          </div>

          <Button onClick={() => navigate('/add')} icon={<MedicineBoxOutlined/>} size='large' type='primary'>Qo'shish</Button>
        </div>
        <div className='flex items-center space-x-5 mt-6'>
          <Input onChange={handleSearch} className='w-[350px]' type='text' placeholder='Qidirish...' size='large' allowClear />
          <CustomSelect width={'350px'} setIsLoading={setIsLoading} placeholder={'Tanlash...'} options={regionList} setChooseId={setRegionId} />
        </div>
        <div className='mt-5'>
          <CustomTable onChange={handleTableChange} tableParams={tableParams} isLoading={isLoading} columns={columns} data={data} />
        </div>
      </div>
      {deleteModal && <div className='backdrop-blur fixed inset-0 flex items-center justify-center' >   <Modal footer open={deleteModal} onCancel={() => setDeleteModal(false)}>
        <h3 className='text-[20px] text-center font-semibold'>Tashkilot ochirish ...?</h3>
        <div className='flex items-center justify-between mt-5'>
          <Button onClick={() => setDeleteModal(false)} size='large' className='w-[48%]' type='default'>Yo'q</Button>
          <Button onClick={handleDelete} size='large' className='!bg-red-500 w-[48%]' type='primary'>Ochirish</Button>
        </div>
      </Modal> </div>}
    </>
  )
}

export default Organization
