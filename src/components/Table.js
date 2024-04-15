import {useContext, useEffect, useState} from "react";
import { titleCase } from "../utils/validations";
import Button from "./Button";
import {CSVLink} from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';
import {AuthContext} from "../context/AuthContextProvider";
import {userRoles} from "../utils/configConstants";
import { Input } from "@mui/material";

const Table = ({masterData, headers, actionButtons, showRatingCell, searchBy}) => {
    const [headerData, setHeaderData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [tableMasterData, setTableMasterData] = useState([]);
    const {user} = useContext(AuthContext);
    const [filterKey, setFilterKey] = useState("");

    useEffect(() => {
        initTable();
    }, [masterData, headers]);

    const initTable = () => {
        setHeaders();
        setData();
    }

    const setHeaders = () => {
        let tempHeaders = headers.map(col => {
            return ({label: titleCase(col.replace(/([A-Z])/g, " $1")), key: col});
        });

        setHeaderData(tempHeaders);
    }

    const setData = () => {
        if (showRatingCell) {
            let newMasterData = masterData.map(dt => {
                dt.ratingsArray = ratingStars(dt.rating)

                return dt;
            });

            masterData = newMasterData;
        }

        setTableData(masterData);
    }

    useEffect(() => {
        filter();
    }, [filterKey])

    const filter = () => {
        if (searchBy) {
            const filtered = masterData.filter(result => result[searchBy].includes(filterKey));
            setTableData(filtered)
        }
    }

    const ratingStars = (stars) => {
        let content = [];

        for (let x = 0; x < stars; x++) {
            content.push("*")
        }

        return content;
    }

    return (
        <>
            <div className={" float-right"} style={{width: 'fit-content'}}>
                {
                    user.role === userRoles.admin ?
                    <CSVLink data={tableData} headers={headerData} filename={'city-taxi-data.csv'}>
                        <div className={"flex justify-end pb-5"} >
                            <Button size={"sm"} style={"ghost"}><DownloadIcon fontSize={"small"} />  Download Table Data </Button>
                        </div>
                    </CSVLink>
                    : ''
                }

            </div>
            <div className="w-screen max-w-full overflow-x-auto rounded-xl text-xs shadow-xl mt-10">
                {
                    masterData.length > 0 ?
                        <>
                        {searchBy ? <div className="py-2"><i className="icon-search pr-2"></i><Input onChange={(event) => setFilterKey(event.target.value)} placeholder={`Search ${searchBy}`} /></div> : <></>}
                        <table className="bg-slate-50/90 rounded overflow-scroll w-full">
                            <thead>
                                <tr className="bg-yellow-400">
                                    {actionButtons ? <td></td> : ''}
                                    {headerData.map((h, key) => <td className="p-3 font-bold text-left" key={key}>{h.label}</td>)}
                                    {
                                                    showRatingCell ?
                                                        <td className="w-12 text-center pr-5 font-bold">Ratings</td>
                                                    : ''
                                                }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableData.map((d, key) => {
                                        return (
                                            <tr key={key}>
                                                {
                                                    actionButtons ?
                                                    <td className="pl-2 text-center flex items-center pt-2">
                                                        {
                                                            actionButtons ? actionButtons.map((btn, key) => <Button key={key} size="sm" style={btn.style} onClick={() => btn.action(d)}><i className={btn.iconClass}></i> {btn.label}</Button>) : ''
                                                        }
                                                    </td>
                                                    : ''
                                                }

                                                {
                                                    headers.map((head, headKey) => <td className="p-3" key={`${key}-${headKey}`}>{d[head]}</td>)
                                                }
                                                {
                                                    showRatingCell ?
                                                        <td className="w-12 text-center pr-4">{d.rating && d.rating > 0 ? d.ratingsArray.map((rt, key) => <i key={key} className="icon-star text-yellow-600"></i>) : 'No Ratings'}</td>
                                                    : ''
                                                }

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        </>
                    : <div className="bg-slate-50/50 text-lg rounded overflow-scroll w-full text-center pt-5 pb-3">Data Not Found!</div>
                }
            </div>
        </>
    )
}

export default Table;