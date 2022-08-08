import React, { useState } from 'react'
import { useQuery, useQueryClient } from "react-query";
import {Table,Input, Typography, Button, Space, Alert, Spin, Tooltip, Divider, Row, Col, notification, Tag} from "antd";
import PretService from '../api/prets.js';
import { EditOutlined, InfoCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import {NavLink} from "react-router-dom"
import moment from 'moment';

const { Title } = Typography
const {Search } = Input;



const Prets = () => {
    
    const columns = [
        {
            title: "Numero",
            dataIndex: 'id',
            key: 'id',
            sorter: (a,b) => a.id - b.id
        },
        {
            title: "N° Livre",
            dataIndex: 'numeroLivre',
            key: 'numeroLivre',
            sorter: (a,b) => a.numeroLivre - b.numeroLivre,
        },
        {
            title: "N° Lecteur",
            dataIndex: 'numeroLecteur',
            key: 'numeroLecteur',
        },
        {
            title: "Date de Pret",
            dataIndex: 'datePret',
            key: 'datePret',
            render: (date) => ( <p>{(moment(date).format("DD/MM/YYYY"))}</p>)
        },
        {
            title: "Date de Retour",
            dataIndex: 'dateRetour',
            key: 'dateRetour',
            render: (retour) => ( <p>{(moment(retour).format("DD/MM/YYYY"))}</p>)
        },
        {
            title: "Status",
            dataIndex: 'rendu',
            key: 'rendu',
            render: (_,record) =>( <Tag color={ record.rendu ? "blue" : "error"}>{record.rendu ? "Rendu": "En Cours"}</Tag> ),
            sorter: (a,b) => a.rendu - b.rendu
        },
        {
            title: "Actions",
            dataIndex: 'id',
            key: 'id',
            render: (_,record) => (
                <Space size="middle">
                    { !record.rendu && <Tooltip title="Modifier" color={"green"}>
                            <Button  onClick={(event)=>handleDelivery(record.id,record.dateRetour)} type='secondary' icon={<EditOutlined/>}>Delivrer</Button>
                    </Tooltip>}
                    <Tooltip title="consulter" color={"blue"}>
                        <NavLink to={"/prets/info/"+ record.id}>
                            <Button type='primary' icon={<InfoCircleOutlined  color='title'/>}/>
                        </NavLink>
                    </Tooltip>
                </Space>
            )
        },
    ]

    const {isLoading, error, data} = useQuery('prets', PretService.getPrets);
    
    const [filterInput, setFilterInput] = useState(null);
    const [filterTable,setFilterTable] = useState(null);
    
    const [page,setPage] = useState(1);
    const [pageSize,setPageSize] = useState(6);
    

    const queryClient = useQueryClient()


    const handleDelivery = async (id,dateRetour) => {
        await PretService.deliverPret(id);
        queryClient.invalidateQueries("prets","livres","lecteurs");
        if(moment(dateRetour).isBefore(Date.now())){
            notification.warning({
                message: "Pret delivrer avec Retard",
                description: "Vous devez payer un lamende de 5000 Ariary !"
            })
        }else{
            notification.success({
                message: "Pret delivrer avec success",
                description: "Liste des livre et prets mis à jour!"
            })
        }

    }

    const onSearch = (value) => {
        
        const filterData = data.filter((item)=> Object.keys(item).some((key) => String(item[key])
            .toLowerCase()
            .includes(value.toLowerCase())));
        setFilterTable(filterData);
    }

    if(isLoading) return <Spin tip="Chargement ...">
        <Alert message="Recuperation des données" description="Veuillez patientez" type='info'/>
    </Spin>

    if(error) return <Spin tip="Oups, Erreur !!">
        <Alert message="Une erreur s'est produit lors de la recuperation des lecteurs" description="Veuillez patientez" type='info'/>
    </Spin>

  return (
    <>
        <Title level={2}>Prets</Title>
        <Row>
            <Col span={14}>
                <Tooltip title="Nouveau Pret">
                    <NavLink to={"/prets/add"}>
                        <Button type='primary' icon={<UserAddOutlined color='title'/>}>
                            Nouveau
                        </Button>
                    </NavLink>
                </Tooltip>
            </Col>
            <Col span={10}>
                <Search placeholder="Rechercher ..." allowClear onSearch={onSearch} onChange={(e)=> onSearch(e.target.value) } style={{ width: "100%" }} />{filterInput}
            </Col>
        </Row>
        <Divider/>
        <Table 
            columns={columns} 
            dataSource={filterTable == null ? data : filterTable} 
            rowKey={data => data.id} 
            pagination={{ 
                current:page, 
                pageSize:pageSize,
                onChange: (page,pageSize)=>{
                    setPage(page);
                    setPageSize(pageSize);
                }
            }}
        />
    </>
  )
}

export default Prets;