import React from 'react'
import { Typography, Spin, Divider,Image, Alert, Space, Tooltip, Button, Tag} from "antd";
import LivreIllustration from "../assets/livre.jpg";
import { useQuery } from 'react-query';
import LivreService from "../api/livres.js"
import { NavLink, useParams } from 'react-router-dom';
import { AiOutlineRollback } from 'react-icons/ai';
const { Title } = Typography

const LivreInfo = () => {
    const id = useParams().id
    const {isLoading,error,data} = useQuery("livre", ()=> LivreService.getLivreById(id))

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
            <Tooltip title="retour">
                <NavLink to={"/livres"}>
                    <Button icon={<AiOutlineRollback/>} type="primary"/>
                </NavLink>
            </Tooltip>
        </Space>
        <Divider/>
        <Space size={'large'} align={"center"} style={{ justifyContent: "space-between", boxShadow:"1px 1px 3px 1px", padding: '1rem'}}>
            <Space direction='vertical' size={'large'} >
            <Title level={3}>Livre N° {data.id}</Title>
            <Title level={5}> Titre : {data.titre} </Title>
            <Title level={5}> Autheur : {data.autheur} </Title>
            <Title level={5}> Date d'Edition : {data.edition} </Title>
            <Title level={5}> Date d'Edition : {data.edition} </Title>
            <Title level={5}> Nombre de Pret : { data.nbPret} </Title>
            <Title level={5}> Disponible : <Tag color={ data.disponible ? "blue" : "error"} > {data.disponible ? "disponible": "en pret"}  </Tag> </Title>
            </Space>
            <Image src={LivreIllustration} width="600px" preview={false}/>
        </Space>
    </>
  )
}

export default LivreInfo;