import {FaUserAlt,FaUserCog,FaBirthdayCake} from "react-icons/fa"
import { Alert, Button, Col, Divider, notification, Row, Tooltip, Typography } from 'antd';
import { Form, Input } from 'antd';
import { useState } from 'react';
import LivreService from "../api/livres.js"
import { AiOutlineRollback } from "react-icons/ai";
import {Link,useNavigate} from "react-router-dom";

const {Title} = Typography;

const layout = {
  labelCol: {span: 4,},
  wrapperCol: { span: 16,}
}


const AddFormLivre = () => {
  const [form] = Form.useForm();
  const [success,setSuccess] = useState(false);
  const [error,setError] = useState(false);
  const navigate = useNavigate();

  const [titre, setTitre] = useState("");
  const [autheur, setAutheur] = useState("");
  const [edition, setEdition] = useState("");
  
  const onFinish = (values) => {

    console.log(values);
    let livre = {
      titre: values.titre,
      autheur: values.autheur,
      edition: values.edition,
    }

    LivreService.createLivre(JSON.stringify(livre))
      .then(()=> {
        form.resetFields();
        setSuccess(true);
        notification.success({
          message: 'Enregistrement livre',
          description:
            'Nouveau livre enregistrer',
        });
        navigate("/livres");
      })
      .catch((error)=>setError(true))
  }
  return (
    <>
    {success && <Alert message="Nouveau livre enregistrer avec succès" type="success" showIcon />}
    {error && <Alert message="Une erreur s'est produite lors de l'enregistrement d'un nouveau livre" type="error" showIcon />}
      <Row>
        <Col span={4}>
            <Tooltip title="retour">
              <Link to={"/livres"}>
                <Button icon={<AiOutlineRollback/>} type="primary"/>
              </Link>
            </Tooltip>
        </Col>
        <Col span={8}>
          <Title level={4}>Nouveau Livre</Title>
        </Col>
      </Row>
      <Divider/>
        <Form {...layout} form={form} name="control-ref" onFinish={onFinish}>
          <Form.Item name="titre" label="Titre" rules={[ {required: true,message:"Titre est obligatoire"}]}>
            <Input 
              type={"text"}
              name="titre"
              onChange={(e) => setTitre(e.target.value)}
              value={titre}
              placeholder='titre' 
              prefix={<FaUserAlt className="site-form-item-icon" />}/>
          </Form.Item>
          <Form.Item name="autheur" label="Autheur" rules={[ {required: true,message:"Autheur est obligatoire"}]}>
            <Input
              type={"text"}
              name="autheur"
              onChange={(e)=> setAutheur(e.target.value)}
              value={autheur}
              placeholder='Autheur du livre' 
              prefix={<FaUserCog className="site-form-item-icon" />}/>
          </Form.Item>
          <Form.Item name="edition" label="Date d'edition " rules={[ {required: true,message:"La Date d'edition du livre est obligatoire"}]}>
            <Input 
              type={"text"}
              name="edition"
              onChange={(e)=> setEdition(e.target.value)}
              value={edition}
              placeholder="Date d'edition du livre" 
              prefix={<FaBirthdayCake className="site-form-item-icon" />}/>
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

export default AddFormLivre;