import { useNavigate } from "react-router";

const BottomNavigation = () => {
    const navigate = useNavigate();

    return (
        <div className="flex sticky bottom-0 bg-orange-400 text-center">
            <div className="flex-1 hover:bg-orange-600 cursor-pointer py-5" onClick={() => navigate('/')}>Home</div>
            <div className="flex-1 hover:bg-orange-600 cursor-pointer py-5" onClick={() => navigate('/history')}>My Trips</div>
            <div className="flex-1 hover:bg-orange-600 cursor-pointer py-5" onClick={() => navigate('/payments')}>My Payments</div>
            <div className="flex-1 hover:bg-orange-600 cursor-pointer py-5" onClick={() => navigate('/settings')}>Settings</div>
        </div>
    )
}

export default BottomNavigation;