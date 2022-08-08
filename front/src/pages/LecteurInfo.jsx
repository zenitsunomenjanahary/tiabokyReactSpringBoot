import React from 'react'
import { Typography, Spin, Divider,Image, Alert, Space, Button, Tag, Tooltip} from "antd";
import LecteurIllustration from "../assets/lecteur.jpg";
import { useQuery } from 'react-query';
import LecteurService from "../api/lecteurs.js"
import { NavLink, useParams } from 'react-router-dom';
import { AiOutlineRollback } from 'react-icons/ai';
const { Title } = Typography

const LecteurInfo = () => {
    const id = useParams().id
    const {isLoading,error,data} = useQuery("lecteur", ()=> LecteurService.getLecteurById(id))
    
    if(isLoading) return <Spin tip="Chargement ...">
        <Alert message="Recuperation des données du lecteur" description="Veuillez patientez" type='info'/>
    </Spin>

    if(error) return <Spin tip="Oups, Erreur !!">
        <Alert message="Une erreur s'est produit lors de la recuperation des lecteurs" description="Veuillez patientez" type='info'/>
    </Spin>
  return (
    <>
        <Space direction='horizontal'>
        <Tooltip title="retour">
            <NavLink to={"/lecteurs"}>
                <Button icon={<AiOutlineRollback/>} type="primary"/>
            </NavLink>
        </Tooltip>
        </Space>
        <Divider/>
        <Space size={'large'} align={"center"} style={{ justifyContent: "space-between", boxShadow:"1px 1px 3px 1px", padding: '1rem'}}>
            <Space direction='vertical' size={'large'} >
            <Title level={3}>Lecteur N° {data.id}</Title>
                <Title level={5}> Nom : {data.nom} </Title>
                <Title level={5}> Prenom : {data.prenom} </Title>
                <Title level={5}> Adresse: {data.adresse} </Title>
                <Title level={5}> Telephone : {data.tel} </Title>
                <Title level={5}> Date de Naissance : { data.naissance} </Title>
                <Title level={5}> Pret Actuel : <Tag color={ data.pretActuel ? "blue" : "error"} > {data.pretActuel} </Tag></Title>
            </Space>
            <Image src={LecteurIllustration} width="600px" preview={false}/>
        </Space>
    </>
  )
}

export default LecteurInfo;