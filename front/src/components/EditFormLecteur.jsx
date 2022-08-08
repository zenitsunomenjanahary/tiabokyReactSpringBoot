import {FaUserAlt,FaUserCog,FaBirthdayCake} from "react-icons/fa"
import {MdOutlineLocationCity} from "react-icons/md"
import {BsTelephoneFill} from "react-icons/bs"
import { Alert, Button, Divider, Spin, Tooltip, Typography, notification, Row, Col } from 'antd';
import { Form, Input } from 'antd';
import { useState } from 'react';
import LecteurService from "../api/lecteurs.js"
import { AiOutlineRollback } from "react-icons/ai";
import {NavLink, useParams} from "react-router-dom";
import { useQuery } from "react-query";
import {useNavigate} from "react-router-dom";
const {Title} = Typography

const layout = {
  labelCol: {span: 4,},
  wrapperCol: { span: 16,}
}


const EditFormLecteur = () => {

    const id = useParams().id;
    
    const navigate = useNavigate();
    
    const {isLoading, error, data} = useQuery(['lecteur',id], ()=> LecteurService.getLecteurById(id),{
      cacheTime:0,
    });
    
    const [form] = Form.useForm();

    const [errors,setErrors] = useState(false);
  
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [tel, setTel] = useState("");
    const [naissance, setNaissance] = useState("");
 
  const onFinish = (values) => {

    let lecteur = {
      nom: values.nom,
      prenom: values.prenom,
      adresse: values.adresse,
      tel: values.tel,
      naissance: values.naissance
    }

    LecteurService.updateLecteur(lecteur,id)
      .then(()=> {
        form.resetFields();
        notification.success({
            message: 'Modification lecteur',
            description:
              'Lecteur mis a jour avec success',
          });
          navigate("/lecteurs");
      })
      .catch((error)=>setErrors(true))
  }

    if(isLoading) return <Spin tip="Chargement ...">
        <Alert message="Recuperation des données" description="Veuillez patientez" type='info'/>
    </Spin>

    if(error) return <Spin tip="Oups, Erreur !!">
        <Alert message="Une erreur s'est produit lors du recuperation des données du Lecteur" description="Veuillez patientez" type='error'/>
    </Spin>

  return (
    <>
    {errors && <Alert message="Une erreur s'est produite lors du mise à jour du lecteur" type="error" showIcon />}
      <Row>
        <Col span={4}>
            <Tooltip title="retour">
              <NavLink to={"/lecteurs"}>
                <Button icon={<AiOutlineRollback/>} type="primary"/>
              </NavLink>
            </Tooltip>
        </Col>
        <Col span={8}>
          <Title level={4}>Modifier Lecteur N° {id} </Title>
        </Col>
      </Row>
      <Divider/>
        {data && 
        <Form 
            {...layout} 
            initialValues={{
                ["nom"]: data.nom,
                ["prenom"]: data.prenom,
                ["adresse"]: data.adresse,
                ["tel"]: data.tel,
                ["naissance"]: data.naissance
            }}
            form={form} 
            name="control-ref" 
            onFinish={onFinish}>
          <Form.Item name="nom" label="Nom" rules={[ {required: true,message:"Nom est obligatoire"}]}>
            <Input 
              type={"text"}
              name="nom"
              onChange={(e) => setNom(e.target.value)}
              value={nom}
              prefix={<FaUserAlt className="site-form-item-icon" />}/>
          </Form.Item>
          <Form.Item name="prenom" label="Prenom" rules={[ {required: true,message:"Prenom est obligatoire"}]}>
            <Input
              type={"text"}
              name="prenom"
              onChange={(e)=> setPrenom(e.target.value)}
              value={prenom}
              placeholder='Votre Prenom' 
              prefix={<FaUserCog className="site-form-item-icon" />}/>
          </Form.Item>
          <Form.Item name="naissance" label="Date de naissance" rules={[ {required: true,message:"Date de naissance est obligatoire"}]}>
            <Input 
              type={"text"}
              name="naissance"
              onChange={(e)=> setNaissance(e.target.value)}
              value={naissance}
              placeholder='Date de Naissance' 
              prefix={<FaBirthdayCake className="site-form-item-icon" />}/>
          </Form.Item>
          <Form.Item name="adresse" label="Adresse" rules={[ {required: true,message:"Adresse est obligatoire"}]}>
            <Input 
              type={"text"}
              name="adresse"
              onChange={(e)=> setAdresse(e.target.value)}
              value={adresse}
              placeholder='Adresse' 
              prefix={<MdOutlineLocationCity className="site-form-item-icon" />}/>
          </Form.Item>
          <Form.Item name="tel" label="Telephone" rules={[ {required: true,message:"Telephone est obligatoire"}]}>
            <Input 
              type={"text"}
              name="tel"
              onChange={(e)=> setTel(e.target.value)}
              value={tel}
              placeholder='Telephone' 
              prefix={<BsTelephoneFill className="site-form-item-icon" />}/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType={"submit"}>
              Enregistrer la modification
            </Button>
          </Form.Item>
        </Form>}
    </>
  );
};

export default EditFormLecteur;