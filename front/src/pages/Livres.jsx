import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from "react-query";
import {Table,Input, Typography, Button, Space, Alert, Spin, Tooltip, Divider, Row, Col, notification, Tag} from "antd";
import LivreService from '../api/livres.js';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import {useNavigate,Link, NavLink} from "react-router-dom"
const { Title } = Typography
const {Search } = Input;



const Livres = () => {
    
    const columns = [
        {
            title: "Numero",
            dataIndex: 'id',
            key: 'id',
            sorter: (a,b) => a.id - b.id
        },
        {
            title: "Titre",
            dataIndex: 'titre',
            key: 'titre',
        },
        {
            title: "Autheur",
            dataIndex: 'autheur',
            key: 'autheur',
        },
        {
            title: "Date Edition",
            dataIndex: 'edition',
            key: 'edition',
        },
        {
            title: "Disponible",
            dataIndex: 'diponible',
            key: 'disponible',
            render: (_,record) => (
                <Tag color={ record.disponible ? "blue" : "error"}>{record.disponible ? "disponible": "en pret"}</Tag>
            )
        },
        {
            title: "Nombre de pret",
            dataIndex: "nb_pret",
            key: "nb_pret",
            render: (_,record) => (
                <p> { record.nbPret ? record.nbPret : "0"} </p>
                // <p>{record.nb_pret ? "0" : record.nb_pret }</p>
            )
        },
        {
            title: "Actions",
            dataIndex: 'id',
            key: 'id',
            render: (_,record) => (
                <Space size="middle">
                    <Tooltip title="Modifier" color={"green"}>
                        <Link to={"/livres/edit/" + record.id}>
                            <Button type='secondary' value={record.id} icon={<EditOutlined/>}/>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Supprimer" color={"red"}>
                        <Button type='danger primary' value={record.id}  onClick={(e)=>{ if(window.confirm("Supprimer le livre? ")){handleDeleteLivre(record.id)} }} icon={<DeleteOutlined color='title'/>}/>
                    </Tooltip>
                    <Tooltip title="Voir" color={"blue"}>
                        <NavLink to={"/livres/info/" + record.id}>
                            <Button type='primary' icon={<InfoCircleOutlined  color='title'/>}/>
                        </NavLink>
                    </Tooltip>
                </Space>
            )
        },
    ]

    const {isLoading, error, data} = useQuery('livres', LivreService.getLivres,{
        refetchOnMount: true
    });
    
    const [filterInput, setFilterInput] = useState(null);
    const [filterTable,setFilterTable] = useState(null);
    
    const [page,setPage] = useState(1);
    const [pageSize,setPageSize] = useState(6);
    
    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const {mutateAsync} = useMutation(LivreService.deleteLivre)
    
    const handleDeleteLivre = async (e) => {
        await mutateAsync(e)
        queryClient.invalidateQueries("livres");
        notification.success({
            message: "Suppression du livre terminer",
            description: "Livre supprimer"
        })
        navigate("/livres")
    }

    const onSearch = (value) => {
        
        const filterData = data.filter((item)=> Object.keys(item).some((key) => String(item[key])
            .toLowerCase()
            .includes(value.toLowerCase())));
        setFilterTable(filterData);
    }

    const handleNavigate = () => {
        navigate('/livres/add')
    }

    if(isLoading) return <Spin tip="Chargement ...">
        <Alert message="Recuperation des données" description="Veuillez patientez" type='info'/>
    </Spin>

    if(error) return <Spin tip="Oup, Erreur !!">
        <Alert message="Une erreur s'est produit lors de la recuperation des livres" description="Veuillez patientez" type='info'/>
    </Spin>

  return (
    <>
        <Title level={2}>Livres</Title>
        <Row>
            <Col span={14}>
                <Tooltip title="Nouveau livre">
                    <Button type='primary' onClick={handleNavigate} icon={<UserAddOutlined color='title'/>}>
                        Nouveau
                    </Button>
                </Tooltip>
            </Col>
            <Col span={10}>
                <Search placeholder="Rechercher livre..." allowClear onSearch={onSearch} onChange={(e)=> onSearch(e.target.value) } style={{ width: "100%" }} />{filterInput}
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

export default Livres;