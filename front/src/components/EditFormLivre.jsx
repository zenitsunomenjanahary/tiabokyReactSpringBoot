import {FaUserAlt,FaUserCog,FaBirthdayCake} from "react-icons/fa"
import { Alert, Button, Divider, Spin, Tooltip, Typography, notification, Row, Col } from 'antd';
import { Form, Input } from 'antd';
import { useState } from 'react';
import LivreService from "../api/livres.js"
import { AiOutlineRollback } from "react-icons/ai";
import {NavLink, useParams} from "react-router-dom";
import { useQuery } from "react-query";
import {useNavigate} from "react-router-dom";
const {Title} = Typography

const layout = {
  labelCol: {span: 4,},
  wrapperCol: { span: 16,}
}


const EditFormLivre = () => {

    const id = useParams().id;
    
    const navigate = useNavigate();
    
    const {isLoading, error, data} = useQuery(['livre',id], ()=> LivreService.getLivreById(id),{
      cacheTime:0,
    });
    
    const [form] = Form.useForm();

    const [errors,setErrors] = useState(false);
  
    const [titre, setTitre] = useState("");
    const [autheur, setAutheur] = useState("");
    const [edition, setEdition] = useState("");
 
  const onFinish = (values) => {

    let livre = {
      titre: values.titre,
      autheur: values.autheur,
      edition: values.edition
    }

    LivreService.updateLivre(livre,id)
      .then(()=> {
        form.resetFields();
        notification.success({
            message: 'Modification livre',
            description:
              'Livre mis a jour avec success',
          });
          navigate("/livres");
      })
      .catch((error)=>setErrors(true))
  }

    if(isLoading) return <Spin tip="Chargement ...">
        <Alert message="Recuperation des données" description="Veuillez patientez" type='info'/>
    </Spin>

    if(error) return <Spin tip="Oups, Erreur !!">
        <Alert message="Une erreur s'est produit lors du recuperation des données du Livre" description="Veuillez patientez" type='error'/>
    </Spin>

  return (
    <>
    {errors && <Alert message="Une erreur s'est produite lors du mise à jour du livre" type="error" showIcon />}
    <Row>
        <Col span={4}>
            <Tooltip title="retour">
            <NavLink to={"/livres"}>
                <Button icon={<AiOutlineRollback/>} type="primary"/>
            </NavLink>
            </Tooltip>
        </Col>
        <Col span={6}>
            <Title level={4}>Modifier Livre N° {id} </Title>
        </Col>
    </Row>
      <Divider/>
        {data && 
        <Form 
            {...layout} 
            initialValues={{
                ["titre"]: data.titre,
                ["autheur"]: data.autheur,
                ["edition"]: data.edition,
            }}
            form={form} 
            name="control-ref" 
            onFinish={onFinish}>

          <Form.Item name="titre" label="Titre" rules={[ {required: true,message:"Titre est obligatoire"}]}>
            <Input 
              type={"text"}
              name="titre"
              onChange={(e) => setTitre(e.target.value)}
              value={titre}
              prefix={<FaUserAlt className="site-form-item-icon" />}/>
          </Form.Item>
          <Form.Item name="autheur" label="Autheur" rules={[ {required: true,message:"Ce champ est obligatoire"}]}>
            <Input
              type={"text"}
              name="autheur"
              onChange={(e)=> setAutheur(e.target.value)}
              value={autheur}
              placeholder='Autheur du livre' 
              prefix={<FaUserCog className="site-form-item-icon" />}/>
          </Form.Item>
          <Form.Item name="edition" label="Date d'edition" rules={[ {required: true,message:"Date de edition est obligatoire"}]}>
            <Input 
              type={"text"}
              name="edition"
              onChange={(e)=> setEdition(e.target.value)}
              value={edition}
              placeholder='Date de edition' 
              prefix={<FaBirthdayCake className="site-form-item-icon" />}/>
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

export default EditFormLivre;