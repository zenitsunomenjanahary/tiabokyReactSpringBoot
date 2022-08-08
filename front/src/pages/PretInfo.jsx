import React from 'react'
import { Space,Spin, Alert, Tooltip,Button,Divider,Tag, Typography } from "antd";
import { NavLink, useParams } from 'react-router-dom';
import { AiOutlineRollback } from 'react-icons/ai';
import { useQuery } from 'react-query';
import PretService from '../api/prets';

const {Title} = Typography

const PretInfo = () => {
    const id = useParams().id;
    const {isLoading, error, data} = useQuery("pretInfo", ()=> PretService.getPretInformation(id))
    if(isLoading) return <Spin tip="Chargement ...">
        <Alert message="Recuperation des données" description="Veuillez patientez" type='info'/>
    </Spin>

    if(error) return <Spin tip="Oups, Erreur !!">
        <Alert message="Une erreur s'est produit lors de la recuperation du livre" description="Veuillez patientez" type='info'/>
    </Spin>
    console.log(data);
  return (
    <>
        <Space direction='horizontal'>
            <Tooltip title={"retour"}>
                <NavLink to={"/prets"}>
                    <Button icon={<AiOutlineRollback/>} type="primary"/>
                </NavLink>
            </Tooltip>
        </Space>
        <Divider/>
        <Space>
            <Space direction='vertical' size={"large"}>
                <Title level={3}>Informartion du pret N° {id}</Title>
                <Space>
                    <Typography>Date de Pret :</Typography>
                    <Title level={5}>{data.pretData.datePret}</Title>
                </Space>
                <Space>
                    <Typography>Date de Retour :</Typography>
                    <Title level={5}>{data.pretData.dateRetour}</Title>
                </Space>
                <Space>
                    <Typography>Nom du Lecteur :</Typography>
                    <Title level={5}>{data.lecteurData.nom} {data.lecteurData.prenom} </Title>
                </Space>
                <Space>
                    <Typography>Telephone du Lecteur :</Typography>
                    <Title level={5}>{data.lecteurData.tel} </Title>
                </Space>
                <Space>
                    <Typography>Titre du Livre :</Typography>
                    <Title level={5}>{data.livreData.titre}</Title>
                </Space>
                <Space>
                    <Typography>Status du pret:</Typography>
                    <Title level={5}>
                        <Tag color={data.pretData.rendu ? "blue" : "error"}> {data.pretData.rendu ? "rendu" : "en cours "} </Tag>
                    </Title>
                </Space>
            </Space>
        </Space>
    </>
  )
}

export default PretInfo