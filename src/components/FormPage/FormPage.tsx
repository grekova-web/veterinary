import React, {useState} from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Typography,
    Divider,
    InputNumber,
    Switch,
    message,
} from 'antd';
import 'antd/dist/antd.css';
import {gql, useMutation} from '@apollo/client';
import {Rule} from "rc-field-form/lib/interface";
import {UpdateAnimal, UpdateAnimal_updateAnimal, UpdateAnimalVariables} from "./__generated__/UpdateAnimal";
import {DeleteAnimal, DeleteAnimal_deleteAnimal, DeleteAnimalVariables} from "./__generated__/DeleteAnimal";

const {Text} = Typography;
const {TextArea} = Input;

const rulesForId: Rule[] = [
    {required: true, message: 'Пожалуйста заполните это поле!'},
    {type: 'integer', min: 0, message: 'ID не может быть отрицательным'}
]

const UPDATE_ANIMAL = gql`
  mutation UpdateAnimal($id: ID!, $name: String, $kind: String, $age: Int, $gender: Gender,
     $caseRecord: String, $ownerId: ID) {
        updateAnimal(id: $id, name: $name, kind: $kind, age: $age, gender: $gender, 
            caseRecord: $caseRecord, ownerId: $ownerId) {
                success
                message
        }
  }
`;

const DELETE_ANIMAL = gql`
  mutation DeleteAnimal($id: ID!) {
        deleteAnimal(id: $id) {
            success
            message
        }
  }
`;

const FormPage = (): JSX.Element => {
    const [form] = Form.useForm();
    const [editData, setEditData] = useState<UpdateAnimalVariables>({id: ''});
    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
    const [updateAnimal] = useMutation<UpdateAnimal, UpdateAnimalVariables>(UPDATE_ANIMAL);
    const [deleteAnimal] = useMutation<DeleteAnimal, DeleteAnimalVariables>(DELETE_ANIMAL);

    const showResult = (data: UpdateAnimal_updateAnimal | DeleteAnimal_deleteAnimal | undefined) => {
        if (data) {
            data.success ?
                message.success(data.message)
                : message.error(data.message);
        }
    };

    const onFinish = () => {
        !isSwitchOn ?
            updateAnimal({variables: {...editData}}).then(data => showResult(data ? data?.data?.updateAnimal : undefined))
            : deleteAnimal({variables: {id: editData.id}}).then(data => showResult(data ? data?.data?.deleteAnimal : undefined))
    };

    const onChangeData = (item: Object) => {
        setEditData({
            ...editData,
            ...item
        })
    };

    const onSwitchToggle = () => setIsSwitchOn(!isSwitchOn);

    return (
        <div>
            <h2>Изменить данные из таблицы</h2>
            <Text type="secondary">Обратите внимание, что поле ID обязательно для заполнения</Text>
            <Divider/>
            <Form
                form={form}
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                onFinish={onFinish}
                onValuesChange={onChangeData}
            >
                <Form.Item label="Удалить данные" valuePropName="checked">
                    <Switch onClick={onSwitchToggle}/>
                </Form.Item>
                <Form.Item label="ID" name='id' rules={rulesForId}>
                    <InputNumber/>
                </Form.Item>
                <Form.Item label="Имя" name='name'>
                    <Input disabled={isSwitchOn}/>
                </Form.Item>
                <Form.Item label="Вид" name='kind'>
                    <Input disabled={isSwitchOn}/>
                </Form.Item>
                <Form.Item label="Пол" name='gender'>
                    <Radio.Group disabled={isSwitchOn}>
                        <Radio.Button value="Male"> Мужской </Radio.Button>
                        <Radio.Button value="Female"> Женский </Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Возраст" name='age'>
                    <InputNumber disabled={isSwitchOn}/>
                </Form.Item>
                <Form.Item label="Описание" name='caseRecord'>
                    <TextArea rows={4} disabled={isSwitchOn}/>
                </Form.Item>
                <Form.Item label="ID владельца" name='ownerId'>
                    <InputNumber disabled={isSwitchOn}/>
                </Form.Item>
                <Form.Item wrapperCol={{span: 14, offset: 4}}>
                    <Button type='primary' htmlType='submit'>Сохранить</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default FormPage;