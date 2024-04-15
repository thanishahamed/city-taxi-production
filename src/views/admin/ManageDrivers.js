import useSWR from "swr";
import Table from "../../components/Table";
import {DELETE, GET, POST, PUT} from "../../utils/requestActionConstants";
import { API_ROUTE } from "../../utils/commonConstants";
import {fetcher, processReq} from "../../helpers/processRequest";
import Button from "../../components/Button";
import {Modal, Snackbar, TextField} from "@mui/material";
import {useContext, useRef, useState} from "react";
import Input from "../../components/Input";
import {isEmptyString} from "../../utils/validations";
import {driverStatus, tripStatus, userRoles, userStatus} from "../../utils/configConstants";
import Alert from "../../components/Alert";
import {AuthContext} from "../../context/AuthContextProvider";
import { useConfirm } from "material-ui-confirm";

const ManageDrivers = () => {
    const result = useSWR({method: GET, url: API_ROUTE + '/auth/user/driverOrOwner'}, fetcher);
    const [modalOpen, setModalOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const formRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentData, setCurrentData] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const confirm = useConfirm();
    const [showSnackBar, setShowSnackBar] = useState(false);

    const updateShowSnackBar = (message) => {
        setShowSnackBar(true);
        setErrorMessage(message);
    }

    const deleteConfirm = (data) => {
        confirm({ description: "Do you want to delete this record?" })
            .then(async () => {
                const response = await processReq(DELETE, API_ROUTE + '/auth/user/'+data.id);

                await result.mutate();
                updateShowSnackBar("Data Deleted!")
            })
            .catch(() => {

            });
    };

    const addNewRecord = () => {
        setModalOpen(true);
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        let requestObject = {};
        let isValidated = false;

        for (let data of event.target) {
            if (data.type === "submit") {
                continue;
            }
            if (data.type === 'checkbox') {
                requestObject[data.name] = data.checked ? userRoles.driver : userRoles.passenger;

                if (data.checked) {
                    requestObject.availability = driverStatus.available;
                } else {
                    requestObject.availability = driverStatus.busy;
                }
            } else {
                requestObject[data.name] = data.value;
            }

            if (data.required && isEmptyString(data.value)) {
                let camelCaseToNormalCase = data.name.replace(/([A-Z])/g, " $1");

                setErrorMessage(camelCaseToNormalCase.toUpperCase() + ' field cannot be empty');
                setIsError(true);
                data.focus();

                isValidated = false;

                break;
            } else {
                isValidated = true;
            }
        }


        if (isValidated) {
            setIsLoading(true);

            if (requestObject.password !== requestObject.confirmPassword) {
                setErrorMessage('Password fields mismatched!');
                setIsError(true);
                formRef.current.password.focus();
                window.scrollTo(0, 0);
            } else {
                let response;

                if (currentData.id) {
                    requestObject.id = currentData.id;
                    response = await processReq(PUT, API_ROUTE + '/auth/user', requestObject);
                } else {
                    requestObject.availability = driverStatus.available;
                    response = await processReq(POST, API_ROUTE + '/register', requestObject);
                }

                if (response.error) {
                    formRef.current.focus();
                    setErrorMessage(response.message);
                    setIsError(true);
                    window.scrollTo(0, 0);
                } else {
                    await result.mutate();
                    closeModalFn();
                    updateShowSnackBar('Content updated successfully!');
                }
            }

            setIsLoading(false);
        }
    }

    const openUpdateForm = () => {
        return new Promise((resolve) => {
            setModalOpen(true);
            setCurrentData({});
            setIsUpdating(true);
            resolve();
        });
    }

    const loadData = (data) => {
        openUpdateForm().then(() => setData(data));
    }

    const setData = (data) => {
        setCurrentData(data);
        if (data) {
            let form = formRef.current;
            const keys = Object.keys(data);

            // if (data.role === userRoles.driver) {
            //     formRef.current.role.checked = true;
            //     setIsDriver(true);
            //     formRef.current["drivingLicenceNo"].value = data.drivingLicenceNo;
            //
            // }

            keys.forEach((key) => {
                if (form[key]) {
                    form[key].value = data[key];
                }
            })
        }
    }

    const closeModalFn = () => {
        setModalOpen(false);
        setIsUpdating(false);
        setCurrentData({});
    }

    return (
        <div className="pop-right">
            <Snackbar
                open={showSnackBar}
                autoHideDuration={2000}
                onClose={() => setShowSnackBar(false)}
                message={errorMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                className={'bg-yellow-600'}
            />

            <div className="text-4xl pb-8 text-slate-800 font-semibold pop-up">Manage Drivers/Owners</div>
            <div className="flex justify-end m-5"><Button style="ghost" onClick={addNewRecord}><i className="icon-plus-square-o text-xl text-yellow-500 pr-2"></i>Add New Record</Button></div>
            <div className="border-4 p-10 w-full shadow-xl drop-shadow-sm text-center transition ease-in-out duration-300 rounded-xl">
                    {!result.isLoading ? 
                            <Table 
                                headers={['id', 'email', 'firstName', 'lastName', 'telephone', 'drivingLicenceNo', 'address', 'status', 'availability']}
                                masterData={result.data}
                                showRatingCell={true}
                                actionButtons={[
                                    {label: '', iconClass: 'icon-pencil-square-o text-lg', action: loadData, style: 'ghost'},
                                    {label: '', iconClass: 'icon-trash text-red-700 text-lg', action: deleteConfirm, style: 'ghost'}
                                ]}
                                searchBy={'email'}
                            />
                        : ''
                    }
            </div>

            <Modal
                open={modalOpen}
                onClose={() => closeModalFn()}
            >
                <div className={"w-1/2 h-5/6 mt-10 overflow-scroll bg-amber-50 m-auto rounded p-10"}>
                    <Alert isShow={isError} setIsShow={setIsError} message={errorMessage} />
                    <form onSubmit={onSubmit} noValidate ref={formRef} autoComplete={"off"}>
                        <div><Button style='ghost' className={"px-0"} onClick={closeModalFn}><i className="icon-arrow-left"></i></Button></div>
                        <div className={"text-2xl pb-5"}>{isUpdating ? "Update Data" : "Add New Record"}</div>
                        <div className="pb-4">
                            <div className="pb-1">Email</div>
                            <Input name={'email'} className='w-full' type="email" required autoFocus={true} />
                        </div>

                        <div className="pb-4">
                            <div className="pb-1">First Name</div>
                            <Input name={'firstName'} className='w-full' required />
                        </div>

                        <div className="pb-4">
                            <div className="pb-1">Last Name</div>
                            <Input name={'lastName'} className='w-full' required />
                        </div>

                        <div className="pb-4">
                            <div className="pb-1">Telephone</div>
                            <Input name={'telephone'} className='w-full' required type="tel"/>
                        </div>



                        {
                            !isUpdating ?
                                <div>
                                    <div className="pb-4">
                                        <div className="pb-1">Password</div>
                                        <Input name={'password'} className='w-full' required type="password"/>
                                    </div>

                                    <div className="pb-4">
                                        <div className="pb-1">Confirm Password</div>
                                        <Input name={'confirmPassword'} className='w-full' required type="password"/>
                                    </div>
                                </div>
                            : ''
                        }

                        <div className="pb-4">
                            <div className="pb-1">Address</div>
                            <Input name={'address'} className='w-full' required/>
                        </div>

                        {/*<div className="pb-4">*/}
                        {/*    <input type="checkbox" className="mr-2" name={'role'} disabled  defaultChecked id="role" onChange={(event) => setIsDriver(event.target.checked)}/>*/}
                        {/*    <label className="pb-1" htmlFor="role">Save as a Driver</label>*/}
                        {/*</div>*/}

                        {/*{*/}
                        {/*    isDriver ?*/}
                                <div>
                                    <div className="pb-4">
                                        <div className="pb-1">Driving Licence Number</div>
                                        <Input name={'drivingLicenceNo'} className='w-full' required/>
                                    </div>
                                </div>
                        {/*        : ''*/}
                        {/*}*/}

                        <div className="pb-4">
                            <Button type={'submit'} className={'w-full mt-4'} isLoading={isLoading}>Save</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default ManageDrivers;