import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from "react-query";
import {Table,Input, Typography, Button, Space, Alert, Spin, Tooltip, Divider, Row, Col, notification} from "antd";
import LecteurService from '../api/lecteurs.js';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import {useNavigate,NavLink} from "react-router-dom"
const { Title } = Typography
const {Search } = Input;



const Lecteurs = () => {
    
    const columns = [
        {
            title: "Numero",
            dataIndex: 'id',
            key: 'id',
            sorter: (a,b) => a.id - b.id
        },
        {
            title: "Nom",
            dataIndex: 'nom',
            key: 'nom',
        },
        {
            title: "Prenom",
            dataIndex: 'prenom',
            key: 'prenom',
        },
        {
            title: "Adresse",
            dataIndex: 'adresse',
            key: 'adresse',
        },
        {
            title: "Telephone",
            dataIndex: 'tel',
            key: 'nom',
            sorter: (a,b) => a.tel - b.tel
        },
        {
            title: "Date de Naissance",
            dataIndex: 'naissance',
            key: 'nom',
        },
        {
            title: "Actions",
            dataIndex: 'id',
            key: 'id',
            render: (_,record) => (
                <Space size="middle">
                    <Tooltip title="Modifier" color={"green"}>
                        <NavLink to={"/lecteurs/edit/" + record.id}>
                            <Button type='secondary' value={record.id} icon={<EditOutlined/>}/>
                        </NavLink>
                    </Tooltip>
                    <Tooltip title="Supprimer" color={"red"}>
                        <Button type='danger primary' value={record.id}  onClick={(e)=>{ if(window.confirm("Supprimer le lecteur? ")){handleDeleteLecteur(record.id)} }} icon={<DeleteOutlined color='title'/>}/>
                    </Tooltip>
                    <Tooltip title="Voir" color={"blue"}>
                        <NavLink to={"/lecteurs/info/" + record.id}>
                            <Button type='primary' icon={<InfoCircleOutlined  color='title'/>}/>
                        </NavLink>
                    </Tooltip>
                </Space>
            )
        },
    ]

    const {isLoading, error, data} = useQuery('lecteurs', LecteurService.getLecteurs);
    
    const [filterInput, setFilterInput] = useState(null);
    const [filterTable,setFilterTable] = useState(null);
    
    const [page,setPage] = useState(1);
    const [pageSize,setPageSize] = useState(6);
    
    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const {mutateAsync} = useMutation(LecteurService.deleteLecteur)
    
    const handleDeleteLecteur = async (e) => {
        await mutateAsync(e)
        queryClient.invalidateQueries("lecteurs");
        notification.success({
            message: "Suppression du lecteur terminer",
            description: "Lecteur supprimer"
        })
        navigate("/lecteurs")
    }

    const onSearch = (value) => {
        
        const filterData = data.filter((item)=> Object.keys(item).some((key) => String(item[key])
            .toLowerCase()
            .includes(value.toLowerCase())));
        setFilterTable(filterData);
    }

    const handleNavigate = () => {
        navigate('/lecteurs/add')
    }

    if(isLoading) return <Spin tip="Chargement ...">
        <Alert message="Recuperation des données" description="Veuillez patientez" type='info'/>
    </Spin>

    if(error) return <Spin tip="Oups, Erreur !!">
        <Alert message="Une erreur s'est produit lors de la recuperation des lecteurs" description="Veuillez patientez" type='info'/>
    </Spin>

  return (
    <>
        <Title level={2}>Lecteurs</Title>
        <Row>
            <Col span={14}>
                <Tooltip title="Nouveau membre">
                    <Button type='primary' onClick={handleNavigate} icon={<UserAddOutlined color='title'/>}>
                        Nouveau
                    </Button>
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

export default Lecteurs