import {FaUserAlt,FaUserCog,FaBirthdayCake} from "react-icons/fa"
import {MdOutlineLocationCity} from "react-icons/md"
import {BsTelephoneFill} from "react-icons/bs"
import { Alert, Button, Col, Divider, notification, Row, Tooltip, Typography } from 'antd';
import { Form, Input } from 'antd';
import { useState } from 'react';
import LecteurService from "../api/lecteurs.js"
import { AiOutlineRollback } from "react-icons/ai";
import {NavLink,useNavigate} from "react-router-dom";

const {Title} = Typography;

const layout = {
  labelCol: {span: 4,},
  wrapperCol: { span: 16,}
}


const AddFormLecteur = () => {
  const [form] = Form.useForm();
  const [success,setSuccess] = useState(false);
  const [error,setError] = useState(false);
  const navigate = useNavigate();
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

    LecteurService.createLecteur(JSON.stringify(lecteur))
      .then(()=> {
        form.resetFields();
        setSuccess(true);
        notification.success({
          message: 'Enregistrement lecteur',
          description:
            'Nouveau lecteur enregistrer',
        });
        navigate("/lecteurs");
      })
      .catch((error)=>setError(true))
  }
  return (
    <>
    {success && <Alert message="Nouveau membre enregistrer avec succès" type="success" showIcon />}
    {error && <Alert message="Une erreur s'est produite lors de l'enregistrement d'un nouveau lecteur" type="error" showIcon />}
      <Row>
        <Col span={4}>
            <Tooltip title="retour">
              <NavLink to={"/lecteurs"}>
                <Button icon={<AiOutlineRollback/>} type="primary"/>
              </NavLink>
            </Tooltip>
        </Col>
        <Col span={8}>
          <Title level={4}>Nouveau membre</Title>
        </Col>
      </Row>
      <Divider/>
        <Form {...layout} form={form} name="control-ref" onFinish={onFinish}>
          <Form.Item name="nom" label="Nom" rules={[ {required: true,message:"Nom est obligatoire"}]}>
            <Input 
              type={"text"}
              name="nom"
              onChange={(e) => setNom(e.target.value)}
              value={nom}
              placeholder='Votre Nom' 
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
              Enregistrer
            </Button>
          </Form.Item>
        </Form>
    </>
  );
};

export default AddFormLecteur;