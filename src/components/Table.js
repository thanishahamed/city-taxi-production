import { useEffect, useState } from "react";
import { titleCase } from "../utils/validations";
import Button from "./Button";

const Table = ({masterData, headers, actionButtons, showRatingCell}) => {
    const [headerData, setHeaderData] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        initTable();
    }, [masterData, headers]);

    const initTable = () => {
        setHeaders();
        setData();
    }

    const setHeaders = () => {
        let tempHeaders = headers.map(col => {
            return titleCase(col.replace(/([A-Z])/g, " $1"));
        });

        setHeaderData(tempHeaders);
    }

    const setData = () => {
        setTableData(masterData);
    }

    const RatingStars = ({stars}) => {
        let content = [];

        for (let x = 0; x < stars; x++) {
            content.push("*")
        }

        return content;
    }

    return (
        <div className="w-screen max-w-full overflow-x-auto">
            {
                tableData.length > 0 ?
                    <table className="bg-slate-50/50 rounded overflow-scroll w-full">
                        <thead>
                            <tr>
                                {headerData.map((h, key) => <td className="p-3" key={key}>{h}</td>)}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableData.map((d, key) => {
                                    return (
                                        <tr key={key}>
                                            {
                                                headers.map((head, headKey) => <td className="p-3" key={`${key}-${headKey}`}>{d[head]}</td>)
                                            }
                                            {
                                                showRatingCell ? 
                                                    <td className="w-12"><RatingStars stars={d.rating}/></td>
                                                : ''
                                            }
                                            <td>
                                                {
                                                    actionButtons ? actionButtons.map((btn, key) => <Button key={key} size="sm" style={btn.style} onClick={() => btn.action(d)}>{btn.label}</Button>) : ''
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                : <div className="text-2xl">No table data to show</div>
            }
        </div>
    )
}

export default Table;