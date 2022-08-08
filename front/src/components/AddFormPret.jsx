import {  Button, Col, DatePicker, Divider, notification, Row, Select, Tooltip, Typography } from 'antd';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import LivreService from "../api/livres.js"
import { AiOutlineRollback } from "react-icons/ai";
import {NavLink,useNavigate} from "react-router-dom";
import LecteurService from "../api/lecteurs.js";
import moment from "moment";
import PretService from "../api/prets.js";

const {Title} = Typography;
const {Option} = Select;
const layout = {
  labelCol: {span: 4,},
  wrapperCol: { span: 16,}
}


const AddFormPret = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const pret = {
    datePret: moment(Date.now())
  }

  const [lecteurs,setLecteurs] = useState([]);
  const [lecteur,setLecteur] = useState(false)

  const [livres, setLivres] = useState([]);

  useEffect(()=>{
   LecteurService.getLecteurs().then((data)=>setLecteurs(data));
   LivreService.getLivres().then(data => setLivres(data))

  },[])

  const handleChangeLivreSelect = async(e) => {
}

const handleChangeNumeroLecteur = (e) => {
  LecteurService.getLecteurById(e)
    .then(data => setLecteur(data))
  }
  
  const onFinish = (values) => {
    // const dateRetour = values.datePret.add(15,"days").calendar();
    // console.log(values)
    // console.log("pret",values.datePret);
    // console.log("retour",dateRetour);
    let newPret = {
      numeroLivre: values.numeroLivre,
      numeroLecteur: values.numeroLecteur,
      datePret: values.datePret.format("l"),
      dateRetour: values.datePret.add(15,"days").format("l")
    }
    console.log(newPret);
    PretService.createPret(newPret).then(()=>{
      form.resetFields();
      notification.success({
        message: "Nouveau pret enregistrer",
        description: "Nouveau pret enregistrer, le livre sera rendu apres 15 jours!"
      });
      navigate("/prets");
    }).catch(error => {
      notification.error({
        message: "Une erreur s'est produit",
        description: "No description"
      })
    })

  }

  return (
    <>
    
      <Row>
        <Col span={4}>
            <Tooltip title="retour">
              <NavLink to={"/prets"}>
                <Button icon={<AiOutlineRollback/>} type="primary"/>
              </NavLink>
            </Tooltip>
        </Col>
        <Col span={8}>
          <Title level={4}>Nouveau Pret</Title>
        </Col>
      </Row>
      <Divider/>
        <Form {...layout} form={form} name="control-ref" onFinish={onFinish} initialValues={pret}>
            { lecteurs && <Form.Item name={"numeroLecteur"} label="Lecteur" >
                <Select
                    size="middle" 
                    placeholder="lecteur" 
                    onChange={handleChangeNumeroLecteur}>
                        {
                            lecteurs.map((lecteur)=>(
                                lecteur.pretActuel < 3 && <Option key={lecteur.id} value={lecteur.id}> {lecteur.id} __ {lecteur.nom} __ {lecteur.prenom} / {lecteur.nbPretActuel} </Option>
                            ))
                        }
                </Select>
            </Form.Item>}

          { livres && <Form.Item 
            name={"numeroLivre"} 
            label="Livre">
            <Select
                size="middle" 
                placeholder="Selectionner le livre"
                onChange={handleChangeLivreSelect}
            >
                {
                  livres.map((livre) => (
                    livre.disponible == 1 && <Option key={livre.id} value={livre.id}> {livre.id} _ {livre.titre}</Option>
                  ))
                }
            </Select>
          </Form.Item>}
          <Form.Item name={"datePret"} label="Date de pret">
            <DatePicker format={"DD/MM/YYYY"}></DatePicker>
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

export default AddFormPret;