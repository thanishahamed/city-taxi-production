import useSWR from "swr";
import Table from "../../components/Table";
import {DELETE, GET, POST, PUT} from "../../utils/requestActionConstants";
import { API_ROUTE } from "../../utils/commonConstants";
import {fetcher, processReq} from "../../helpers/processRequest";
import {useRef, useState} from "react";
import {useConfirm} from "material-ui-confirm";
import {isEmptyString} from "../../utils/validations";
import {Modal, Snackbar} from "@mui/material";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import Input from "../../components/Input";
import {driverStatus, userRoles} from "../../utils/configConstants";

const ManageVehicles = () => {
    const result = useSWR({method: GET, url: API_ROUTE + '/auth/vehicle/'}, fetcher);
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
                const response = await processReq(DELETE, API_ROUTE + '/auth/vehicle/'+data.id);

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

            requestObject[data.name] = data.value;

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

            // requestObject.driverId = null;

            let response;

            if (currentData.id) {
                requestObject.id = currentData.id;
                response = await processReq(PUT, API_ROUTE + '/auth/vehicle', requestObject);
            } else {
                response = await processReq(POST, API_ROUTE + '/auth/vehicle', requestObject);
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

            <div className="text-4xl pb-8 text-slate-800 font-semibold pop-up">Manage Vehicle</div>
            <div className="flex justify-end m-5"><Button style="ghost" onClick={addNewRecord}><i className="icon-plus-square-o text-xl text-yellow-500 pr-2"></i>Add New Record</Button></div>
            <div className="border-4 p-10 w-full shadow-xl drop-shadow-sm text-center transition ease-in-out duration-300 rounded-xl">
                    {!result.isLoading ? 
                            <Table 
                                headers={['id', 'vehicleNumber', 'color', 'description']}
                                masterData={result.data}
                                actionButtons={[
                                    {label: '', iconClass: 'icon-pencil-square-o text-lg', action: loadData, style: 'ghost'},
                                    {label: '', iconClass: 'icon-trash text-red-700 text-lg', action: deleteConfirm, style: 'ghost'}
                                ]}
                                searchBy={'vehicleNumber'}
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
                    <form onSubmit={onSubmit} ref={formRef} noValidate autoComplete={"off"}>
                        <div><Button style='ghost' className={"px-0"} onClick={closeModalFn}><i className="icon-arrow-left"></i></Button></div>
                        <div className={"text-2xl pb-5"}>{isUpdating ? "Update Data" : "Add New Record"}</div>
                        <div className="pb-4">
                            <div className="pb-1">Vehicle Number</div>
                            <Input name={'vehicleNumber'} className='w-full' placeholder="eg: AAA-XXXX" type="email" required />
                        </div>

                        <div className="pb-4">
                            <div className="pb-1">Color</div>
                            <Input name={'color'} className='w-full' required />
                        </div>

                        <div className="pb-4">
                            <div className="pb-1">Description</div>
                            <Input name={'description'} placeholder="Name and description" className='w-full' required />
                        </div>

                        <div className="pb-4">
                            <Button type={'submit'} className={'w-full mt-4'}>Update Vehicle</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default ManageVehicles;