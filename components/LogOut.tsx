'use client'
import { LogOut } from "@/actions/log-out";

const LogOutButton = () => {
    const handleSignOut = () => {
        LogOut();
    }
    return (
        <button className="border text-red-500" onClick={handleSignOut}>Log out</button>
    )
}

export default LogOutButton;
