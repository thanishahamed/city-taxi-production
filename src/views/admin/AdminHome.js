import Button from "../../components/Button";

const AdminHome = () => {
    return (
        <div>
            <div className="flex gap-5 flex-col md:flex-row">
                <div className="border-4 p-10 w-full shadow-xl drop-shadow-sm text-center transition ease-in-out duration-300 rounded-xl pop-right">
                    <div>Total Trips</div>
                    <div className="text-4xl">123</div>
                </div>
                <div className="border-4 p-10 w-full shadow-xl drop-shadow-sm text-center transition ease-in-out duration-300 rounded-xl pop-right">
                    <div>Total Drivers</div>
                    <div className="text-4xl">50</div>
                </div>
                <div className="border-4 p-10 w-full shadow-xl drop-shadow-sm text-center transition ease-in-out duration-300 rounded-xl pop-right">
                    <div>Passengers</div>
                    <div className="text-4xl">80</div>
                </div>
                <div className="border-4 p-10 w-full shadow-xl drop-shadow-sm text-center transition ease-in-out duration-300 rounded-xl pop-right">
                    <div>Total Operators</div>
                    <div className="text-4xl">20</div>
                </div>
            </div>
            <div className="pt-10 flex gap-5 flex-col md:flex-row">
                <div className=" p-10 w-full shadow-xl drop-shadow-sm text-center transition ease-in-out duration-300 rounded-xl pop-right">
                    <Button className={'w-full'}> Manage Passengers </Button>
                </div>
                <div className=" p-10 w-full shadow-xl drop-shadow-sm text-center transition ease-in-out duration-300 rounded-xl pop-right">
                    <Button className={'w-full'}> Manage Drivers </Button>
                </div>
                <div className=" p-10 w-full shadow-xl drop-shadow-sm text-center transition ease-in-out duration-300 rounded-xl pop-right">
                    <Button className={'w-full'}> Manage Owners </Button>
                </div>
                <div className=" p-10 w-full shadow-xl drop-shadow-sm text-center transition ease-in-out duration-300 rounded-xl pop-right">
                    <Button className={'w-full'}> Manage Trips </Button>
                </div>
            </div>
        </div>
    )
}

export default AdminHome;