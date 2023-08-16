import {useNavigate, useParams} from "react-router-dom";
import {retrieveTodoApi, updateTodoApi} from "./api/TodoApiService";
import {useAuth} from "./security/AuthContext";
import {useEffect, useState} from "react";
import {Field, Form, Formik, ErrorMessage} from "formik";

export default function TodoComponent(){

    const {id} = useParams()

    const[description, setDescription] = useState('')
    const[targetDate, setTargetDate] = useState('')

    const authContext = useAuth()
    const navigate = useNavigate()

    const username = authContext.username

    useEffect(() => retrieveTodo(),[id])

    function retrieveTodo(){
        retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
    }

    function onSubmit(values){
        console.log(values)
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        updateTodoApi(username, id, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
    }

    function validate(values){
        let errors = {
            //description: 'description 값이 유효하지 않습니다',
            //targetDate: 'targetDate 값이 유효하지 않습니다'

        }

        if(values.description.length < 5){
            errors.description = 'description은 5자 이상이어야 합니다.'
        }

        if(values.targetDate == null){
            errors.targetDate = 'targetDate를 입력해주세요'
        }

        console.log(values)
        return errors
    }

    return (
        <div className="container">
            <h1>내용을 입력하세요</h1>
            <div>
                <Formik initialValues={{description, targetDate}}
                        enableReinitialize={true}
                        onSubmit={onSubmit}
                        validate={validate}
                        validateOnBlur={false}
                        validateOnChange={false}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}